import React from "react";
import "./UserEventsModal.css"; 
import { confirmaPrezentaParticipantLaEveniment, getEventsByParticipantId } from "../api.jsx";
import Cookies from 'universal-cookie';

const UserEventsModal = ({ show, onClose, evenimente, setEvenimente, username }) => {
  if (!show) return null; 

  const cookies = new Cookies()
  const token = cookies.get("authToken")

  const submitCode = async (ev, cod) => {

	try {

		await confirmaPrezentaParticipantLaEveniment(username, ev.id, cod, token)
		await getEventsByParticipantId(username, token)
		.then((response) => {
			if (response.status === 200) {
				setEvenimente(response.data)
			}
    	})
		.catch((error) => {
			console.error(error)
		})
	}
	catch(error) {
	  console.error("Eroare. Cod invalid")
	}
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Butonul "X" pentru închidere */}
        <button className="close-btn" onClick={onClose}>
          X
        </button>

        <h2>Evenimentele mele</h2>
        <ul>
          {evenimente.length > 0 ? (
            evenimente.map((eveniment) => {
				if (eveniment.inscriere_eveniment.dataPrezenta) {
					return (
						  <li key={eveniment.id}>
							<strong>{eveniment.nume}</strong> - {eveniment.dataDeschidere} {eveniment.stare}
						  </li>
						  )
			  }
			  else {
					return (
					<form onSubmit={(ev) => {ev.preventDefault(); submitCode(eveniment, ev.target["0"].value)}}>
						<li key={eveniment.id}>
							<strong>{eveniment.nume}</strong> - {eveniment.dataDeschidere} {eveniment.stare} <input type="text" placeholder="cod acces"/> <input type="submit" value="submit code"/>
						</li>
					</form>
						  )
			  }
            })
          ) : (
            <p>Nu aveți niciun eveniment programat.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default UserEventsModal;
