function validateForm() {
    const flightId = document.getElementById('flightInput').value;
    sessionStorage.setItem('flightNumber', flightId);
    location.href = '../html/record.html';
    return false;
}