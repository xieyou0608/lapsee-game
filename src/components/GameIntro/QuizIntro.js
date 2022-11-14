import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./MemoryIntro.module.css";
import ModalContainer from "../UI/ModalContainer";
import StartButton from "../UI/StartButton";

const QuizIntro = (props) => {
  const navigate = useNavigate();
  const goToQuizGame = () => {
    navigate("/quiz-game");
  };

  return (
    <ModalContainer onClose={props.onClose} title="媒體知識王">
      <div>這是遊戲介紹</div>
      <StartButton onClick={goToQuizGame}>開始遊戲</StartButton>
    </ModalContainer>
  );
};

export default QuizIntro;
