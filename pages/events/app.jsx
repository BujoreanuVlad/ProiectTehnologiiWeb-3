import React, { useState, useEffect, useCallback } from "react";
import "./app.css";
import EventGroup from "./EventGroup.jsx";
import NavbarAdmin from "../../components/navbarAdmin.jsx";
import Cookies from "universal-cookie";
import { getGrupEvenimenteAll } from "../api.jsx";

const Events = () => {
  const [grupuriEvenimente, setGrupuriEvenimente] = useState([]);
  const cookies = new Cookies();
  const token = cookies.get("authToken");

  const getGrupuriEvenimente = useCallback(() => {
    if (!token) {
      console.log("Token lipsă. Redirecționează la pagina de login.");
      return;
    }

    getGrupEvenimenteAll(token)
      .then((response) => {
        if (response.status === 200) {
          setGrupuriEvenimente((prevData) =>
            JSON.stringify(prevData) !== JSON.stringify(response.data)
              ? response.data
              : prevData
          );
        } else {
          console.error("Eroare la încărcarea grupurilor de evenimente:", response);
        }
      })
      .catch((error) => {
        console.error("Eroare API:", error);
      });
  }, [token]);

  useEffect(() => {
    getGrupuriEvenimente(); 
    const intervalId = setInterval(getGrupuriEvenimente, 1000); 

    return () => clearInterval(intervalId); 
  }, [getGrupuriEvenimente]);

  return (
    <div className="container">
      <NavbarAdmin />
      <div className="grupEvenimente">
        {grupuriEvenimente.length === 0 ? (
          <p></p>
        ) : (
          grupuriEvenimente.map((group, index) => (
            <EventGroup key={index} eventGroup={group} setEventGroups={setGrupuriEvenimente}/>
          ))
        )}
      </div>
    </div>
  );
};

export default Events;
