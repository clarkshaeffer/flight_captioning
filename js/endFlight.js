import { doc, deleteDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import db from './firebase.js';

let flightNumber = sessionStorage.getItem('flightNumber');

const endFlight = async (flightId) => {
    await deleteDoc(doc(db, "flights", flightId));
    location.href = location.protocol + '//' + location.host;
}

document.getElementById('endFlightButton').addEventListener("click", async () => {
    if(confirm('Are you sure you want to delete flight ' + flightNumber + '?')) {
        await endFlight(flightNumber);
    }
});