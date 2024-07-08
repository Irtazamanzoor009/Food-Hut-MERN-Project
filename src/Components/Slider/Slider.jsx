import React from "react";
import { useState } from "react";
import "./slider.css";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    "https://via.placeholder.com/800x400.png?text=Image+1",
    "https://via.placeholder.com/800x400.png?text=Image+2",
    "https://via.placeholder.com/800x400.png?text=Image+3",
  ];

  const handlePrevClick = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNextClick = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

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
            <input type="text" placeholder="Search..." />
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
