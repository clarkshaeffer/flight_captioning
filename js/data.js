//import NewFlight from "./NewFlight.js";
// async function validateForm() {
//     const flightId = document.getElementById('flightInput').value;
//     sessionStorage.setItem('flightNumber', flightId);
//     await NewFlight(flightId);
//     return true;
// }

function validateForm() {
    const flightId = document.getElementById('flightInput').value;
    sessionStorage.setItem('flightNumber', flightId);
    return true;
}