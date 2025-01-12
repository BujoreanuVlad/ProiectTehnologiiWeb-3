import React from "react";
import "./app.css";
import EventGroup from "./EventGroup.jsx";
import { NavLink } from "react-router-dom";
import {useState, useEffect} from "react";
import {getGrupEvenimenteAll} from "../api.jsx";
import NavbarAdmin from "../../components/navbarAdmin.jsx";

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
    
    <NavbarAdmin></NavbarAdmin>

      {/* Page Content - Events */}
      <div className="grupEvenimente">
        {grupuriEvenimente.map((group, index) => (
          <EventGroup key={index} eventGroup={group} />
        ))}
      </div>
    </div>
  );
};

export default Events;
