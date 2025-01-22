import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./navbar.css";
import UserEventsModal from "./userEventsModal.jsx"; 
import { useNavigate } from 'react-router-dom'; 
import Cookies from 'universal-cookie';
import { deleteUser } from "../api.jsx";

const Navbar = ({ username, evenimente, setEvenimente }) => {
  const cookies = new Cookies();
  const token = cookies.get("authToken")
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showEventsModal, setShowEventsModal] = useState(false); 
//  const [evenimente, setEvenimente] = useState([]); 


/*
  useEffect(() => {

	getEventsByParticipantId(username, token)
	.then((response) => {
		if (response.status === 200) {
			setEvenimente(response.data)
		}
	})
	.catch((error) => {
		console.error(error)
	})
  })
*/

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log("Delogare...");
    cookies.remove("authToken");
    navigate('/');
  };

  const handleDelete = () => {
	deleteUser(username, token)
	.then((response) => {

		if (response.status === 200) {
			cookies.remove("authToken");
			navigate('/');
		}
	})
	.catch((error) => {
		console.error("Eroare la stergerea contului", error)
	})
  }

  const handleShowEvents = () => {
    setShowEventsModal(true);
  };

  const handleCloseEventsModal = () => {
    setShowEventsModal(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Evenimente noi</h2>
      </div>

      <div className="navbar-right">
        <div className="user-info">
          <span>{username}</span>
          <button className="user-icon" onClick={toggleDropdown}>
            <FaUserCircle size={30} />
          </button>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <li onClick={handleShowEvents}>Evenimentele mele</li>
                <li className="delete-account" onClick={handleDelete}>Ștergere cont</li>
                <li onClick={handleLogout}>Delogare</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <UserEventsModal
  show={showEventsModal}
  onClose={handleCloseEventsModal}
  evenimente={evenimente} 
  setEvenimente={setEvenimente} 
  username={username}
/>

    </nav>
  );
};

export default Navbar;

