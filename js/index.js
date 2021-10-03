import TranscriptEdit from "./TranscriptEdit.js";
import NewFlight from "./NewFlight.js";

// required dom elements
const buttonEl = document.getElementById('button');
const messageEl = document.getElementById('message');
const titleEl = document.getElementById('real-time-title');

// set initial state of application vars
//messageEl.style.display = 'none';
let isRecording = false;
let socket;
let recorder;
let fullMessage = '';
let lastSentence = '';

// runs real-time transcription and handles global vars
const run = async () => {
  if (isRecording) {

    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    var dateTime = date + ' ' + time;
    var fullLine = date + ' ' + time + ': ' + lastSentence + '\n';

    var obj = { text: lastSentence, timestamp: dateTime };
    await TranscriptEdit(obj, sessionStorage.getItem('flightNumber'));

    fullMessage += fullLine;

    messageEl.innerHTML = fullMessage;

    if (socket) {
      socket.send(JSON.stringify({terminate_session: true}));
      socket.close();
      socket = null;
    }

    if (recorder) {
      recorder.pauseRecording();
      recorder = null;
    }
  } else {
    const response = await fetch('http://localhost:5000'); // get temp session token from server.js (backend)
    const data = await response.json();
    const { token } = data;

    socket = await new WebSocket(`wss://api.assemblyai.com/v2/realtime/ws?sample_rate=16000&token=${token}`); // establish wss with AssemblyAI (AAI) at 16000 sample rate

    // handle incoming messages to display transcription to the DOM
    const texts = {};
    socket.onmessage = (message) => {
      let msg = '';
      const res = JSON.parse(message.data);
      texts[res.audio_start] = res.text;
      const keys = Object.keys(texts);
      keys.sort((a, b) => a - b);
      for (const key of keys) {
        if (texts[key]) {
          msg += ` ${texts[key]}`;
        }
      }
      messageEl.innerHTML = fullMessage + msg;
      lastSentence = msg;
    };

    socket.onerror = (event) => console.error('Error:', event);
    socket.onclose = event => {
      console.log(event)
    }

    socket.onopen = () => {
      // once socket is open, begin recording
      messageEl.style.display = '';
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          recorder = new RecordRTC(stream, {
            type: 'audio',
            mimeType: 'audio/webm;codecs=pcm', // endpoint requires 16bit PCM audio
            recorderType: StereoAudioRecorder,
            timeSlice: 250, // set 250 ms intervals of data that sends to AAI
            desiredSampRate: 16000,
            numberOfAudioChannels: 1, // real-time requires only one channel
            bufferSize: 4096,
            audioBitsPerSecond: 128000,
            ondataavailable: (blob) => {
              const reader = new FileReader();
              reader.onload = () => {
                const base64data = reader.result;

                // audio data must be sent as a base64 encoded string
                if (socket) {
                  socket.send(JSON.stringify({ audio_data: base64data.split('base64,')[1] }));
                }
              };
              reader.readAsDataURL(blob);
            },
          });

          recorder.startRecording();
        })
        .catch((err) => console.error(err));
    };
  }

  isRecording = !isRecording;
  buttonEl.innerText = isRecording ? 'Stop' : 'Record';
  buttonEl.className = isRecording ? 'btn btn-danger' : 'btn btn-primary';
  titleEl.innerText = isRecording ? 'Click stop to end recording!' : 'Click start to begin recording!'
};

buttonEl.addEventListener('click', () => run());

document.getElementById('flightTitle').innerHTML += sessionStorage.getItem('flightNumber');
