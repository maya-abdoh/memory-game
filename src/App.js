import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Grid from "./Components/Grid";
import "./App.css";
import cardImages from "./Components/Images";

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [win, setWin] = useState(false); 
  
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() })); 
    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setWin(false); 
  };

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true); 
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.src === choiceOne.src ? { ...card, matched: true } : card
          )
        );
        resetTurn(false);
      } else {
        setTimeout(() => resetTurn(true), 1000); 
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = (incrementTurns) => {
    setChoiceOne(null);
    setChoiceTwo(null);
    if (incrementTurns) {
      setTurns((prevTurns) => {
        const newTurns = prevTurns + 1;
        if (newTurns >= 15) {
          setWin(true); 
        }
        return newTurns;
      });
    }
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <Header turns={turns} onShuffle={shuffleCards} />
      {win ? (
        <div className="win-message">
          <h2>Congratulations! You Win 🎉</h2>
          <button onClick={shuffleCards}>Play Again</button>
        </div>
      ) : (
        <Grid
          cards={cards}
          choiceOne={choiceOne}
          choiceTwo={choiceTwo}
          handleChoice={handleChoice}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default App;
