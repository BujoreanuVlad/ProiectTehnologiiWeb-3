import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./navbarAdmin.css";

const NavbarAdmin = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log("Delogare...");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>My App</h2>
      </div>

      <div className="navbar-right">
        <div className="user-info">
          <button>Adaugă grup evenimente</button>
          <button>Adaugă eveniment</button>
          <span>Admin</span>
          <button className="user-icon" onClick={toggleDropdown}>
            <FaUserCircle size={30} />
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
    </nav>
  );
};

export default NavbarAdmin;