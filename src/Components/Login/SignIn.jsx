import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "../Login/login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const navigate = useNavigate();
  const [serverError, setserverError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onsubmit = async (data) => {
    const response = await fetch("http://localhost:3001/signin/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    console.log(json);
    if (json.success && json.error === "None") {
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("UserEmail", data.email);
      navigate("/");
    } else if (json.success === false) {
      setserverError(json.error);
      if (json.error === "You have been blocked by the Admin. Contact the Admin") {
        setTimeout(() => {
          setserverError("");
        }, 3000);
      }
      else
      {
        setTimeout(() => {
          setserverError("");
        }, 1000);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="signup-container-signin signup-container">
        <div className="signup">
          <div className="signupForm">
            <h3>Sign In</h3>
            {serverError && <div className="red msgs">{serverError}</div>}
            <form className="form" action="" onSubmit={handleSubmit(onsubmit)}>
              <input
                type="email"
                placeholder="Enter Email"
                {...register("email", { required: true })}
              />
              <input
                type="password"
                placeholder="Enter Password"
                {...register("password")}
              />
              <button type="submit">Sign In</button>
            </form>
          </div>
          <p>
            Dont't have an account? <NavLink to="/signup">Sign Up</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
