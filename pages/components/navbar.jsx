import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "./navbar.css";

const Navbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const username = "John Doe";

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
          <span>{username}</span>
          <button className="user-icon" onClick={toggleDropdown}>
            <FaUserCircle size={30} />
          </button>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <ul>
                <li>Evenimentele mele</li>
                <li onClick={handleLogout}>Delogare</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
