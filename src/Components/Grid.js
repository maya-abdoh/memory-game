import React from "react";
import Card from "./Card";

const Grid = ({ cards, choiceOne, choiceTwo, disabled, handleChoice }) => {
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched || card.flipped}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default Grid;
