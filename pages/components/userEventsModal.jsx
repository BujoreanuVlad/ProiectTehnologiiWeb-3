import React from "react";
import "./UserEventsModal.css"; 

const UserEventsModal = ({ show, onClose, evenimente }) => {
  if (!show) return null; 

  console.log(evenimente)

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Butonul "X" pentru închidere */}
        <button className="close-btn" onClick={onClose}>
          X
        </button>

        <h2>Evenimentele mele</h2>
        <ul>
          {evenimente.length > 0 ? (
            evenimente.map((eveniment) => (
              <li key={eveniment.id}>
                <strong>{eveniment.nume}</strong> - {eveniment.dataDeschidere}
              </li>
            ))
          ) : (
            <p>Nu aveți niciun eveniment programat.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserEventsModal;
