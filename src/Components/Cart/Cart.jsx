import React from "react";
import Navbar from "../Navbar/Navbar";
import "./cart.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  removeItem,
  clearCart
} from "../../redux/CartFunctionality/cartfunctions.js";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems) || [];
  let TotalPrice = cart.reduce((total, item) => total + item.price, 0);

  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  const handleClearCart = ()=>{
    dispatch(clearCart())
  }

  const handleCheckOut = async()=>{
    let userEmail = localStorage.getItem("UserEmail");
    const response = await fetch("http://localhost:3001/orderdata/ordercart", {
      method: "POST",
      body: JSON.stringify({
        email: userEmail,
        order_data: cart,
        order_date: new Date().toDateString()
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("Response Status: ", response)
    if(response.status == 200)
    {
        dispatch(clearCart())
    }
  }

  return (
    <>
      <Navbar />
      <div className="complete">
        <div className="cart-container">
          <div className="price">
            <div className="continue-shopping">
              <NavLink to="/">
                <i class="fa-solid fa-arrow-left"></i> Continue Shopping
              </NavLink>
              <div className="btnclearcart">
              <button onClick={handleClearCart} className="clearcart ">Clear Cart</button>

              </div>
            </div>
            <hr />
            <div className="check">
              <div className="item-price">
                <p>Items: {cart.length}</p>
                <p>Total: Rs. {TotalPrice} /-</p>
              </div>
              <div className="checkOut">
                
                <button onClick={handleCheckOut}>CheckOut</button>
              </div>
            </div>
          </div>
          <div className="cart-items">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Size</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((items) => {
                  return (
                    <tr key={items.id}>
                      <td>
                        <img className="cart-image-shown" src={items.img} />
                      </td>
                      <td>{items.name}</td>
                      <td>{items.originalPrice}</td>
                      <td>{items.qty}</td>
                      <td>{items.size}</td>
                      <td>Rs. {items.price} /-</td>
                      <td>
                        <button onClick={() => handleRemove(items)}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
