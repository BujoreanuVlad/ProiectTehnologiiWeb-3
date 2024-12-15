import React from "react";
import "./events.css";
import EventGroup from "./EventGroup.jsx";
import { NavLink } from "react-router-dom";

// example data for events
const eventGroupsData = [
  [
    {
      id: 1,
      name: "Nume Eveniment",
      state: "Stare Eveniment",
      openDate: "Data Deschiderii",
    },
    {
      id: 2,
      name: "Nume Eveniment 2",
      state: "Stare Eveniment 2",
      openDate: "Data Deschiderii 2",
    },
    {
      id: 3,
      name: "Nume Eveniment 3",
      state: "Stare Eveniment 3",
      openDate: "Data Deschiderii 3",
    },
  ],
  [
    {
      id: 4,
      name: "Nume Eveniment",
      state: "Stare Eveniment",
      openDate: "Data Deschiderii",
    },
  ],
  [
    {
      id: 5,
      name: "Nume Eveniment",
      state: "Stare Eveniment",
      openDate: "Data Deschiderii",
    },
    {
      id: 6,
      name: "Nume Eveniment 2",
      state: "Stare Eveniment 2",
      openDate: "Data Deschiderii 2",
    },
  ],
  [
    {
      id: 7,
      name: "Nume Eveniment",
      state: "Stare Eveniment",
      openDate: "Data Deschiderii",
    },
  ],
];

const Events = () => {
  return (
    <div className="container">
      {/* HEADER */}
      <div className="top-bar">
        <div className="profile">
          <div className="circle"></div>
          <span>Admin</span>
        </div>
        <NavLink to="/login">
          <div className="square">Login</div>
        </NavLink>
      </div>

      {/* Page Content - Events */}
      <div className="content">
        {eventGroupsData.map((events, index) => (
          <EventGroup key={index} events={events} />
        ))}
      </div>
    </div>
  );
};

export default Events;
