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
  const [time, setTime] = useState(0); 
  const [gameOver, setGameOver] = useState(false); 

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random(), flipped: true }));
    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
    setStatus("");
    setTime(0);
    setGameOver(false); 

    setTimeout(() => {
      setCards((prevCards) =>
        prevCards.map((card) => ({ ...card, flipped: false }))
      );
    }, 3000);
  };

  const handleChoice = (card) => {
    if (!disabled) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
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
      setGameOver(true);
    } else if (turns >= 15) {
      setStatus("You Lose! 😢");
      setGameOver(true);
    }
  }, [cards, turns]);

  useEffect(() => {
    if (!gameOver) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);

      return () => clearInterval(timer); 
    }
  }, [gameOver]);

  useEffect(() => {
    shuffleCards();
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="App">
      <Header turns={turns} onShuffle={shuffleCards} />
      <div className="timer">Time: {formatTime(time)}</div>
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
