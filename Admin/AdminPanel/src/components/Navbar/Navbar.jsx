import React, { useState } from "react";
import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogoutClick = () => {
    localStorage.removeItem("authTokenAdmin");
    localStorage.removeItem("AdminEmail");

    navigate("/");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="container">
      <nav>
        <div className="logo">
          <p>FoodHut</p>
        </div>
        <div className={`main-container ${isOpen ? "open" : ""}`}>
          <div className="contents">
            <button className="menu-btn" onClick={toggleMenu}>
              <i className={`fa ext ${isOpen ? "fa-times" : ""}`}></i>
            </button>
            <ul>
              <li>
                <NavLink to="/mainpage">Home</NavLink>
              </li>
              <li>
                <NavLink to="/contacts">View Contacts</NavLink>
              </li>
              <li>
                <NavLink to="/users">View Users</NavLink>
              </li>
              
            </ul>
          </div>
          <div className="auth-buttons">
            {
              <div className="btns btn-other check-cart">
                <button className="hero-btn logout" onClick={handleLogoutClick}>
                  Log Out
                </button>
              </div>
            }
          </div>
        </div>

        <div className="res-buttons">
          <button className="menu-btn" onClick={toggleMenu}>
            <i className={`fa ${isOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
