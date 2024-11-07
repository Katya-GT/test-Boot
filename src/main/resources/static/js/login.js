$(document).ready(function() {
    $('#loginForm').on('submit', function(e) {
        e.preventDefault();

        const email = $('#email').val();
        const password = $('#password').val();

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}
        })
        .then(response => {
            if (response.ok) {

          window.locaion.href = '/admin';
      } else {
                alert('Login failed. Please check your credentials.');
            }
        })
        .catch(error => console.error('Error:', error));
    });
});