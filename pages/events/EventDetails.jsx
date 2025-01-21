import React, { useState, useEffect } from "react";
import "./eventDetails.css";
import NavbarAdmin from "../../components/navbarAdmin.jsx";
import { getEvenimentId } from "../api.jsx";
import { useParams } from "react-router-dom";
import Participants from "./Participants.jsx";

const EventDetails = () => {
  const [event, setEvent] = useState({});
  const { eventId } = useParams();

  const getEveniment = () => {
    getEvenimentId(eventId)
      .then((response) => {
        if (response.status === 200) {
          console.log("Aici este : ", response.data);
          setEvent(response.data);
        }
      })
      .catch((error) => {
        console.error("Aici este : ", error);
      });
  };

  useEffect(() => {
    getEveniment();
  }, [eventId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString("ro-RO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })} ${date.toLocaleTimeString("ro-RO", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  return (
    <>
      <NavbarAdmin />
      <div className="event-container">
        <div className="section">
          <div className="event-header">
            <div className="event-title">
              <img
                src={event.imagineEveniment}
                alt={event.nume}
                className="event-image"
              />
              <div>
                <h1>{event.nume}</h1>
                <p>
                  Data: {formatDate(event.dataDeschidere)} | Durata:{" "}
                  {event.interval} minute
                </p>
              </div>
            </div>

            <div className="event-details-right">
              <p>Nr. locuri disponibile: {event.nrLocuriDisponibile}</p>
              <p>Cod acces: {event.codAcces}</p>
              <p>Stare: {event.stare}</p>
            </div>
          </div>

          <div className="event-details-body">
            <p>{event.descriereEveniment}</p>
          </div>
        </div>
        <Participants />
      </div>
    </>
  );
};

export default EventDetails;
