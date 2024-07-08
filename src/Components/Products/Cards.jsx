import React from "react";
import { useState } from "react";

const Cards = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="cards">
      <div className="image">
        <img src="https://via.placeholder.com/800x400.png?text=Image+1" />
      </div>
      <div className="contents">
        <div className="name">
          <h1>Chilli Paneer</h1>
        </div>
        <div className="contents1">
          <div className="quantity">
            <button>+</button>
            <input type="text" value="0" />
            <button>-</button>
          </div>
          <div className="dd">
            <select className="dropdown">
              <option value="half">Half</option>
              <option value="full">Full</option>
            </select>
          </div>
          <div className="price">
            <h3>Rs. 120/-</h3>
          </div>
        </div>
        <hr className="otherline" />
        <div className="cartoption">
          <button className="btn-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
