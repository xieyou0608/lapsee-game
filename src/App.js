import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import classes from "./App.module.css";

import HomePage from "./pages/HomePage";
import IntroPage from "./pages/IntroPage";
import GameIntroPage from "./pages/GameIntroPage";
import MemoryGame from "./pages/MemoryGame";

function App() {
  const [numCards, setNumCards] = useState(16);
  const [numPlayers, setNumPlayers] = useState(1);

  return (
    <BrowserRouter>
      <div className={classes.app}>
        <Routes>
          <Route
            path="/"
            element={<HomePage setNumPlayers={setNumPlayers} />}
          />
          <Route
            path="/intro"
            element={<IntroPage numPlayers={numPlayers} />}
          />
          <Route path="/game-intro" element={<GameIntroPage />} />

          <Route
            path="/memory-game"
            element={<MemoryGame numCards={numCards} numPlayers={numPlayers} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
