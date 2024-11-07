$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');
    if (!userId) {
        console.error("User ID is not specified in the URL");
        return;
    }


    fetch(`/api/users/${userId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching user data: ${response.status}`);
            }
            return response.json();
        })
        .then(user => {

            $('#userId').val(user.id);
            $('#firstName').val(user.firstName);
            $('#lastName').val(user.lastName);
            $('#age').val(user.age);
            $('#email').val(user.email);
            $('#password').val('');
        })
        .catch(error => console.error('Error:', error));


    $('#editUserForm').submit(function (event) {
        event.preventDefault();

        const updatedUser = {
            id: $('#userId').val(),
            firstName: $('#firstName').val(),
            lastName: $('#lastName').val(),
            age: $('#age').val(),
            email: $('#email').val(),
            roles: []

        };


        const password = $('#password').val();
        if (password) {
            updatedUser.password = password;
        }


        fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedUser),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error updating user: ${response.status}`);
            }
            window.location.href = '/admin';
        })
        .catch(error => console.error('Error:', error));


    });
});