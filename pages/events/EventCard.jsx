import React from "react";
import "./events.css";

const EventCard = ({ name, state, openDate }) => {
  return (
    <div className="event-card">
      <h3>{name}</h3>
      <p>{state}</p>
      <p>{openDate}</p>
    </div>
  );
};

export default EventCard;
