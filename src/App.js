import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import classes from "./App.module.css";

import HomePage from "./pages/HomePage";
import IntroPage from "./pages/IntroPage";
import GameIntroPage from "./pages/GameIntroPage";
import MemoryPage from "./pages/MemoryPage";
import QuizPage from "./pages/QuizPage";
import Rank from "./components/Game/Rank";

function App() {
  return (
    <BrowserRouter>
      <div className={classes.app}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/intro" element={<IntroPage />} />
          <Route path="/game-intro" element={<GameIntroPage />} />
          <Route path="/memory-game" element={<MemoryPage />} />
          <Route path="quiz-game" element={<QuizPage />} />
          <Route path="memory-rank" element={<Rank gameType="memory" />} />
          <Route path="quiz-rank" element={<Rank gameType="quiz" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
