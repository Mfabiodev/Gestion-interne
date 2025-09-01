import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ClientForm({ onClientAdded, onClientUpdated, clientToEdit, setClientToEdit }) {
    const [name, setName] = useState('');
    const [numero_de_police, setNumeroDePolice] = useState('');

    useEffect(() => {
        if (clientToEdit) {
            setName(clientToEdit.name);
            setNumeroDePolice(clientToEdit.numero_de_police || '');
        } else {
            setName('');
            setNumeroDePolice('');
        }
    }, [clientToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const clientData = { name, numero_de_police };

        if (clientToEdit) {
            // Update existing client
            axios.put(`/api/clients/${clientToEdit.id}`, clientData)
                .then(response => {
                    onClientUpdated(response.data);
                    setClientToEdit(null); // Clear edit form
                })
                .catch(error => {
                    console.error('Error updating client:', error);
                });
        } else {
            // Add new client
            axios.post('/api/clients', clientData)
                .then(response => {
                    onClientAdded(response.data);
                    setName('');
                    setNumeroDePolice('');
                })
                .catch(error => {
                    console.error('Error adding client:', error);
                });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h3>{clientToEdit ? 'Modifier le Client' : 'Ajouter un Client'}</h3>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nom du client</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="numero_de_police" className="form-label">Numéro de Police</label>
                <input
                    type="text"
                    className="form-control"
                    id="numero_de_police"
                    value={numero_de_police}
                    onChange={(e) => setNumeroDePolice(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">{clientToEdit ? 'Mettre à jour' : 'Ajouter'}</button>
            {clientToEdit && (
                <button type="button" className="btn btn-secondary ms-2" onClick={() => setClientToEdit(null)}>Annuler</button>
            )}
        </form>
    );
}

export default ClientForm;
