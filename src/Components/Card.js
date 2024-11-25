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
        {/* Front side of the card (image from cardImages) */}
        <img src={card.src} alt="card front" className="front" />
        {/* Back side of the card (EducativeIcon) */}
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
