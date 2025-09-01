import React, { useState } from 'react';
import axios from 'axios';

function CheckImport({ onImportSuccess }) {
    const [file, setFile] = useState(null);
    const [isImporting, setIsImporting] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleImport = () => {
        if (!file) {
            setError('Veuillez sélectionner un fichier.');
            return;
        }

        const formData = new FormData();
        formData.append('checks_file', file);

        setIsImporting(true);
        setError('');

        axios.post('/api/checks/import', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            onImportSuccess();
            setFile(null);
            alert('Importation réussie !');
        })
        .catch(error => {
            console.error('Error importing checks:', error.response.data);
            setError("Erreur lors de l'importation. Veuillez vérifier le format du fichier.");
        })
        .finally(() => {
            setIsImporting(false);
        });
    };

    return (
        <div className="mb-4">
            <h4>Importer des Chèques depuis Excel</h4>
            <div className="input-group">
                <input type="file" className="form-control" onChange={handleFileChange} accept=".xlsx, .xls, .csv" />
                <button className="btn btn-secondary" onClick={handleImport} disabled={isImporting}>
                    {isImporting ? 'Importation...' : 'Importer'}
                </button>
            </div>
            {error && <div className="text-danger mt-2">{error}</div>}
        </div>
    );
}

export default CheckImport;
