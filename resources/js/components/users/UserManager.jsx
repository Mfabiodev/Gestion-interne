import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './UserList';
import UserForm from './UserForm';

function UserManager() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = () => {
        axios.get('/api/users')
            .then(response => setUsers(response.data))
            .catch(error => console.error('Error fetching users:', error));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleFormSubmit = (user) => {
        fetchUsers(); // Refetch all users to get the updated list
        setSelectedUser(null);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
    };

    const handleDelete = (userId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
            axios.delete(`/api/users/${userId}`)
                .then(() => fetchUsers())
                .catch(error => console.error('Error deleting user:', error));
        }
    };

    return (
        <div className="card">
            <div className="card-header">Gestion des Opérateurs (Utilisateurs)</div>
            <div className="card-body">
                <UserForm 
                    onFormSubmit={handleFormSubmit} 
                    selectedUser={selectedUser} 
                    setSelectedUser={setSelectedUser} 
                />
                <hr />
                <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        </div>
    );
}

export default UserManager;
