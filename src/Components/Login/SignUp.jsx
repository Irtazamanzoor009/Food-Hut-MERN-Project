import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useForm } from "react-hook-form";
import "./login.css";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onsubmit = async (data) => {
    await fetch("http://localhost:3001/signup/createuser", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    console.log(data);

    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      reset();
    }, 1000);
  };

  return (
    <>
      <Navbar />

      <div className="signup-container-signup signup-container">
        <div className="signup">
          <div className="signupForm">
            <h3>Sign Up</h3>
            {showSuccessMessage && (
              <div className="green msgs">User Signed Up Successfully</div>
            )}
            {errors.username && (
              <div className="red msgs">{errors.username.message}</div>
            )}
            {errors.password && (
              <div className="red msgs">{errors.password.message}</div>
            )}
            {errors.email && (
              <div className="red msgs">{errors.email.message}</div>
            )}
            <form className="form" action="" onSubmit={handleSubmit(onsubmit)}>
              <input
                type="email"
                placeholder="Enter Email"
                {...register("email", { required: true })}
              />
              <input
                type="password"
                placeholder="Enter Password"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 3,
                    message: "Length of password must be greater then 3",
                  },
                  maxLength: {
                    value: 10,
                    message: "Length of password must be less then 10",
                  },
                })}
              />
              <input
                type="text"
                placeholder="Enter Username"
                {...register("username", {
                  required: true,
                  minLength: {
                    value: 3,
                    message: "Length of usename must be 3",
                  },
                  maxLength: {
                    value: 10,
                    message: "Length of username must be less then 10",
                  },
                })}
              />

              <input
                type="text"
                placeholder="Enter Location"
                {...register("location", { required: true })}
              />
              <button disabled={showSuccessMessage} type="submit">
                Sign Up
              </button>
            </form>
          </div>
          <p>
            Already have an account? <NavLink to="/signin">Sign In</NavLink>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
