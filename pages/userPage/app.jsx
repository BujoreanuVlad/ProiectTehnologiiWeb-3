import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import "./app.css";
import Timeline from "./timeline.jsx";
import { getEventsByParticipantId } from "../api.jsx"
import Cookies from 'universal-cookie';

const App = () => {

	const [evenimenteInregistrare, setEvenimenteInregistrate] = useState([])
  const cookies = new Cookies()
  const token = cookies.get("authToken")
  const username = "mnastase"


  useEffect(() => {

	getEventsByParticipantId(username, token)
	.then((response) => {
		if (response.status === 200) {
			setEvenimenteInregistrate(response.data)
		}
	})
	.catch((error) => {
		console.error(error)
	})
  }, [])

  return (
   <>
      <Navbar username={username} evenimente={evenimenteInregistrare}/>
      <header className="app-header">
        <h1>Bun venit, Utilizator!</h1>
      </header>
      <Timeline username={username}/>
      </>
  );
};

export default App;
