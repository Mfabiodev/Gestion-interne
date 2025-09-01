import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CheckHistoryModal({ check, onClose }) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (check) {
            axios.get(`/api/checks/${check.id}/history`)
                .then(response => {
                    setHistory(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching check history:', error);
                    setLoading(false);
                });
        }
    }, [check]);

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Historique du chèque: {check.check_number}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {loading ? <p>Chargement...</p> : (
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Action</th>
                                        <th>Utilisateur</th>
                                        <th>Détails</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {history.map(entry => (
                                        <tr key={entry.id}>
                                            <td>{new Date(entry.created_at).toLocaleString()}</td>
                                            <td>{entry.action}</td>
                                            <td>{entry.user ? entry.user.name : 'N/A'}</td>
                                            <td>{entry.details}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckHistoryModal;
