import React, { useState } from "react";
import "./event.css";
import EventCard from "./eventCard.jsx";

const Event = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Controlăm afișarea modalului
  const [selectedDate, setSelectedDate] = useState(null); // Stocăm data selectată

  const dates = ["20 Decembrie 2024", "21 Decembrie 2024", "22 Decembrie 2024"];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmSelection = () => {
    if (selectedDate) {
      alert(`Ați selectat data: ${selectedDate}`);
      closeModal();
    } else {
      alert("Vă rugăm să selectați o dată!");
    }
  };

  return (
    <div className="event-container">
      <div className="event-content">
        <EventCard />
        <div className="event-description">
          În spiritul sărbătorilor, vă invităm să trăiți magia Crăciunului
          printr-o experiență de neuitat! 🎭✨ Piesa de teatru "Magia
          Crăciunului" este o călătorie fascinantă în lumea poveștilor,
          emoțiilor și speranței, ideală pentru toate vârstele. Evenimentul
          nostru promite să transforme o seară obișnuită într-o sărbătoare a
          artei și a bucuriei.
        </div>
      </div>
      <button className="invite-button" onClick={openModal}>
        Solicita invitație
      </button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Selectați o dată</h2>
            <ul className="date-list">
              {dates.map((date) => (
                <li
                  key={date}
                  className={`date-item ${
                    selectedDate === date ? "selected" : ""
                  }`}
                  onClick={() => setSelectedDate(date)}
                >
                  {date}
                </li>
              ))}
            </ul>
            <div className="modal-buttons">
              <button className="modal-confirm" onClick={confirmSelection}>
                Confirmă selecția
              </button>
              <button className="modal-close" onClick={closeModal}>
                Închide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;
