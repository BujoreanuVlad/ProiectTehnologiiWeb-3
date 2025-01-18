import React, { useState } from 'react';  
import './AddEventGroupModal.css'; 

const AddEventGroup = ({ show, onClose, onAddGroup }) => {
    const [groupName, setGroupName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (groupName.trim() !== '') {
            onAddGroup({ name: groupName });
            setGroupName('');
            onClose(); // Închide modalul după adăugare
        }
    };

    if (!show) return null; // Dacă show este false, nu afișa modalul

    return (
        <div className="modal-overlay">
            <div className="custom-modal">
                <button className="close-btn" onClick={onClose}>
                    &times;
                </button>
                <h2>Adaugă Grup de Evenimente</h2>
                <form className="modal-form" onSubmit={handleSubmit}>
                    <div className="input-box">
                        <label htmlFor="groupName">Nume Grup</label>
                        <input
                            type="text"
                            id="groupName"
                            placeholder="Introdu numele grupului"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="submit" className="btn primary">
                            Adaugă Grup
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEventGroup;
