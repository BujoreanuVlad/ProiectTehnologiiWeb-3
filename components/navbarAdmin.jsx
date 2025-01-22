import React, { useState } from 'react';  
import { FaUserCircle } from "react-icons/fa";
import AddEventGroup from './AddEventGroup.jsx';  
import AddEvent from './AddEvent.jsx';  
import "./navbarAdmin.css";
import { useNavigate } from 'react-router-dom'; 
import Cookies from 'universal-cookie';


const NavbarAdmin = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false); 
  
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCloseGroupModal = () => {
    setShowGroupModal(false); 
  };

  const handleCloseEventModal = () => {
    setShowEventModal(false); 
  };

  const handleLogout = () => {
    console.log("Delogare...");
    cookies.remove("authToken");
    navigate('/'); 
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2><Evenimente></Evenimente></h2>
      </div>

      <div className="navbar-right">
        <div className="user-info">
          <button onClick={() => setShowGroupModal(true)}>Adaugă grup evenimente</button>
          <button onClick={() => setShowEventModal(true)}>Adaugă eveniment</button> 
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
