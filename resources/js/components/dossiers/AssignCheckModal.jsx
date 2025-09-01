import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AssignCheckModal({ dossier, onClose, onCheckAssigned }) {
    const [availableChecks, setAvailableChecks] = useState([]);
    const [selectedCheck, setSelectedCheck] = useState('');

    useEffect(() => {
        // Fetch checks with status 'disponible'
        axios.get('/api/checks?status=disponible')
            .then(response => {
                setAvailableChecks(response.data);
            })
            .catch(error => console.error('Error fetching available checks:', error));
    }, []);

    const handleAssign = () => {
        if (!selectedCheck) return;

        axios.post(`/api/dossiers/${dossier.id}/assign-check`, { check_id: selectedCheck })
            .then(() => {
                onCheckAssigned();
                onClose();
            })
            .catch(error => console.error('Error assigning check:', error.response.data));
    };

    return (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Assigner un chèque au dossier {dossier.dossier_number}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <select
                            className="form-select"
                            value={selectedCheck}
                            onChange={(e) => setSelectedCheck(e.target.value)}
                        >
                            <option value="">Sélectionner un chèque disponible</option>
                            {availableChecks.map(check => (
                                <option key={check.id} value={check.id}>
                                    {check.check_number} - {check.bank_name} - {check.amount}€
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Annuler</button>
                        <button type="button" className="btn btn-primary" onClick={handleAssign} disabled={!selectedCheck}>Assigner</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AssignCheckModal;
