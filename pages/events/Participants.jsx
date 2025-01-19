import React, { useState, useEffect } from "react";
import { getParticipantsByEvenimentId } from "../api.jsx";
import { useParams } from "react-router-dom";
import "./participants.css";

const Participants = () => {
  const [participants, setParticipants] = useState([]);
  const { eventId } = useParams(); 

  const getParticipants = () => {
    getParticipantsByEvenimentId(eventId)
      .then((response) => {
        if (response.status === 200) {
          console.log("Aici sunt participanții : ", response.data);
          setParticipants(response.data);
        }
      })
      .catch((error) => {
        console.error("Aici este : ", error);
      });
  };

  useEffect(() => {
    getParticipants();
  }, [eventId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("ro-RO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const downloadCSV = () => {
    // CSV header
    const headers = ["Nume", "Prenume", "Telefon", "Email", "Data nașterii"];
    // Convert participants data to CSV rows
    const rows = participants.map((participant) => [
      participant.nume,
      participant.prenume,
      participant.nrTelefon,
      participant.email,
      formatDate(participant.dataNastere),
    ]);

    // Combine header and rows into CSV format
    const csvContent =
        [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
        "download",
        `participants_event_${eventId}.csv` // Filename for the downloaded file
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="participants-section">
    <h2>Participanți</h2>
    {participants.length > 0 ? (
      <div className="participants-table-container">
        <table className="participants-table">
          <thead>
            <tr>
              <th>Nume</th>
              <th>Prenume</th>
              <th>Telefon</th>
              <th>Email</th>
              <th>Data nașterii</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((participant) => (
              <tr key={participant.username}>
                <td>{participant.nume}</td>
                <td>{participant.prenume}</td>
                <td>{participant.nrTelefon}</td>
                <td>{participant.email}</td>
                <td>{formatDate(participant.dataNastere)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p>Nu există participanți pentru acest eveniment.</p>
    )}
    <button className="download-button" onClick={downloadCSV}>
          Descarcă lista participanți
        </button>
  </div>
  
  );
};

export default Participants;
