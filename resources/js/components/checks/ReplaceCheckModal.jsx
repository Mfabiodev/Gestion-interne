import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ReplaceCheckModal({ checkToReplace, onClose, onCheckReplaced }) {
    const [availableChecks, setAvailableChecks] = useState([]);
    const [selectedCheck, setSelectedCheck] = useState('');

    useEffect(() => {
        axios.get('/api/checks?status=disponible&pagination=false')
            .then(response => {
                setAvailableChecks(response.data);
            })
            .catch(error => console.error('Error fetching available checks:', error));
    }, []);

    const handleReplace = () => {
        if (!selectedCheck) return;

        axios.post(`/api/checks/${checkToReplace.id}/replace`, { new_check_id: selectedCheck })
            .then(() => {
                onCheckReplaced();
                onClose();
            })
            .catch(error => {
                console.error('Error replacing check:', error.response.data);
                alert(error.response.data.message || 'Une erreur est survenue.');
            });
    };

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Remplacer le chèque {checkToReplace.check_number}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <p>Sélectionnez un chèque disponible pour remplacer l'ancien.</p>
                        <select
                            className="form-select"
                            value={selectedCheck}
                            onChange={(e) => setSelectedCheck(e.target.value)}
                        >
                            <option value="">Sélectionner un chèque</option>
                            {availableChecks.map(check => (
                                <option key={check.id} value={check.id}>
                                    {check.check_number} - {check.bank_name} - {check.amount}€
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
                        <button type="button" className="btn btn-primary" onClick={handleReplace} disabled={!selectedCheck}>Remplacer</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReplaceCheckModal;