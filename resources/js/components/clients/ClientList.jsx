import React from 'react';

function ClientList({ clients, onEdit, onDelete }) {
    return (
        <div>
            <h2>Liste des Clients</h2>
            {clients.length === 0 ? (
                <p>Aucun client pour le moment.</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Numéro de Police</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id}>
                                <td>{client.name}</td>
                                <td>{client.numero_de_police}</td>
                                <td>
                                    <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(client)}>Modifier</button>
                                    <button className="btn btn-sm btn-danger" onClick={() => onDelete(client.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ClientList;
