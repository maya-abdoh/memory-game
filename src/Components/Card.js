import React from "react";
import Educative from "../Images/EducativeIcon.png";

const Card = ({ card, flipped, disabled, handleChoice }) => {
  const handleClick = () => {
    if (!disabled && !card.matched) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt="card front" className="front" />
        <img
          src={Educative}
          alt="card back"
          className="back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export default Card;
