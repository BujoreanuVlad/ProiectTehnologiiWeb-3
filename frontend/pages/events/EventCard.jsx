import React from "react";
import "./eventCard.css";
import {deleteEvenimentById} from "../api.jsx"
import Cookies from "universal-cookie";

const EventCard = ({ event, refreshEvents }) => {
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

  const cookies = new Cookies()
  const token = cookies.get("authToken")

  const handleDeleteEvent = () => {

	deleteEvenimentById(event.id, token)
	refreshEvents()
  }

  return (
    <div className="event-card">
      <h3>{event.nume}</h3>
      <p>{event.stare}</p>
      <p>{formatData(event.dataDeschidere)}</p>
    </div>
  );
};

export default EventCard;
