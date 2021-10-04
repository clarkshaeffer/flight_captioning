function validateForm() {
    const flightId = document.getElementById('flightInput').value;
    sessionStorage.setItem('flightNumber', flightId);
    location.href = location.protocol + '//' + location.host + '/html/record/';
    return false;
}