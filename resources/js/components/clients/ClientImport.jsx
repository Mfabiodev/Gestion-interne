import React, { useState } from 'react';
import axios from 'axios';

function ClientImport({ onImportSuccess }) {
    const [file, setFile] = useState(null);
    const [isImporting, setIsImporting] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
        setError('');
    };

    const handleImport = () => {
        if (!file) {
            setError('Veuillez sélectionner un fichier.');
            return;
        }

        const formData = new FormData();
        formData.append('clients_file', file);

        setIsImporting(true);
        setError('');

        axios.post('/api/clients/import', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            onImportSuccess();
            setFile(null);
            // Clear the file input
            document.getElementById('client-import-file').value = '';
            alert('Importation des clients réussie !');
        })
        .catch(error => {
            console.error('Error importing clients:', error.response ? error.response.data : error);
            setError("Erreur lors de l'importation. Veuillez vérifier le format du fichier et les données.");
        })
        .finally(() => {
            setIsImporting(false);
        });
    };

    return (
        <div className="mb-4 p-3 border rounded">
            <h4>Importer des Clients</h4>
            <div className="input-group">
                <input type="file" id="client-import-file" className="form-control" onChange={handleFileChange} accept=".xlsx, .xls, .csv" />
                <button className="btn btn-secondary" onClick={handleImport} disabled={isImporting}>
                    {isImporting ? 'Importation...' : 'Importer'}
                </button>
            </div>
            {error && <div className="text-danger mt-2">{error}</div>}
        </div>
    );
}

export default ClientImport;
