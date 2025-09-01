import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DossierForm({ onDossierAdded }) {
    const [users, setUsers] = useState([]);
    const [dossierNumber, setDossierNumber] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        // This endpoint doesn't exist yet. I will create it.
        axios.get('/api/users')
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/dossiers', { dossier_number: dossierNumber, user_id: userId })
            .then(response => {
                onDossierAdded(response.data);
                setDossierNumber('');
                setUserId('');
            })
            .catch(error => {
                console.error('Error adding dossier:', error.response.data);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h4>Créer un nouveau dossier</h4>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label>Numéro de Dossier</label>
                    <input type="text" value={dossierNumber} onChange={(e) => setDossierNumber(e.target.value)} className="form-control" required />
                </div>
                <div className="col-md-6 mb-3">
                    <label>Opérateur de Saisie</label>
                    <select value={userId} onChange={(e) => setUserId(e.target.value)} className="form-select" required>
                        <option value="">Sélectionner un opérateur</option>
                        {users.map(user => (
                            <option key={user.id} value={user.id}>{user.name}</option>
                        ))}
                    </select>
                </div>
            </div>
            <button type="submit" className="btn btn-primary">Créer le Dossier</button>
        </form>
    );
}

export default DossierForm;
