import React from "react";
import "./events.css";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const params = useParams();
  console.log("params", params);
  return (
    <div className="event-container">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="admin-section">
          <div className="circle"></div>
          <span className="admin-text">Admin</span>
        </div>
        <div className="square"></div>
      </div>

      {/* Event Section */}
      <div className="section">
        <h2 className="section-title">Eveniment</h2>
        <div className="event-details">Detalii eveniment</div>
      </div>

      {/* Participants Section */}
      <div className="section">
        <h2 className="section-title">Participanti</h2>
        <div className="participants-container">
          <div className="participant-list">Lista participanti</div>
          <button className="export-button">Export CSV</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
