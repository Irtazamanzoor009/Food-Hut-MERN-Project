import React, {useState} from "react";
import "../Login/login.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignIn = () => {
  const navigate = useNavigate();
  const [Message, setMessage] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onsubmit = async (data) => {
    const response = await fetch("http://localhost:3001/login/adminlogin", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json()
    console.log(json);
    if(json.success)
    {
      localStorage.setItem("authTokenAdmin",json.authToken)
      localStorage.setItem("AdminEmail",data.email)
      navigate('/mainpage')
      
    }
    else
    {
      setMessage(true);
      setTimeout(() => {
        setMessage(false);
      }, 1000);
    }
    
  };

  return (
    <>
      <div className="signup-container-signin signup-container">
        <div className="signup">
          <div className="signupForm">
            <h3>Admin Sign In</h3>
            {Message && (
              <div className="red msgs">Invalid Credentials</div>
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
                {...register("password")}
              />
              <button type="submit">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
