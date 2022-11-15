import React from "react";
import MemoryGame from "../components/MemoryGame/MemoryGame";

const MemoryPage = ({ numCards, numPlayers }) => {
  return <MemoryGame numCards={numCards} numPlayers={numPlayers} />;
};

export default MemoryPage;
