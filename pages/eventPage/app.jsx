import React, { useState } from "react";
import Navbar from "../components/navbar.jsx";
import "./app.css";
import Event from "./event.jsx";
const App = () => {
  return (
   <>
      <Navbar/>
      <Event/>
    </>
  );
};

export default App;
