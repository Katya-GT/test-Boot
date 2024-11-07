$(document).ready(function() {
    $('#newUserForm').on('submit', function(e) {
        e.preventDefault();

        const user = {
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            age: $('#age').val(),
            email: $('#email').val(),
            password: $('#password').val()
        };

        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then(() => {
            window.location.href = '/admin';
        });
    });
});