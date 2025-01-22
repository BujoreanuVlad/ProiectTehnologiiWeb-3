import React, { useState, useEffect, useCallback } from "react";
import EventCard from "./EventCard.jsx";
import { Link } from "react-router-dom";
import { getGrupEvenimenteAll, getEvenimenteByGrupId, deleteGrupEvenimenteById, deleteEvenimentById } from "../api.jsx";
import "./eventGroup.css";
import Cookies from "universal-cookie";

const EventGroup = ({ eventGroup, setEventGroups }) => {
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

  const handleDeleteGrup = (event) => {

	deleteGrupEvenimenteById(eventGroup.id, token)

	getGrupEvenimenteAll(token)
      .then((response) => {
        if (response.status === 200) {
          setEventGroups((prevData) =>
            JSON.stringify(prevData) !== JSON.stringify(response.data)
              ? response.data
              : prevData
          );
        } else {
          console.error("Eroare la încărcarea grupurilor de evenimente:", response);
        }
      })
      .catch((error) => {
        console.error("Eroare API:", error);
      })
  }

  const handleDeleteEvent = (id) => {

    deleteEvenimentById(id, token)
    getEvenimente()
  }

  return (
    <div className="event-group">
      <h2>{eventGroup.nume}</h2>
      <button onClick={handleDeleteGrup} className="delete-group-btn">Delete</button>
      {
        events.map((event, index) => (
		<>
          <Link key={index} to={`/events/${event.id}`}>
            <EventCard event={event} refreshEvents={getEvenimente}/>
          </Link>
		  <button onClick={() => {handleDeleteEvent(event.id)}} className="delete-event-btn">Delete</button>
		</>
        ))}
    </div>
  );
};

export default EventGroup;
