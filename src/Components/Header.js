import React from "react";

function Header({ turns, onShuffle }) {
  return (
    <header className="header">
      <h1 className="header-title">Memory Game</h1>
      <p className="header-turns">Turns: {turns}</p>
      <button className="new-game-btn" onClick={onShuffle}>
        New Game
      </button>
    </header>
  );
}

export default Header;
