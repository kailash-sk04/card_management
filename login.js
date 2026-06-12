const validUsername = 'admin';  // Replace with your desired username
const validPassword = 'p123';  // Replace with your desired password

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === validUsername && password === validPassword) {
        // Redirect to the Management Portal content
        window.location.href = 'management-portal.html'; // Update to your desired page
    } else {
        // Show error message
        document.getElementById('loginError').innerText = 'Invalid username or password';
    }
});