import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import {
  addItem,
  selectCartItems,
  updateItem,
} from "../../redux/CartFunctionality/cartfunctions.js";

const Cards = (props) => {
  const cart = useSelector(selectCartItems) || [];
  const dispatch = useDispatch();
  const sizeRef = useRef();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const options = props.items.options[0];
  const priceOptions = Object.keys(options);

  const [qty, setqty] = useState(1);
  const [size, setsize] = useState(priceOptions[1]);

  useEffect(() => {
    setsize(priceOptions[1]);
  }, [props.items.options]);

  const originalPrice = parseFloat(options[size]) || 0;
  const finalPrice = qty * originalPrice;

  const handleAddtoCart = async () => {
    setIsLoading(true);

    if (localStorage.getItem("UserEmail")) {
      const existingItem = cart.find(
        (item) => item.id === props.items._id && item.size === size
      );

      if (existingItem) {
        await dispatch(
          updateItem({
            id: existingItem.id,
            size: existingItem.size,
            updates: {
              qty: existingItem.qty + qty,
              price: existingItem.price + finalPrice,
            },
          })
        );
      } else {
        await dispatch(
          addItem({
            id: props.items._id,
            name: props.items.name,
            originalPrice: originalPrice,
            price: finalPrice,
            qty: qty,
            size: size,
            img: props.items.img,
          })
        );
      }

      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    } else {
      navigate("/signin");
    }
  };

  // useEffect(() => {
  //   setsize(sizeRef.current.value);
  // }, []);

  useEffect(() => {
    // Debug logs
    console.log('Options:', options);
    console.log('Size:', size);
    console.log('Price for selected size:', options[size]);
  }, [size, options]);

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
              <button disabled={qty<=1} onClick={() => setqty(qty - 1)}>-</button>
              <input
                type="text"
                value={qty}
                onChange={(e) => setqty(Number(e.target.value))}
                />
              <button onClick={() => setqty(qty + 1)}>+</button>
            </div>
            <div className="dd">
              <select
                className="dropdown"
                ref={sizeRef}
                onChange={(e) => setsize(e.target.value)}
              >
                {priceOptions.map((item) => {
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="price">
            <h3>Rs. {finalPrice}/-</h3>
            </div>
          </div>
          <hr className="otherline" />
          <div className="cartoption">
            <button className="btn-cart" onClick={handleAddtoCart}>
              Add to Cart
              {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
