import React from "react";
import "./HeroSection.css";

const HeroSection = () => {
  return (
    <div className="hero-container">
      <div className="hero-content">
        <h1>Loan Prediction App</h1>
        <p>Get accurate loan predictions with our advanced models.</p>
        <a href="./Prediction" className="hero-btn">
          Get Started
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
