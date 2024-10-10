document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
});


function loadUsers() {
    fetch('/api/users', {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa('admin@example.com:admin'),
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(users => {
        let usersTableBody = document.getElementById('usersTableBody');
        usersTableBody.innerHTML = '';
        users.forEach(user => {
            let row = `<tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${user.roles.map(role => role.name).join(', ')}</td>
                <td>
                    <button class="btn btn-warning" onclick="openEditUserModal(${user.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
                </td>
            </tr>`;
            usersTableBody.innerHTML += row;
        });
    })
    .catch(error => console.error('Error fetching users:', error));
}


function openEditUserModal(userId) {
    // Открываем модальное окно
    $('#addUserModal').modal('show');
    document.getElementById('addUserModalLabel').textContent = "Edit User";


    const saveButton = document.querySelector('#addUserModal .btn-primary');
    saveButton.textContent = "Save Changes";
    saveButton.onclick = function() {
        saveUserChanges(userId);
    };


    fetch(`/api/users/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa('admin@example.com:admin'),
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(user => {

        document.getElementById('firstName').value = user.firstName;
        document.getElementById('lastName').value = user.lastName;
        document.getElementById('age').value = user.age;
        document.getElementById('email').value = user.email;


        document.getElementById('password').value = '';
        document.getElementById('oldPassword').value = user.password;


        const rolesSelect = document.getElementById('roles');
        Array.from(rolesSelect.options).forEach(option => {
            option.selected = user.roles.some(role => role.name === option.value);
        });
    })
    .catch(error => console.error('Error fetching user:', error));
}


function saveUserChanges(userId) {
    const updatedUser = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        age: document.getElementById('age').value,
        email: document.getElementById('email').value,
        roles: Array.from(document.getElementById('roles').selectedOptions).map(option => option.value)
    };


    const newPassword = document.getElementById('password').value;
    if (newPassword.trim() !== "") {
        updatedUser.password = newPassword;
    } else {

        updatedUser.password = document.getElementById('oldPassword').value;
    }

    fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
'Authorization': 'Basic ' + btoa('admin@example.com:admin'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to update user');
        }
        $('#addUserModal').modal('hide');
        loadUsers();
    })
    .catch(error => console.error('Error updating user:', error));
}


function addUser() {
    const newUser = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        age: document.getElementById('age').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
        roles: Array.from(document.getElementById('roles').selectedOptions).map(option =>
        {
        return { id: option.value };
        })
    };

    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa('admin@example.com:admin'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add user');
        }
        $('#addUserModal').modal('hide');
        loadUsers();
    })
    .catch(error => console.error('Error adding user:', error));
}


function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Basic ' + btoa('admin@example.com:admin'),
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            loadUsers();
        })
        .catch(error => console.error('Error deleting user:', error));
    }
}


document.querySelector('button[data-target="#addUserModal"]').addEventListener('click', () => {
    // Сбрасываем форму
    document.getElementById('addUserForm').reset();
    document.getElementById('addUserModalLabel').textContent = "Add New User";
    const saveButton = document.querySelector('#addUserModal .btn-primary');
    saveButton.textContent = "Save User";
    saveButton.onclick = addUser;
});