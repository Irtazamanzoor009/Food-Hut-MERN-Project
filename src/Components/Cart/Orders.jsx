import React, { useEffect, useState, useRef } from "react";
import { pdf } from "@react-pdf/renderer";
import Navbar from "../Navbar/Navbar";
import "./orders.css";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../redux/CartFunctionality/cartfunctions.js";
import PDFGenerator from "./printdocument.jsx";
import {  useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector(selectCartItems) || [];
  const printRef = useRef();
  const UserEmail = localStorage.getItem("UserEmail");
  const [data, setdata] = useState([]);
  const [total, settotal] = useState(0);

  useEffect(() => {
    const userEmail = localStorage.getItem('UserEmail');
    console.log(userEmail)
    if (!userEmail) {
     navigate('/signin')
    }
    else if(userEmail)
    {
      OrderedData();

    }
   
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

  const handleClearAllRecords = async () => {
    const response = await fetch(
      `http://localhost:3001/orderdata/clearallrecords`,
      {
        method: "DELETE",
        body: JSON.stringify({ email: UserEmail }),
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response);
    if (response.ok) {
      setdata([]);
    } else {
      console.error("Failed to clear all records");
    }
  };

  const handlePrint = async () => {
    const pdfDoc = pdf();
    pdfDoc.updateContainer(<PDFGenerator data={data} userName={UserEmail} />);
    const blob = await pdfDoc.toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "myorders.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const calculateTotal = (order) => {
    return order.slice(1).reduce((total, item) => total + item.price, 0);
  };

  return (
    <>
      <Navbar />
      <div className="orders-complete">
        <div className="btn-clear">
          <button className="red-delete" onClick={handleClearAllRecords}>
            Clear Record
          </button>
          <button className="green-print" onClick={handlePrint}>
            Download
          </button>
        </div>

        <div className="orders-cart-container">
          {data.length > 0
            ? data.map((order, index) => {
                const total = calculateTotal(order);
                return (
                  <>
                    <div key={index} className="orders-cart-items">
                      <div className="date">
                        <p className="date-d">Date: {order[0].order_date}</p>
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
                              <>
                                <tr key={item.id} className="last-row">
                                  <td>
                                    <img
                                      className="cart-image-shown"
                                      src={item.img}
                                      alt={item.name}
                                    />
                                  </td>
                                  <td>{item.name}</td>
                                  <td>{item.originalPrice}</td>
                                  <td>{item.qty}</td>
                                  <td>{item.size}</td>
                                  <td>{item.price}</td>
                                </tr>
                              </>
                            ))}
                          </tbody>
                        </table>
                        <div className="total-area">
                          <p>Total: Rs. {total} /-</p>
                        </div>
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
