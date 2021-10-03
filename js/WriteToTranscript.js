import { doc, updateDoc } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js';
import db from './firebase.js';
import ReadTranscript from './ReadTranscript.js';
// let obj = {
// 	text: "hello world 2",
// 	timestamp: new Date()
// }
const WriteToTranscript = async (obj, flightId) => {
	let current = await ReadTranscript(flightId);
	current.push(obj);
	
	const flight = doc(db, "flights", flightId);
	await updateDoc(flight, {
		transcript: current
	});
}

export default WriteToTranscript;