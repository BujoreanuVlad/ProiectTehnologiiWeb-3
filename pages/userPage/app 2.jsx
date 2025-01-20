import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import "./app.css";
import Timeline from "./timeline.jsx";
const App = () => {
  return (
   <>
      <Navbar/>
      <header className="app-header">
        <h1>Bun venit, Utilizator!</h1>
      </header>
      <Timeline/>
      </>
  );
};

export default App;
