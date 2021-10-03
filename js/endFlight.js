import { doc, deleteDoc } from "firebase/firestore";
import db from './firebase.js';
const endFlight = async (flightId) => {
	await deleteDoc(doc(db, "flights", flightId));
}

export default endFlight;