import React from "react";
import "./events.css";

const EventCard = ({ event }) => {
  return (
    <div className="event-card">
      <h3>{event.nume}</h3>
      <p>{event.stare}</p>
      <p>{event.dataDeschidere}</p>
    </div>
  );
};

export default EventCard;
