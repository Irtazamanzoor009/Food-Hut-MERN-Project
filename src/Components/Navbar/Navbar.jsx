import React, { useState } from "react";
import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import cartimage from "./cart.png";
import { selectCartLength } from "../../redux/CartFunctionality/cartfunctions.js";
import { useSelector } from "react-redux";

const Navbar = () => {
  const totalitems = useSelector(selectCartLength);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLoginClick = () => {
    navigate("/signin");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("UserEmail");

    navigate("/");
  };

  const handleCartClick = () => {
    navigate("/cart");
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
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/contactus">Contact Us</NavLink>
              </li>
              {localStorage.getItem("authToken") && (
                <li>
                  <NavLink to="/myorders">My Orders</NavLink>
                </li>
              )}
              {(isOpen && localStorage.getItem("authToken")) && <li className="spc-logout" onClick={handleLogoutClick}>
                Log Out
              </li>}
              {(isOpen && !(localStorage.getItem("authToken"))) && <li className="spc-logout" onClick={handleLoginClick}>
                Log In
              </li>}
              {(isOpen && !(localStorage.getItem("authToken"))) && <li className="spc-logout" onClick={handleSignupClick}>
               Sign Up
              </li>}
              
            </ul>
          </div>
          <div className="auth-buttons">
            {localStorage.getItem("authToken") ? (
              <div className="btns btn-other">
                <button onClick={handleCartClick} className="hero-btn cart-btn">
                  <img src={cartimage} alt="Cart" />
                  {totalitems > 0 && <p>{totalitems}</p>}
                </button>
                <button className="hero-btn logout" onClick={handleLogoutClick}>
                  Log Out
                </button>
              </div>
            ) : (
              <div className="btns">
                <button className="hero-btn" onClick={handleLoginClick}>
                  Login
                </button>
                <button className="hero-btn" onClick={handleSignupClick}>
                  SignUp
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="res-buttons">
          <button className="menu-btn" onClick={toggleMenu}>
            <i className={`fa ${isOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
          {localStorage.getItem("authToken") && <button className="cart-btn-mobile" onClick={handleCartClick}>
            <img src={cartimage} alt="Cart" />
            {totalitems > 0 && <p>{totalitems}</p>}
          </button>}
          
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
