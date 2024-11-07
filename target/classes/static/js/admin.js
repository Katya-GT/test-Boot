$(document).ready(function() {
    loadUsers();

    function loadUsers() {
        fetch('/api/users')
            .then(response => response.json())
            .then(users => {
                let usersBody = '';
                users.forEach(user => {
                    usersBody += `<tr>
                        <td>${user.id}</td>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.age}</td>
                        <td>${user.email}</td>
                        <td>${user.roles.map(role => role.name).join(', ')}</td>
                        <td>
                            <a href="/admin/edit?id=${user.id}" class="btn btn-warning btn-sm">Edit</a>
                            <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Delete</button>
                        </td>
                    </tr>`;
                });
                $('#usersBody').html(usersBody);
            });
    }

    window.deleteUser = function(id) {
        if (confirm('Are you sure?')) {
            fetch(`/api/users/${id}`, {
                method: 'DELETE'
            }).then(() => loadUsers());
        }
    };
});