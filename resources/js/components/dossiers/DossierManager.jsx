import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DossierList from './DossierList';
import DossierForm from './DossierForm';
import AssignCheckModal from './AssignCheckModal';

function DossierManager() {
    const [dossiers, setDossiers] = useState([]);
    const [selectedDossier, setSelectedDossier] = useState(null);

    const fetchDossiers = () => {
        axios.get('/api/dossiers')
            .then(response => {
                setDossiers(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the dossiers!', error);
            });
    };

    useEffect(() => {
        fetchDossiers();
    }, []);

    const handleDossierAdded = (dossier) => {
        fetchDossiers();
    };

    const handleAssignClick = (dossier) => {
        setSelectedDossier(dossier);
    };

    const handleModalClose = () => {
        setSelectedDossier(null);
    };

    const handleCheckAssigned = () => {
        // We could just update the local data, but fetching ensures we have the latest state
        fetchDossiers();
    };

    return (
        <div className="card">
            <div className="card-header">Gestion des Dossiers</div>
            <div className="card-body">
                <DossierForm onDossierAdded={handleDossierAdded} />
                <hr />
                <DossierList dossiers={dossiers} onAssign={handleAssignClick} />
            </div>
            {selectedDossier && (
                <AssignCheckModal
                    dossier={selectedDossier}
                    onClose={handleModalClose}
                    onCheckAssigned={handleCheckAssigned}
                />
            )}
        </div>
    );
}

export default DossierManager;
