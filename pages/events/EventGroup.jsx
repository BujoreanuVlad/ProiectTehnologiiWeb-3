import React from "react";
import EventCard from "./EventCard.jsx";
import { NavLink } from "react-router-dom";
import {useState, useEffect} from "react";
import {getEvenimenteByGrupId} from "../api.jsx";


const EventGroup = ({eventGroup}) => {

  const [events, setEvents] = useState([]);

  const getEvenimente = () => {
    getEvenimenteByGrupId(eventGroup.id)
    .then((response) => {
      if(response.status == 200) {
        console.log(response)
        setEvents(response.data);
      }
    })
    .catch((error) => {
      console.error(error);
    })
  }

  useEffect(() => {
    getEvenimente();
  }, []);

  return (
    <div className="event-group">
      <h2>{eventGroup.nume}</h2>
      {events.map((event, index) => (
        <NavLink key={index} to={`/events/${event.id}`}>
          <EventCard event={event} />
        </NavLink>
      ))}
    </div>
  );
};

export default EventGroup;
