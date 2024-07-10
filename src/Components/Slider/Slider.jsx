import React from "react";
import { useState, useEffect } from "react";
import "./slider.css";
import image1 from "./1.jpg";
import image2 from "./2.jpg";
import image3 from "./3.jpg";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [image2, image3, image1];

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="main">
      <div className="slider-container">
        <div className="image-container">
          <button className="prev-button" onClick={handlePrevClick}>
            &#8249;
          </button>
          <img src={images[currentIndex]} alt="slider" />
          <button className="next-button" onClick={handleNextClick}>
            &#8250;
          </button>
          <div className="search-container">
            <div className="inputtext">
              <input type="text" placeholder="Search..." />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
