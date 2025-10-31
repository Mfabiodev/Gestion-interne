import React from 'react';

function UserList({ users, onEdit, onDelete }) {
    return (
        <div>
            <h3>Liste des Opérateurs</h3>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(user)}>Modifier</button>
                                <button className="btn btn-sm btn-danger" onClick={() => onDelete(user.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
