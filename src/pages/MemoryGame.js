import React from "react";
import GameBoard from "../components/GameBoard/GameBoard";

const MemoryGame = ({ numCards, numPlayers }) => {
  return <GameBoard numCards={numCards} numPlayers={numPlayers} />;
};

export default MemoryGame;
