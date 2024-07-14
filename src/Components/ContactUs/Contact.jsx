import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./contact.css";
import { useForm } from "react-hook-form";

const Contact = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onsubmit = async (data) => {
    setIsLoading(true);
    await fetch("http://localhost:3001/contact/contactus", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    console.log(data);

    setTimeout(() => {
      setIsLoading(false);
    }, 300);

    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      reset();
    }, 1000);
  };

  return (
    <>
      <Navbar />
      <div>
        <div class="contact" id="contact">
          <div className="wraper">
            <h2 class="heading">
              Contact <span>Me</span>
            </h2>
            {showSuccessMessage && (
              <div className="green msgs contact-form">
                Message Sent Successfully.
              </div>
            )}
            {errors.name && (
              <div className="red msgs contact-form">{errors.name.message}</div>
            )}
            {errors.email && (
              <div className="red msgs contact-form">
                {errors.email.message}
              </div>
            )}
            {errors.number && (
              <div className="red msgs contact-form">
                {errors.number.message}
              </div>
            )}
            {errors.message && (
              <div className="red msgs contact-form">
                {errors.message.message}
              </div>
            )}

            <form action="" onSubmit={handleSubmit(onsubmit)}>
              <div class="input-box">
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name", {
                    required: { value: true, message: "Please Enter Name" },
                  })}
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  {...register("email", {
                    required: { value: true, message: "Please Enter Email" },
                  })}
                />
              </div>

              <div class="input-box">
                <input
                  type="text"
                  placeholder="Mobile Number"
                  {...register("number", {
                    required: {
                      value: true,
                      message: "Please Enter Phone Number",
                    },
                    minLength: {
                      value: 11,
                      message: "Phone Number is Incorrect",
                    },
                    maxLength: {
                      value: 11,
                      message: "Phone Number is Incorrect",
                    },
                  })}
                />
                <input
                  type="text"
                  placeholder="Email Subject"
                  {...register("subject")}
                />
              </div>

              <textarea
                rows="8"
                placeholder="Your Message"
                {...register("message", {
                  required: { value: true, message: "Please Enter Message" },
                })}
              ></textarea>
              <button type="submit" class="btn">
                 Send Message
                 {isLoading && <i className="fa-solid fa-spinner fa-spin"></i>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
