import React from "react";
import EventCard from "./EventCard.jsx";
import { NavLink } from "react-router-dom";

const EventGroup = ({ events }) => {
  return (
    <div className="event-group">
      <h2>Grup Eveniment</h2>
      {events.map((event, index) => (
        <NavLink key={index} to={`/events/${event.id}`}>
          <EventCard {...event} />
        </NavLink>
      ))}
    </div>
  );
};

export default EventGroup;
