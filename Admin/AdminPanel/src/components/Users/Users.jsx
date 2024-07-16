import React, { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import "./users.css";

const Users = () => {
  const [users, setusers] = useState([]);

  const LoadUserData = async () => {
    try {
      const response = await fetch("http://localhost:3001/getuser/getuser", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await response.json();
      setusers(result);
    } catch {
      console.log("Internal Server Error at UI");
    }
  };

  const updateUserStatus = async (userId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:3001/getuser/updateuserstatus/${userId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        setusers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, status: newStatus } : user
          )
        );
      } else {
        console.log("Failed to update user status");
      }
    } catch (error) {
      console.log("Internal Server Error at UI");
    }
  };

  useEffect(() => {
    setusers([]);
    LoadUserData();
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
                    <th className="username">User Name</th>
                    <th className="useremail">User Email</th>
                    <th className="location">Location</th>
                    <th className="date">Date</th>
                    <th className="status">Status</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="body-content">
              <table>
                <tbody>
                  {users.map((item) => {
                    return (
                      <tr key={item._id} className="last-row">
                        <td className="username">{item.username}</td>
                        <td className="useremail">{item.email}</td>
                        <td className="location">{item.location}</td>
                        <td className="date">
                          {new Date(item.date).toISOString().split("T")[0]}
                        </td>
                        <td className="status">
                          {item.status === "true" ? (
                            <button
                              onClick={() => updateUserStatus(item._id, "false")}
                              className="btns btn-remove"
                            >
                              <p className="dis-btn">Disable</p>
                            </button>
                          ) : (
                            <button
                              onClick={() => updateUserStatus(item._id, "true")}
                              className="btns btn-enable"
                            >
                              <p className="dis-btn">Enable</p>
                            </button>
                          )}
                        </td>
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
