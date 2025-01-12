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
    return date.toLocaleDateString("ro-RO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <>
      <NavbarAdmin />
      <div className="event-container">
        <div className="section">
          <div className="event-header">
            <div className="event-title">
              <h1>{event.nume}</h1>
              <p>
                Data: {formatDate(event.dataDeschidere)} | Durata:{" "}
                {event.interval} minute
              </p>
            </div>

            <div className="event-details-right">
              <p>Nr. locuri disponibile: {event.nrLocuriDisponibile}</p>
              <p>Cod acces: {event.codAcces}</p>
              <p>Stare: {event.stare}</p>
            </div>
          </div>

          <div className="event-details-body">
          Descriere Eveniment de Crăciun 🎄🎅
            Titlu: Magia Crăciunului – O Seară de Poveste

            Descriere:
            Intră în atmosfera feerică a sărbătorilor de iarnă și alătură-te nouă pentru o seară plină de magie, bucurie și surprize! Într-un decor strălucitor, specific Crăciunului, vei avea ocazia să petreci momente de neuitat alături de cei dragi. Evenimentul nostru aduce împreună oameni frumoși, tradiții calde și activități captivante, menite să îți aducă zâmbetul pe buze.

            Ce te așteaptă?
            ✨ Spectacol de colinde interpretat de un cor local.
            ✨ Atelier de creație pentru copii – Decorațiuni de Crăciun și scrisori pentru Moș Crăciun.
            ✨ Bucate tradiționale: cozonaci, vin fiert cu scorțișoară, turtă dulce și multe altele.
            ✨ Vizita mult așteptată a lui Moș Crăciun, cu cadouri pentru cei mici.
            ✨ Târg de Crăciun cu produse artizanale și decorațiuni de sezon.
            ✨ Foc de artificii pentru a încheia seara într-un mod spectaculos. 
         </div>
          <div className="edit-button-container">
            <button className="edit-button">Modifică Detaliile</button>
          </div>
        </div>
        <Participants />
      </div>
    </>
  );
};

export default EventDetails;
