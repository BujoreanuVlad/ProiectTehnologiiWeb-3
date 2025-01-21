import React, { useState, useEffect, useCallback } from "react";
import EventCard from "./EventCard.jsx";
import { Link } from "react-router-dom";
import { getEvenimenteByGrupId } from "../api.jsx";
import "./eventGroup.css";
import Cookies from "universal-cookie";

const EventGroup = ({ eventGroup }) => {
  const [events, setEvents] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get("authToken");

  const getEvenimente = useCallback(() => {
    getEvenimenteByGrupId(eventGroup.id, token)
      .then((response) => {
        if (response.status === 200) {
          setEvents(response.data); 
        }
      })
      .catch((error) => {
        console.error("Eroare la obținerea evenimentelor:", error);
      });
  }, [eventGroup.id, token]);

  useEffect(() => {
    getEvenimente(); 
    const intervalId = setInterval(getEvenimente, 1000); 

    return () => clearInterval(intervalId); 
  }, [getEvenimente]);

  return (
    <div className="event-group">
      <h2>{eventGroup.nume}</h2>
      {
        events.map((event, index) => (
          <Link key={index} to={`/events/${event.id}`}>
            <EventCard event={event} />
          </Link>
        ))}
    </div>
  );
};

export default EventGroup;
