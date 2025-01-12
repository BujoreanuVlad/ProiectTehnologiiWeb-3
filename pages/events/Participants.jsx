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

  return (
    <div className="participants-section">
      <h2>Participanți</h2>
      {participants.length > 0 ? (
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
      ) : (
        <p>Nu există participanți pentru acest eveniment.</p>
      )}
    </div>
  );
};

export default Participants;
