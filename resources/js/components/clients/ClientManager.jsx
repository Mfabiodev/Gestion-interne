import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientList from './ClientList';
import ClientForm from './ClientForm';
import ClientImport from './ClientImport';

function ClientManager() {
    const [clients, setClients] = useState([]);
    const [clientToEdit, setClientToEdit] = useState(null);

    const fetchClients = () => {
        axios.get('/api/clients')
            .then(response => {
                setClients(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the clients!', error);
            });
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleClientAdded = (client) => {
        fetchClients();
    };

    const handleClientUpdated = (updatedClient) => {
        setClients(clients.map(client =>
            client.id === updatedClient.id ? updatedClient : client
        ));
        fetchClients();
    };

    const handleDelete = (clientId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce client ?')) {
            axios.delete(`/api/clients/${clientId}`)
                .then(() => {
                    setClients(clients.filter(client => client.id !== clientId));
                })
                .catch(error => {
                    console.error('Error deleting client:', error);
                });
        }
    };

    const handleImportSuccess = () => {
        fetchClients();
    };

    return (
        <div className="card">
            <div className="card-header">Gestion des Clients</div>
            <div className="card-body">
                <ClientImport onImportSuccess={handleImportSuccess} />
                <hr />
                <ClientForm
                    onClientAdded={handleClientAdded}
                    onClientUpdated={handleClientUpdated}
                    clientToEdit={clientToEdit}
                    setClientToEdit={setClientToEdit}
                />
                <hr />
                <ClientList
                    clients={clients}
                    onEdit={setClientToEdit}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
}

export default ClientManager;
