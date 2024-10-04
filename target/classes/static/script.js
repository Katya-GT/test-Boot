const modal = document.getElementById("editModal");
const span = document.getElementsByClassName("close")[0];

document.addEventListener('DOMContentLoaded', getUsers);

span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

function getUsers() {
    fetch('/api/users')
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('#userTable tbody');
            tbody.innerHTML = '';
            data.forEach(user => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.email}</td>
                    <td>${user.firstName}</td>
                    <td>${user.lastName}</td>
                    <td>${user.age}</td>
                    <td>${user.roles.map(role => role.name).join(', ')}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteUser(${user.id})">Delete</button>
                        <button class="btn btn-warning" onclick="openEditModal(${user.id})">Edit</button>
                    </td>
                `;
                tbody.appendChild(row);
            });
        });
}

function deleteUser(id) {
    fetch(`/api/users/${id}`, {
        method: 'DELETE',
    }).then(response => {
        if (response.ok) {
            getUsers();
        }
    });
}

document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const newUser = {
        email: document.getElementById('email').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        age: document.getElementById('age').value,
        roles: [{ name: document.getElementById('roles').value }],
        password: document.getElementById('password').value
    };
    fetch('/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
    }).then(response => {
        if (response.ok) {
            document.getElementById('userForm').reset();
            getUsers();
        }
    });
});

function openEditModal(id) {
    fetch(`/api/users/${id}`)
        .then(response => response.json())
        .then(user => {
            document.getElementById('editUserId').value = user.id;
            document.getElementById('editEmail').value = user.email;
            document.getElementById('editFirstName').value = user.firstName;
            document.getElementById('editLastName').value = user.lastName;
            document.getElementById('editAge').value = user.age;
            document.getElementById('editRoles').value = user.roles.map(role => role.name).join(', ');
            modal.style.display = "block";
        });
}

document.getElementById('editUserForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const userId = document.getElementById('editUserId').value;
    const updatedUser = {
        email: document.getElementById('editEmail').value,
        firstName: document.getElementById('editFirstName').value,
        lastName: document.getElementById('editLastName').value,
        age: document.getElementById('editAge').value,
        roles: [{ name: document.getElementById('editRoles').value }]
    };
    const password = document.getElementById('editPassword').value;
    if (password) {
        updatedUser.password = password;
    }
    fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
                    'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedUser)
    }).then(response => {
        if (response.ok) {
            modal.style.display = "none";
            getUsers();
        } else {
            console.error('Error updating user:', response);
        }
    });
});