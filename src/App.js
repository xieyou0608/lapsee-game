import React, { useState } from "react";
import classes from "./App.module.css";
import HomePage from "./pages/HomePage";
import GameBoard from "./components/GameBoard/GameBoard";

function App() {
  const [numCards, setNumCards] = useState(8);
  const [numPlayers, setNumPlayers] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false); // Maybe replace it with react-router

  const startGame = (numOfPlayers) => {
    setNumPlayers(numOfPlayers);
    setIsPlaying(true);
  };

  return (
    <div
      className={classes.app}
      style={{ backgroundColor: isPlaying ? "#d9d9d9" : "" }}
    >
      {!isPlaying && (
        <HomePage
          numCards={numCards}
          setNumCards={setNumCards}
          startGame={startGame}
        />
      )}
      {isPlaying && (
        <GameBoard
          numCards={numCards}
          numPlayers={numPlayers}
          setIsPlaying={setIsPlaying}
        />
      )}
    </div>
  );
}

export default App;
