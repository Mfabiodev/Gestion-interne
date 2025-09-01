import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import ClientManager from './clients/ClientManager';

import CheckManager from './checks/CheckManager';

import DossierManager from './dossiers/DossierManager';

function Dashboard() {
    const [view, setView] = useState('home'); // home, clients, checks, etc.

    const renderView = () => {
        switch (view) {
            case 'clients':
                return <ClientManager />;
            case 'checks':
                return <CheckManager />;
            case 'dossiers':
                return <DossierManager />;
            case 'home':
            default:
                return (
                    <div>
                        <h1>Tableau de Bord Principal</h1>
                        <p>Statistiques et activités récentes à venir...</p>
                    </div>
                );
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                    <div className="sidebar-sticky">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => setView('home')}>
                                    Tableau de Bord
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => setView('clients')}>
                                    Clients
                                </a>
                            </li>
                             <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => setView('checks')}>
                                    Chèques
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" onClick={() => setView('dossiers')}>
                                    Dossiers
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav>

                <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                    {renderView()}
                </main>
            </div>
        </div>
    );
}

export default Dashboard;

if (document.getElementById('dashboard')) {
    const root = ReactDOM.createRoot(document.getElementById('dashboard'));
    root.render(
        <React.StrictMode>
            <Dashboard />
        </React.StrictMode>
    );
}
