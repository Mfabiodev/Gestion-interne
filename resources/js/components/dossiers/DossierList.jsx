import React from 'react';

function DossierList({ dossiers, onAssign }) {
    return (
        <div>
            <h3>Liste des Dossiers</h3>
            {dossiers.length === 0 ? (
                <p>Aucun dossier pour le moment.</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Numéro de Dossier</th>
                            <th>Opérateur de Saisie</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dossiers.map(dossier => (
                            <tr key={dossier.id}>
                                <td>{dossier.dossier_number}</td>
                                <td>{dossier.user ? dossier.user.name : 'N/A'}</td>
                                <td>
                                    <button className="btn btn-sm btn-outline-primary" onClick={() => onAssign(dossier)}>
                                        Assigner un chèque
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default DossierList;
