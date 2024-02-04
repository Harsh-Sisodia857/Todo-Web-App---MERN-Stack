import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import "./TickMark.css";

const TickMark = ({ onClick, colored }) => {
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    onClick();
  };

  return (
    <span className={`tick-container ${animate ? "animate" : ""}`}>
      <FaCheck
        className={`tick ${colored ? "colored" : ""}`}
        onClick={handleClick}
      />
    </span>
  );
};

export default TickMark;
