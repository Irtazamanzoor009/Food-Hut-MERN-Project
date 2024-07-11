import React from "react";
import "./navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import cartimage from './cart.png'
import { selectCartLength } from "../../redux/CartFunctionality/cartfunctions.js";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/signin");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleLogoutClick = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const handleCartClick = ()=>
  {
    navigate('/cart');
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
            <div className="btns btn-other">
              <div className="cart-btn other-sate">
                <button onClick={handleCartClick} className="hero-btn other-sate1">
                  <img src={cartimage} />
                  <p>{useSelector(selectCartLength)}</p>
                </button>
              </div>
              <div className="other">
                <button className="hero-btn logout" onClick={handleLogoutClick}>
                  Log Out
                </button>
              </div>
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
