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
                        <h5 className="modal-title">Historique du chèque {check.check_number}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {loading ? <p>Chargement...</p> : (
                            <ul className="list-group">
                                {history.map(entry => (
                                    <li key={entry.id} className="list-group-item">
                                        <strong>{entry.action}</strong> par {entry.user.name} le {new Date(entry.created_at).toLocaleString()}
                                        {entry.details && <p className="mb-0"><small>{entry.details}</small></p>}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckHistoryModal;