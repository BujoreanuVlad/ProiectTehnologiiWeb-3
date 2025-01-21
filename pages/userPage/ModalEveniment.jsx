import React from "react";
import "./ModalEveniment.css";

const ModalEveniment = ({ show, onClose, eveniment, onParticipa }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="custom-modal">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Detalii Eveniment</h2>
        
        <div className="event-details">
          {eveniment.imagine && <img src={eveniment.imagine} alt={eveniment.titlu} className="event-image" />}
          <p><strong>Nume:</strong> {eveniment.titlu}</p>
          <p><strong>Data Deschidere:</strong> {eveniment.data}</p>
          <p><strong>Descriere:</strong> {eveniment.descriere}</p>
        </div>

        <button className="participa-btn" onClick={onParticipa}>Participă</button>
      </div>
    </div>
  );
};

export default ModalEveniment;
