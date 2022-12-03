import React, { useState } from "react";

import classes from "./GameIntroPage.module.css";
import AppLayout from "../components/Layout/AppLayout";
import { cardImages } from "../assets/card-images/CardImages";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import MemoryIntro from "../components/GameIntro/MemoryIntro";
import QuizIntro from "../components/GameIntro/QuizIntro";

const GameIntroPage = () => {
  const [showMemoryIntro, setShowMemoryIntro] = useState(false);
  const [showQuizIntro, setShowQuizIntro] = useState(false);

  const openMemoryIntro = () => {
    setShowMemoryIntro(true);
  };
  const openQuizIntro = () => {
    setShowQuizIntro(true);
  };

  const closeModal = () => {
    setShowMemoryIntro(false);
    setShowQuizIntro(false);
  };

  const card1Img = cardImages[0].src;
  const card2Img = cardImages[1].src;
  const card3Img = cardImages[2].src;
  const card4Img = cardImages[3].src;

  return (
    <AppLayout style={{ overflow: "hidden" }}>
      {showMemoryIntro && <MemoryIntro onClose={closeModal} />}
      {showQuizIntro && <QuizIntro onClose={closeModal} />}

      <div className={classes["memory-intro"]}>
        <h1>媒體對對碰</h1>
        <div className={classes["memory-display"]} onClick={openMemoryIntro}>
          <img src={card1Img} alt="" />
          <img src={card2Img} alt="" />
          <img src={card3Img} alt="" />
          <img src={card3Img} alt="" />
          <img src={card2Img} alt="" />
          <img src={card4Img} alt="" />
          <img src={card1Img} alt="" />
          <img src={card4Img} alt="" />
        </div>
      </div>

      <div className={classes["slash"]}></div>

      <div className={classes["quiz-intro"]}>
        <h1>媒體知識王</h1>
        <div className={classes["quiz-display"]} onClick={openQuizIntro}>
          <div className={classes["quiz-question"]}>
            <QuestionMarkIcon sx={{ color: "red" }} />
          </div>
          <div className={classes["quiz-grid"]}>
            <img src={card1Img} alt="" />
            <img src={card2Img} alt="" />
            <img src={card3Img} alt="" />
            <img src={card4Img} alt="" />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default GameIntroPage;
