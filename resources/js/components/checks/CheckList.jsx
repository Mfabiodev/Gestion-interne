import React from 'react';

function CheckList({ checks, onEdit, onDelete }) {
    const getStatusBadge = (status) => {
        switch (status) {
            case 'disponible':
                return <span className="badge bg-success">{status}</span>;
            case 'utilisé':
                return <span className="badge bg-warning text-dark">{status}</span>;
            case 'annulé':
                return <span className="badge bg-danger">{status}</span>;
            case 'remplacé':
                return <span className="badge bg-secondary">{status}</span>;
            default:
                return <span className="badge bg-light text-dark">{status}</span>;
        }
    };

    return (
        <div>
            <h4>Liste des Chèques</h4>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Numéro</th>
                        <th>Banque</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {checks.map(check => (
                        <tr key={check.id}>
                            <td>{check.check_number}</td>
                            <td>{check.bank_name}</td>
                            <td>{check.check_type}</td>
                            <td>{getStatusBadge(check.status)}</td>
                            <td>
                                <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(check)}>Modifier</button>
                                <button className="btn btn-sm btn-danger" onClick={() => onDelete(check.id)}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CheckList;
