import { collection, getDocs, setDoc, doc } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js';
import WriteToTranscript from "./WriteToTranscript.js";
import ReadTranscript from "./ReadTranscript.js";
import db from './firebase.js';

const TranscriptEdit = async (obj, flightId) => {
	let transcript = await ReadTranscript();
	let allFlights = [];
	const querySnapshot = await getDocs(collection(db, "flights"));
	querySnapshot.forEach((doc) => {
		allFlights.push(doc.id);
	});
	
	if(!allFlights.includes(flightId)) {
		await setDoc(doc(db, "flights", flightId), {
			transcript: []
		});
	}
	await WriteToTranscript(obj, flightId);

	transcript = await ReadTranscript(flightId);
	return transcript;
}

export default TranscriptEdit;