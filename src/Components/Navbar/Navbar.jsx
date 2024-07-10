import React from "react";
import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/signin");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLogoutClick = ()=>{
    localStorage.removeItem("authToken")
    navigate("/");
  }

  return (
    <div className="container">
      <nav>
        <div className="items">
          <div className="logo">
            <p>FoodHut</p>
          </div>
          <div className="contents">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>

              {localStorage.getItem("authToken") && (
                <li>
                  <NavLink to="/">My Orders</NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="buttons">
          {localStorage.getItem("authToken") ? (
            <div className="btns">
              <button className="hero-btn">My Cart</button>
              <button className="hero-btn logout" onClick={handleLogoutClick}>Log Out</button>
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
      </nav>
    </div>
  );
};

export default Navbar;
