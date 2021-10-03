import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js';
import db from './firebase.js';

const ReadTranscript = async (flightId) => {
	let transcript = [];
	
	const querySnapshot = await getDocs(collection(db, "flights"));
	querySnapshot.forEach((doc) => {
		if (doc.id === flightId) transcript = doc.data().transcript;
	});
	return transcript;
}

export default ReadTranscript;