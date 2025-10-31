import React from 'react';

function CheckList({ checks, onEdit, onDelete, onShowHistory, onReplace }) {
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
                        <th>Dossier</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {checks.map(check => (
                        <tr key={check.id} className={check.status === 'remplacé' ? 'table-danger' : ''}>
                            <td>{check.check_number}</td>
                            <td>{check.bank_name}</td>
                            <td>{check.check_type}</td>
                            <td>{check.dossier ? check.dossier.dossier_number : '-'}</td>
                            <td>
                                {getStatusBadge(check.status)}
                                {check.status === 'remplacé' && check.replaced_by && (
                                    <small className="d-block">Remplacé par: {check.replaced_by.check_number}</small>
                                )}
                            </td>
                            <td>
                                <button className="btn btn-sm btn-info me-2" onClick={() => onShowHistory(check)}>Historique</button>
                                <button className="btn btn-sm btn-primary me-2" onClick={() => onEdit(check)} disabled={check.status !== 'disponible'}>Modifier</button>
                                {check.status === 'utilisé' && (
                                    <button className="btn btn-sm btn-warning me-2" onClick={() => onReplace(check)}>Remplacer</button>
                                )}
                                <button className="btn btn-sm btn-danger" onClick={() => onDelete(check.id)} disabled={check.status !== 'disponible'}>Supprimer</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CheckList;
