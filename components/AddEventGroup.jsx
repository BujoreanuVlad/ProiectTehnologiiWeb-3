import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { addGrupEvenimente } from '../pages/api.jsx'; // Importă funcția
import './AddEventGroupModal.css'; 


const AddEventGroup = ({ show, onClose, onAddGroup }) => {
    const [groupName, setGroupName] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errObj = {};

        if (!groupName.trim() || !groupName.match("^[a-zA-Z]+$")) {
            errObj.groupName = "Numele trebuie să conțina doar litere!";
          }

        setErrors(errObj);
        return Object.keys(errObj).length; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!validateForm()) {
        try {
            const response = await addGrupEvenimente(groupName);
    
            console.log("Grupul a fost adăugat cu succes:", response);
    
            onAddGroup({ name: groupName });
            
            setGroupName('');
            onClose();
        } catch (error) {
            console.error("Eroare la adăugarea grupului:", error);
            toast.error("A apărut o eroare la adăugarea grupului. Te rugăm să încerci din nou.");
        }
    }
    };
    

    if (!show) return null;

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
                        {errors.groupName && <small className="error">{errors.groupName}</small>}
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
