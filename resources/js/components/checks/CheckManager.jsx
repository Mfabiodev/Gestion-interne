import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CheckList from './CheckList';
import CheckForm from './CheckForm';
import CheckImport from './CheckImport';

import CheckHistoryModal from './CheckHistoryModal';

import ReplaceCheckModal from './ReplaceCheckModal';

import Pagination from '../common/Pagination';

function CheckManager() {
    const [checks, setChecks] = useState([]);
    const [paginationData, setPaginationData] = useState(null);
    const [checkToEdit, setCheckToEdit] = useState(null);
    const [historyCheck, setHistoryCheck] = useState(null);
    const [replaceCheck, setReplaceCheck] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [checkTypes, setCheckTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');

    const fetchChecks = (page = 1, search = '', type = '') => {
        axios.get(`/api/checks?page=${page}&search=${search}&type=${type}`)
            .then(response => {
                setChecks(response.data.data);
                setPaginationData(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the checks!', error);
            });
    };

    const fetchCheckTypes = () => {
        axios.get('/api/dashboard') // Endpoint already provides distinctCheckTypes
            .then(response => {
                setCheckTypes(response.data.distinctCheckTypes);
            })
            .catch(error => console.error('Error fetching check types:', error));
    };

    useEffect(() => {
        fetchCheckTypes();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchChecks(1, searchTerm, selectedType);
        }, 300); // Debounce search requests

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm, selectedType]);

    const handlePageChange = (page) => {
        fetchChecks(page, searchTerm, selectedType);
    };

    const handleCheckAdded = (newCheck) => {
        fetchChecks(1, searchTerm, selectedType);
        fetchCheckTypes(); // Refresh types in case a new one was added
    };

    const handleCheckUpdated = (updatedCheck) => {
        setChecks(checks.map(check =>
            check.id === updatedCheck.id ? updatedCheck : check
        ));
    };

    const handleDelete = (checkId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce chèque ?')) {
            axios.delete(`/api/checks/${checkId}`)
                .then(() => fetchChecks(paginationData.current_page, searchTerm, selectedType))
                .catch(error => {
                    console.error('Error deleting check:', error.response.data);
                    alert(error.response.data.message || 'Une erreur est survenue.');
                });
        }
    };

    const handleImportSuccess = () => {
        fetchChecks(1, searchTerm, selectedType);
        fetchCheckTypes();
    };

    const handleCheckReplaced = () => {
        fetchChecks(paginationData.current_page, searchTerm, selectedType);
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
                <div className="row mb-3">
                    <div className="col-md-8">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="Rechercher un chèque..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <select className="form-select" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                            <option value="">Tous les types</option>
                            {checkTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <CheckList
                    checks={checks}
                    onEdit={setCheckToEdit}
                    onDelete={handleDelete}
                    onShowHistory={setHistoryCheck}
                    onReplace={setReplaceCheck}
                />
                <Pagination meta={paginationData} onPageChange={handlePageChange} />
                {historyCheck && (
                    <CheckHistoryModal 
                        check={historyCheck} 
                        onClose={() => setHistoryCheck(null)} 
                    />
                )}
                {replaceCheck && (
                    <ReplaceCheckModal
                        checkToReplace={replaceCheck}
                        onClose={() => setReplaceCheck(null)}
                        onCheckReplaced={handleCheckReplaced}
                    />
                )}
            </div>
        </div>
    );
}

export default CheckManager;
