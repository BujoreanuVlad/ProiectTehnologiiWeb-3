import React, { useState, useEffect } from "react";
import Navbar from "../components/navbar.jsx";
import "./app.css";
import Timeline from "./timeline.jsx";
import { getEventsByParticipantId } from "../api.jsx"
import Cookies from 'universal-cookie';
import { useLocation } from "react-router-dom";

const App = () => {

	const [evenimenteInregistrare, setEvenimenteInregistrate] = useState([])
  const cookies = new Cookies()
  const token = cookies.get("authToken")
  const state = useLocation()
  console.log(state)
  const {username} = state.state

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
      <Navbar username={username} evenimente={evenimenteInregistrare} setEvenimente={setEvenimenteInregistrate}/>
      <header className="app-header">
        <h1>{"Bun venit, " + username + "!"}</h1>
      </header>
      <Timeline username={username} setEvenimenteInregistrate={setEvenimenteInregistrate}/>
      </>
  );
};

export default App;
