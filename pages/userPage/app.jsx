import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import "./app.css";
import Timeline from "./timeline.jsx";
const App = () => {
  return (
    <div className="main-container">
      <Navbar/>
      <Timeline/>
    </div>
  );
};

export default App;
