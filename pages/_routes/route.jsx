import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../login/Login.jsx";
import Events from "../events/Events.jsx";
import EventDetails from "../events/EventDetails.jsx";
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Events />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="events">
          <Route path=":eventId" element={<EventDetails />} />{" "}
          {/*A nested route!*/}
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
