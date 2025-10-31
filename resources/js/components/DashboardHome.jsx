import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

function DashboardHome() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/dashboard')
            .then(response => {
                setStats(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching dashboard data:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Chargement du tableau de bord...</p>;
    }

    const statusData = {
        labels: Object.keys(stats.checksByStatus),
        datasets: [{
            label: 'Chèques par Statut',
            data: Object.values(stats.checksByStatus),
            backgroundColor: ['#28a745', '#ffc107', '#dc3545', '#6c757d'],
        }],
    };

    const typeData = {
        labels: Object.keys(stats.checksByType),
        datasets: [{
            label: 'Chèques par Type',
            data: Object.values(stats.checksByType),
        }],
    };

    return (
        <div>
            <h1>Tableau de Bord</h1>
            <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Chèques par Statut</div>
                        <div className="card-body">
                            <Pie data={statusData} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Chèques par Type</div>
                        <div className="card-body">
                            <Bar data={typeData} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Chèques Disponibles par Type</div>
                        <div className="card-body">
                            <ul className="list-group">
                                {Object.entries(stats.availableChecksByType).map(([type, count]) => (
                                    <li key={type} className="list-group-item d-flex justify-content-between align-items-center">
                                        {type}
                                        <span className="badge bg-primary rounded-pill">{count}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Derniers Chèques Ajoutés</div>
                        <div className="card-body">
                            <ul className="list-group">
                                {stats.recentChecks.map(check => (
                                    <li key={check.id} className="list-group-item">
                                        Chèque <strong>{check.check_number}</strong> pour <strong>{check.client ? check.client.name : 'Client non défini'}</strong>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardHome;
