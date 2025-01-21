import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./navbar.css";
import UserEventsModal from "./userEventsModal.jsx"; 

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showEventsModal, setShowEventsModal] = useState(false); 
  const username = "Jane Doe";

  const evenimente = [
    { id: 1, titlu: "Nuntă la mare", data: "2025-05-15" },
    { id: 2, titlu: "Petrecere de aniversare", data: "2025-06-20" },
    { id: 3, titlu: "Conferință Tech", data: "2025-07-10" },
  ];

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
/>

    </nav>
  );
};

export default Navbar;

