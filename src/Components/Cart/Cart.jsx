import React, { useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./cart.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  removeItem,
  clearCart,
} from "../../redux/CartFunctionality/cartfunctions.js";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems) || [];
  let TotalPrice = cart.reduce((total, item) => total + item.price, 0);
  const handleRemove = (item) => {
    dispatch(removeItem(item));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    const userEmail = localStorage.getItem("UserEmail");
    // console.log(userEmail)
    if (!userEmail) {
      navigate("/signin");
    } 
  }, []);

  const handleCheckOut = async () => {
    if(cart.length > 0)
    {

      let userEmail = localStorage.getItem("UserEmail");
      const response = await fetch("http://localhost:3001/orderdata/ordercart", {
        method: "POST",
        body: JSON.stringify({
          email: userEmail,
        order_data: cart,
        order_date: new Date().toLocaleString(),
      }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("Response Status: ", response);
    if (response.status == 200) {
      dispatch(clearCart());
    }
  }
  };

  return (
    <>
      <Navbar />
      <div className="complete">
        <div className="cart-container">
          <div className="price">
            <div className="continue-shopping">
              <NavLink to="/">
                <i class="fa-solid fa-arrow-left"></i>{" "}
                <p className="cont-shop">Continue Shopping</p>
              </NavLink>
              <div className="btnclearcart">
                <button onClick={handleClearCart} className="clearcart ">
                  {" "}
                  <i class="cart-clear-i fa-regular fa-cart-circle-xmark"></i>{" "}
                  <p className="cart-clear-p">Clear Cart</p>
                </button>
              </div>
            </div>
            <hr />
            <div className="check">
              <div className="item-price">
                <p>Items: {cart.length}</p>
                <p>Total: Rs. {TotalPrice}</p>
              </div>
              <div className="checkOut">
                <button onClick={handleCheckOut}>
                  {" "}
                  <i class="cart-clear-i fa-regular fa-truck"></i>{" "}
                  <p className="cart-clear-p">CheckOut</p>{" "}
                </button>
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
                    <tr key={items.id} className="last-row">
                      <td>
                        <img className="cart-image-shown" src={items.img} />
                      </td>
                      <td>{items.name}</td>
                      <td>{items.originalPrice}</td>
                      <td>{items.qty}</td>
                      <td>{items.size}</td>
                      <td>Rs. {items.price}</td>
                      <td>
                        <button
                          className="btn-remove"
                          onClick={() => handleRemove(items)}
                        >
                          <i class="del-btn fa-sharp fa-solid fa-trash"></i>
                          <p className="del-rem">Remove</p>
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
