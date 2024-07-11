import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  selectCartItems,
  updateItem,
} from "../../redux/CartFunctionality/cartfunctions.js";

const Cards = (props) => {
  const cart = useSelector(selectCartItems) || [];
  const dispatch = useDispatch();
  const sizeRef = useRef();

  const options = props.items.options[0];
  const priceOptions = Object.keys(options);

  const [qty, setqty] = useState(1);
  const [size, setsize] = useState(1);

  const originalPrice = parseInt(options[size]);
  const finalPrice = qty * parseInt(options[size]);

  const handleAddtoCart = async () => {
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

    // console.log(cart);
  };

  useEffect(() => {
    setsize(sizeRef.current.value);
  }, []);

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
              <button onClick={() => setqty(qty - 1)}>-</button>
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
              <h3>Rs.{finalPrice}/-</h3>
            </div>
          </div>
          <hr className="otherline" />
          <div className="cartoption">
            <button className="btn-cart" onClick={handleAddtoCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
