import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gameActions } from "../../store/game-slice";

import ModalContainer from "../UI/ModalContainer";
import StartButton from "../UI/StartButton";
import { styled } from "@mui/material";

const Intro = styled("div")`
  padding: 5vmin;
`;

const QuizIntro = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toQuizGame = () => {
    dispatch(gameActions.setNumPlayers(1));
    navigate("/quiz-game");
  };
  const toQuizOnline = () => {
    dispatch(gameActions.setNumPlayers(2));
    navigate("/quiz.io");
  };

  return (
    <ModalContainer onClose={props.onClose} title="媒體知識王">
      <Intro>
        關於媒體的傳說有很多很多...，你知道他們的真實面貌嗎？一起來測測你多了解他們！
      </Intro>
      <StartButton onClick={toQuizGame}>單人遊戲</StartButton>
      <StartButton onClick={toQuizOnline}>雙人連線遊戲</StartButton>
    </ModalContainer>
  );
};

export default QuizIntro;
