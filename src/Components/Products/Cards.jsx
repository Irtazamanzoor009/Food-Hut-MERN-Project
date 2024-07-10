import React from "react";
import { useState } from "react";

const Cards = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = props.items.options[0];
  const priceOptions = Object.keys(options)
  


  return (
    <div className="cards">
      <div className="image">
        <img src={props.items.img} />
      </div>
      <div className="nameitem">
        <div className="name">
          <h1>{props.items.name}</h1>
        </div>
      </div>
      <div className="contents">
        <div className="information">
          <div className="contents1">
            <div className="quantity">
              <button>+</button>
              <input type="text" value="0" />
              <button>-</button>
            </div>
            <div className="dd">
              <select className="dropdown">
                {priceOptions.map((item)=>{
                  return (
                    <option value={item} key={item}>{item}</option>
                  )
                })}
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
    </div>
  );
};

export default Cards;
