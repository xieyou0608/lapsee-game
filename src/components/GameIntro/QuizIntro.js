import React from "react";
import { useNavigate } from "react-router-dom";
import ModalContainer from "../UI/ModalContainer";
import StartButton from "../UI/StartButton";
import { styled } from "@mui/material";

const Intro = styled("div")`
  padding: 5vmin;
`;

const QuizIntro = (props) => {
  const navigate = useNavigate();
  const goToQuizGame = () => {
    navigate("/quiz-game");
  };

  return (
    <ModalContainer onClose={props.onClose} title="媒體知識王">
      <Intro>
        關於媒體的傳說有很多很多...，你知道他們的真實面貌嗎？一起來測測你多了解他們！
      </Intro>
      <StartButton onClick={goToQuizGame}>開始遊戲</StartButton>
    </ModalContainer>
  );
};

export default QuizIntro;
