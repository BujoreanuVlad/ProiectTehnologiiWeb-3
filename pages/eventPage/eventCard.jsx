import React from "react";
import "./eventCard.css";
import eventImage from "../../resource/89982-original.jpg";
import "./eventCard.css";
const EventCard = () => {
  return (
    <div className="event-card">
      <img src={eventImage} alt="Piesa de teatru" className="event-image" />
      <h1 className="event-title">Piesa de teatru</h1>
    </div>
  );
};

export default EventCard;
