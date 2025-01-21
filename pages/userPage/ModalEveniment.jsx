import React, { useState, useEffect } from "react";
import "./ModalEveniment.css";
import { getEvenimentId } from "../api.jsx";

const ModalEveniment = ({ show, onClose, eveniment, onParticipa }) => {
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    if (eveniment) {
      fetchEventDetails(eveniment.id);
    }
  }, [eveniment]);

  const fetchEventDetails = async (id) => {
    try {
      const details = await getEvenimentId(id);
      setEventDetails(details.data); // Setează detaliile evenimentului
    } catch (error) {
      console.error("Eroare la obținerea detaliilor evenimentului:", error);
    }
  };

  if (!show || !eventDetails) return null;

  return (
    <div className="modal-overlay">
      <div className="custom-modal">
        <button className="close-btn" onClick={onClose}>X</button>
        <h2>Detalii Eveniment</h2>
        
        <div className="event-details">
          {eventDetails.imagineEveniment && <img src={eventDetails.imagineEveniment} alt={eventDetails.nume} className="event-image" />}
          <p><strong>Nume:</strong> {eventDetails.nume}</p>
          <p><strong>Data Deschidere:</strong> {new Date(eventDetails.dataDeschidere).toLocaleDateString()}</p>
          <p><strong>Descriere:</strong> {eventDetails.descriereEveniment}</p>
          <p><strong>Durata:</strong> {eventDetails.interval + " minute"}</p>
        </div>

        <button className="participa-btn" onClick={onParticipa}>Participă</button>
      </div>
    </div>
  );
};

export default ModalEveniment;
