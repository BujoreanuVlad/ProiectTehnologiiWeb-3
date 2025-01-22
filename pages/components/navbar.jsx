import React, { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./navbar.css";
import UserEventsModal from "./userEventsModal.jsx"; 

const Navbar = ({ username, evenimente, setEvenimente }) => {
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
  };

  const handleShowEvents = () => {
    setShowEventsModal(true);
  };

  const handleCloseEventsModal = () => {
    setShowEventsModal(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>My App</h2>
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
                <li>
                  <button onClick={handleShowEvents}>Evenimentele mele</button>
                </li>
                <li onClick={handleLogout}>Delogare</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Modala pentru a afisa evenimentele */}
      <UserEventsModal
  show={showEventsModal}
  onClose={handleCloseEventsModal}
  evenimente={evenimente} // Trimitem lista de evenimente ca prop
  setEvenimente={setEvenimente} // Trimitem lista de evenimente ca prop
  username={username}
/>

    </nav>
  );
};

export default Navbar;

