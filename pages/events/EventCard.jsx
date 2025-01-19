import React from "react";
import "./eventCard.css";

const EventCard = ({ event }) => {
  const formatData = (dataString) => {
    const data = new Date(dataString);
    const datePart = data.toLocaleDateString("ro-RO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const timePart = data.toLocaleTimeString("ro-RO", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${datePart} ${timePart}`;
  };

  return (
    <div className="event-card">
      <h3>{event.nume}</h3>
      <p>{event.stare}</p>
      <p>{formatData(event.dataDeschidere)}</p>
    </div>
  );
};

export default EventCard;
