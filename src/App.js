import React, { useState, useEffect } from "react";
import Header from "./Components/Header";
import Grid from "./Components/Grid";
import './App.css';

import cardImages from "./Components/Images";

const App = () => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [status, setStatus] = useState(""); 

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), flipped: true })); 
    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setStatus(""); 

    setTimeout(() => {
      setCards((prevCards) =>
        prevCards.map((card) => ({ ...card, flipped: false }))
      );
    }, 3000);
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
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  useEffect(() => {
    if (cards.every((card) => card.matched)) {
      setStatus("You Win! 🎉");
    } else if (turns >= 15) {
      setStatus("You Lose! 😢");
    }
  }, [cards, turns]);

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <Header turns={turns} onShuffle={shuffleCards} />
      {status && <h2 className="status">{status}</h2>}
      {!status && (
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
