import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CheckList from './CheckList';
import CheckForm from './CheckForm';
import CheckImport from './CheckImport';

function CheckManager() {
    const [checks, setChecks] = useState([]);
    const [checkToEdit, setCheckToEdit] = useState(null);

    const fetchChecks = () => {
        axios.get('/api/checks')
            .then(response => {
                setChecks(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the checks!', error);
            });
    };

    useEffect(() => {
        fetchChecks();
    }, []);

    const handleCheckAdded = (newCheck) => {
        setChecks(prevChecks => [newCheck, ...prevChecks]);
    };

    const handleCheckUpdated = (updatedCheck) => {
        setChecks(checks.map(check =>
            check.id === updatedCheck.id ? updatedCheck : check
        ));
    };

    const handleDelete = (checkId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce chèque ?')) {
            axios.delete(`/api/checks/${checkId}`)
                .then(() => {
                    setChecks(checks.filter(check => check.id !== checkId));
                })
                .catch(error => {
                    console.error('Error deleting check:', error.response.data);
                    alert(error.response.data.message || 'Une erreur est survenue.');
                });
        }
    };

    const handleImportSuccess = () => {
        fetchChecks();
    };

    return (
        <div className="card">
            <div className="card-header">Gestion des Chèques</div>
            <div className="card-body">
                <CheckImport onImportSuccess={handleImportSuccess} />
                <hr />
                <CheckForm
                    onCheckAdded={handleCheckAdded}
                    onCheckUpdated={handleCheckUpdated}
                    checkToEdit={checkToEdit}
                    setCheckToEdit={setCheckToEdit}
                />
                <hr />
                <CheckList
                    checks={checks}
                    onEdit={setCheckToEdit}
                    onDelete={handleDelete}
                />
            </div>
        </div>
    );
}

export default CheckManager;
