function validateForm() {
    const flightId = document.getElementById('flightInput').value;
    sessionStorage.setItem('flightNumber', flightId);
    return true;
}