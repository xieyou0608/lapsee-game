import React from "react";
import classes from "./GameIntroPage.module.css";
import { useNavigate } from "react-router-dom";
import card1Img from "../assets/card-images/資訊精靈.PNG";
import card2Img from "../assets/card-images/假資訊.PNG";
import card3Img from "../assets/card-images/電影.PNG";
import card4Img from "../assets/card-images/網際網路村長.PNG";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";

const GameIntroPage = () => {
  const navigate = useNavigate();
  const goToMemoryGame = () => {
    navigate("/memory-game");
  };
  const goToQuizGame = () => {
    navigate("/quiz-game");
  };
  return (
    <React.Fragment>
      <div className={classes["memory-intro"]}>
        <h1>媒體對對碰</h1>
        <div className={classes["memory-display"]} onClick={goToMemoryGame}>
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
        <div className={classes["quiz-display"]} onClick={goToQuizGame}>
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
    </React.Fragment>
  );
};

export default GameIntroPage;
