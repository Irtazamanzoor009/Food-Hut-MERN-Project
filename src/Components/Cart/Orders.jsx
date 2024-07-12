import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./orders.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../redux/CartFunctionality/cartfunctions.js";

const Cart = () => {
  const cart = useSelector(selectCartItems) || [];

  const UserEmail = localStorage.getItem("UserEmail");
  const [data, setdata] = useState([]);

  useEffect(() => {
    OrderedData();
  }, []);

  const OrderedData = async () => {
    const response = await fetch(
      "http://localhost:3001/orderdata/myordercart",
      {
        method: "POST",
        body: JSON.stringify({ email: UserEmail }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const json = await response.json();
    if (json) {
      setdata(json.orderdata.order_data);
    } else {
      console.error("Received data is not an array:", json);
      setdata([]);
    }
  };

  return (
    <>
      <Navbar />
      <div className="orders-complete">
        <div className="orders-cart-container">
          {data.length > 0
            ? data.map((order, index) => {
                return (
                  <>
                    <div key={index} className="orders-cart-items">
                      <div className="date">
                        <p>Date: {order[0].order_date}</p>
                        <table>
                          <thead>
                            <tr>
                              <th></th>
                              <th>Item</th>
                              <th>Price</th>
                              <th>Quantity</th>
                              <th>Size</th>
                              <th>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.slice(1).map((item) => (
                              <tr key={item.id}>
                                <td>
                                  <img
                                    className="cart-image-shown"
                                    src={item.img}
                                    alt={item.name}
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.qty}</td>
                                <td>{item.size}</td>
                                <td>{item.price * item.qty}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                );
              })
            : "No Orders Yet"}
          {/* repeat at that place */}
        </div>
      </div>
    </>
  );
};

export default Cart;
