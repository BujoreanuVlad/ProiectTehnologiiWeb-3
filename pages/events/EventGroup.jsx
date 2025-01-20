import React from "react";
import EventCard from "./EventCard.jsx";
import { Link } from "react-router-dom";  // Schimbăm NavLink cu Link
import { useState, useEffect } from "react";
import { getEvenimenteByGrupId } from "../api.jsx";
import "./eventGroup.css";

const EventGroup = ({ eventGroup }) => {
  const [events, setEvents] = useState([]);

  const getEvenimente = () => {
    getEvenimenteByGrupId(eventGroup.id)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setEvents(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getEvenimente();
  }, []);

  return (
    <div className="event-group">
      <h2>{eventGroup.nume}</h2>
      {events.map((event, index) => (
        <Link key={index} to={`/events/${event.id}`}>  
          <EventCard event={event} />
        </Link>
      ))}
    </div>
  );
};
export default EventGroup;
