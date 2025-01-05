import React from "react";
import "./events.css";
import EventGroup from "./EventGroup.jsx";
import { NavLink } from "react-router-dom";
import {useState, useEffect} from "react";
import {getGrupEvenimenteAll} from "../api.jsx";

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
  
  const [grupuriEvenimente, setGrupuriEvenimente] = useState([]);
  const getGrupuriEvenimente = () => {
    getGrupEvenimenteAll()
    .then((response) => {
      if(response.status == 200) {
        setGrupuriEvenimente(response.data);
      }
    })
    .catch((error) => {
      console.error(error);
    })
  }

useEffect(() => {
  getGrupuriEvenimente();
}, []);

  return (
    <div className="container">
      {/* HEADER -- de schimbat cu navbar*/}
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
        {grupuriEvenimente.map((group, index) => (
          <EventGroup key={index} eventGroup={group} />
        ))}
      </div>
    </div>
  );
};

export default Events;
