import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./contact.css";

const Users = () => {
  const [contacts, setcontacts] = useState([]);

  const LoadContactData = async () => {
    try {
      const response = await fetch(
        "http://localhost:3001/getcontacts/getcontacts",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
      const result = await response.json();
      setcontacts(result);
    } catch {
      console.log("Internal Server Error at UI");
    }
  };

  useEffect(() => {
    setcontacts([]);
    LoadContactData();
  }, []);

  return (
    <>
      <Navbar />
      <div>
        <div className="users-container">
          <div className="cart-items">
            <div className="table-contents">
              <table>
                <thead>
                  <tr>
                    <th className="contact-username">Name</th>
                    <th className="contact-useremail">Email</th>
                    <th className="contact-number">Number</th>
                    <th className="contact-subject">Subject</th>
                    <th className="contact-message">Message</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="body-content">
              <table>
                <tbody>
                  {contacts.map((item) => {
                    return (
                      <tr key={item._id} className="last-row">
                        <td className="contact-username">{item.name}</td>
                        <td className="contact-useremail">{item.email}</td>
                        <td className="contact-number">{item.number}</td>
                        <td className="contact-subject">{item.subject}</td>
                        <td className="contact-message">{item.message}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;
