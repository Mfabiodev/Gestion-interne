import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CheckForm({ onCheckAdded, onCheckUpdated, checkToEdit, setCheckToEdit }) {
    const [check_number, setCheckNumber] = useState('');
    const [bank_name, setBankName] = useState('');
    const [check_type, setCheckType] = useState('');

    useEffect(() => {
        if (checkToEdit) {
            setCheckNumber(checkToEdit.check_number);
            setBankName(checkToEdit.bank_name);
            setCheckType(checkToEdit.check_type);
        } else {
            setCheckNumber('');
            setBankName('');
            setCheckType('');
        }
    }, [checkToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const checkData = { check_number, bank_name, check_type };

        if (checkToEdit) {
            // Update existing check
            axios.put(`/api/checks/${checkToEdit.id}`, checkData)
                .then(response => {
                    onCheckUpdated(response.data);
                    setCheckToEdit(null);
                })
                .catch(error => {
                    console.error('Error updating check:', error.response.data);
                });
        } else {
            // Add new check
            axios.post('/api/checks', checkData)
                .then(response => {
                    onCheckAdded(response.data);
                    setCheckNumber('');
                    setBankName('');
                    setCheckType('');
                })
                .catch(error => {
                    console.error('Error adding check:', error.response.data);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h4>{checkToEdit ? 'Modifier le Chèque' : 'Ajouter un Chèque'}</h4>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <label>Numéro de chèque</label>
                    <input type="text" name="check_number" value={check_number} onChange={(e) => setCheckNumber(e.target.value)} className="form-control" required />
                </div>
                <div className="col-md-4 mb-3">
                    <label>Banque</label>
                    <input type="text" name="bank_name" value={bank_name} onChange={(e) => setBankName(e.target.value)} className="form-control" required />
                </div>
                <div className="col-md-4 mb-3">
                    <label>Type de chèque</label>
                    <input type="text" name="check_type" value={check_type} onChange={(e) => setCheckType(e.target.value)} className="form-control" required />
                </div>
            </div>
            <button type="submit" className="btn btn-primary">{checkToEdit ? 'Mettre à jour' : 'Ajouter'}</button>
            {checkToEdit && (
                <button type="button" className="btn btn-secondary ms-2" onClick={() => setCheckToEdit(null)}>Annuler</button>
            )}
        </form>
    );
}

export default CheckForm;
