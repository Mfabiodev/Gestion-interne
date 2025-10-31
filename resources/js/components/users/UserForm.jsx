import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserForm({ onFormSubmit, selectedUser, setSelectedUser }) {
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (selectedUser) {
            setUserData({ name: selectedUser.name, email: selectedUser.email, password: '' });
            setIsEditing(true);
            setErrors({});
        } else {
            setUserData({ name: '', email: '', password: '' });
            setIsEditing(false);
            setErrors({});
        }
    }, [selectedUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const method = isEditing ? 'put' : 'post';
        const url = isEditing ? `/api/users/${selectedUser.id}` : '/api/users';

        axios[method](url, userData)
            .then(response => {
                onFormSubmit(response.data);
                cancelEdit();
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    setErrors(error.response.data.errors);
                } else {
                    console.error('Error submitting form:', error);
                }
            });
    };

    const cancelEdit = () => {
        setSelectedUser(null);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-4">
            <h4>{isEditing ? 'Modifier' : 'Ajouter'} un Opérateur</h4>
            <div className="row">
                <div className="col-md-6 mb-3">
                    <label>Nom</label>
                    <input type="text" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} className={`form-control ${errors.name ? 'is-invalid' : ''}`} required />
                    {errors.name && <div className="invalid-feedback">{errors.name[0]}</div>}
                </div>
                <div className="col-md-6 mb-3">
                    <label>Email</label>
                    <input type="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} className={`form-control ${errors.email ? 'is-invalid' : ''}`} required />
                    {errors.email && <div className="invalid-feedback">{errors.email[0]}</div>}
                </div>
                <div className="col-md-12 mb-3">
                    <label>Mot de passe {isEditing ? '(8 min, laisser vide pour ne pas changer)' : '(8 caractères minimum)'}</label>
                    <input type="password" value={userData.password} onChange={(e) => setUserData({ ...userData, password: e.target.value })} className={`form-control ${errors.password ? 'is-invalid' : ''}`} required={!isEditing} />
                    {errors.password && <div className="invalid-feedback">{errors.password[0]}</div>}
                </div>
            </div>
            <button type="submit" className="btn btn-primary">{isEditing ? 'Mettre à jour' : 'Créer'}</button>
            {isEditing && <button type="button" className="btn btn-secondary ms-2" onClick={cancelEdit}>Annuler</button>}
        </form>
    );
}

export default UserForm;
