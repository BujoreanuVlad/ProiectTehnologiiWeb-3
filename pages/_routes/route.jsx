import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "../login/Login.jsx";
import Events from "../events/app.jsx";
import EventDetails from "../events/EventDetails.jsx";
import App from "../userPage/app.jsx"
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="events">
          <Route path=":eventId" element={<EventDetails />} />{" "}
        </Route>
        <Route path="/admin" element={<Events />} />
        <Route path="/user" element={<App />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
