// Загружаем пользователей, когда DOM готов
document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
});

// Функция для загрузки пользователей
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
        usersTableBody.innerHTML = ''; // Очищаем таблицу
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

// Функция для открытия модального окна и загрузки данных пользователя для редактирования
function openEditUserModal(userId) {
    // Открываем модальное окно
    $('#addUserModal').modal('show');
    document.getElementById('addUserModalLabel').textContent = "Edit User";

    // Меняем поведение кнопки "Save"
    const saveButton = document.querySelector('#addUserModal .btn-primary');
    saveButton.textContent = "Save Changes";
    saveButton.onclick = function() {
        saveUserChanges(userId);
    };

    // Загружаем данные пользователя
    fetch(`/api/users/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Basic ' + btoa('admin@example.com:admin'),
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(user => {
        // Заполняем форму данными пользователя
        document.getElementById('firstName').value = user.firstName;
        document.getElementById('lastName').value = user.lastName;
        document.getElementById('age').value = user.age;
        document.getElementById('email').value = user.email;

        // Сохраняем старый пароль в скрытое поле (на фронте)
        document.getElementById('password').value = ''; // Новое поле пароля (оставляем пустым для нового пароля)
        document.getElementById('oldPassword').value = user.password; // Добавляем старый пароль в скрытое поле

        // Заполняем роли
        const rolesSelect = document.getElementById('roles');
        Array.from(rolesSelect.options).forEach(option => {
            option.selected = user.roles.some(role => role.name === option.value);
        });
    })
    .catch(error => console.error('Error fetching user:', error));
}

// Функция для сохранения изменений пользователя
function saveUserChanges(userId) {
    const updatedUser = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        age: document.getElementById('age').value,
        email: document.getElementById('email').value,
        roles: Array.from(document.getElementById('roles').selectedOptions).map(option => option.value)
    };

    // Проверяем, если новый пароль введен, то передаем его
    const newPassword = document.getElementById('password').value;
    if (newPassword.trim() !== "") {
        updatedUser.password = newPassword;
    } else {
        // Если новый пароль не введен, передаем старый пароль
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
        $('#addUserModal').modal('hide'); // Закрыть модальное окно
        loadUsers(); // Обновить список пользователей
    })
    .catch(error => console.error('Error updating user:', error));
}

// Функция для добавления нового пользователя
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
        $('#addUserModal').modal('hide'); // Закрыть модальное окно
        loadUsers(); // Обновить список пользователей
    })
    .catch(error => console.error('Error adding user:', error));
}

// Функция для удаления пользователя
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
            loadUsers(); // Обновить список пользователей
        })
        .catch(error => console.error('Error deleting user:', error));
    }
}

// Открытие модального окна для добавления нового пользователя
document.querySelector('button[data-target="#addUserModal"]').addEventListener('click', () => {
    // Сбрасываем форму
    document.getElementById('addUserForm').reset();
    document.getElementById('addUserModalLabel').textContent = "Add New User";
    const saveButton = document.querySelector('#addUserModal .btn-primary');
    saveButton.textContent = "Save User";
    saveButton.onclick = addUser; // Назначаем функцию для добавления нового пользователя
});