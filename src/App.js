import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import classes from "./App.module.css";

import HomePage from "./pages/HomePage";
import IntroPage from "./pages/IntroPage";
import GameIntroPage from "./pages/GameIntroPage";
import MemoryPage from "./pages/MemoryPage";
import QuizPage from "./pages/QuizPage";

function App() {
  const [numCards, setNumCards] = useState(8);
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
            element={<MemoryPage numCards={numCards} numPlayers={numPlayers} />}
          />
          <Route
            path="quiz-game"
            element={<QuizPage numPlayers={numPlayers} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
