import React, { useState } from 'react';  
import { FaUserCircle } from "react-icons/fa";
import AddEventGroup from './AddEventGroup.jsx';  
import AddEvent from './AddEvent.jsx';  // Asigură-te că ai importat componenta AddEvent
import "./navbarAdmin.css";

const NavbarAdmin = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false); // Starea pentru modalul de eveniment
  
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log("Delogare...");
  };

  const handleCloseGroupModal = () => {
    setShowGroupModal(false);  // Închide modalul pentru grupuri
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false);  // Închide modalul pentru evenimente
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>My App</h2>
      </div>

      <div className="navbar-right">
        <div className="user-info">
          <button onClick={() => setShowGroupModal(true)}>Adaugă grup evenimente</button>
          <button onClick={() => setShowEventModal(true)}>Adaugă eveniment</button> {/* Buton pentru adăugarea evenimentelor */}
          <span>Admin</span>
          <button className="user-icon" onClick={toggleDropdown}>
            <FaUserCircle size={30}/>
          </button>
          {isDropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li onClick={handleLogout}>Delogare</li>
                </ul>
              </div>
          )}
        </div>
      </div>

      {showGroupModal && (
        <AddEventGroup
          show={showGroupModal}
          onClose={handleCloseGroupModal}
          onAddGroup={(group) => console.log("Group Added:", group)} 
        />
      )}

      {showEventModal && (
        <AddEvent
          show={showEventModal}
          onClose={handleCloseEventModal}
          onAddEvent={(event) => console.log("Event Added:", event)} 
        />
      )}
    </nav>
  );
};

export default NavbarAdmin;
