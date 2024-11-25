import React from "react";

function Header({ turns, onShuffle }) {
  return (
    <header style={{ textAlign: "center", margin: "20px 0" }}>
      <h1>Memory Game</h1>
      <p>Turns: {turns}</p>
      <button
        onClick={onShuffle}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        New Game
      </button>
    </header>
  );
}

export default Header;
