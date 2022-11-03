import React, { useState } from "react";
import classes from "./App.module.css";
import Header from "./components/UI/Header";
import StartButton from "./components/UI/StartButton";
import Setting from "./components/Setting/Setting";
import GameBoard from "./components/Board/GameBoard";

function App() {
  const [numCards, setNumCards] = useState(8);
  const [numPlayers, setNumPlayers] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false); // Maybe replace it with react-router

  const gameStartHandler = () => {
    setIsPlaying(true);
  };

  return (
    <div className={classes.app}>
      {!isPlaying && (
        <React.Fragment>
          <Header />
          <Setting
            numCards={numCards}
            setNumCards={setNumCards}
            numPlayers={numPlayers}
            setNumPlayers={setNumPlayers}
          />
          <StartButton onClick={gameStartHandler}>開始遊戲</StartButton>
        </React.Fragment>
      )}
      {isPlaying && (
        <GameBoard numCards={numCards} setIsPlaying={setIsPlaying} />
      )}
    </div>
  );
}

export default App;
