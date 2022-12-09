import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./QuizGame.module.css";
import { Box } from "@mui/material";

import GameLayout from "../Layout/GameLayout";
import Player from "../Game/Player";
import Question from "./Question";
import Choices from "./Choices";
import EndingModal from "../Game/EndingModal";

import { drawQuestions } from "./drawQuestions";
import { quizActions } from "../../store/quiz-slice";
import ModalContainer from "../UI/ModalContainer";
import { cardImages } from "../../assets/card-images/CardImages";

// 單人知識王
const QuizGame = () => {
  const dispatch = useDispatch();
  const { questions, round, score, combo, endMessage, chosen, showAnswer } =
    useSelector((state) => state.quiz);

  useEffect(() => {
    const fetchData = async () => {
      const newQuestions = await drawQuestions();
      dispatch(quizActions.loadQuestions(newQuestions));
    };
    fetchData();
  }, []);

  const choose = (option) => {
    if (chosen !== null) return; //exactly null
    dispatch(quizActions.chooseAnswer(option));

    setTimeout(() => {
      dispatch(quizActions.resetChosen());
    }, [2000]);
  };

  const quizArea = (
    <div className={classes["quiz-area"]}>
      {questions && <Question question={questions[round]} round={round} />}
      {questions && <Choices question={questions[round]} onChoose={choose} />}
    </div>
  );

  let correctAnswer;
  if (showAnswer) {
    console.log(showAnswer);
    const answer = questions[round].answer;
    if (questions[round].type === "text") {
      correctAnswer = <p>正確答案是 {answer} !</p>;
    } else {
      correctAnswer = <p>正確答案是 {cardImages[answer].name} !</p>;
    }
  }

  return (
    <GameLayout>
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
        }}
      >
        <div className={classes["quiz-game"]}>
          <div className={classes["players"]}>
            <Player role="A" myScore={score} />
          </div>
          {quizArea}
        </div>
      </Box>
      <Box
        sx={{
          display: { xs: "none", sm: "flex" },
        }}
      >
        <div className={classes["quiz-game"]}>
          <Player role="A" myScore={score} />
          {quizArea}
        </div>
      </Box>
      {showAnswer && (
        <ModalContainer title={showAnswer} onClose={() => {}}>
          {correctAnswer}
        </ModalContainer>
      )}
      {endMessage && (
        <EndingModal endMessage={endMessage} score={score} gameType="quiz" />
      )}
    </GameLayout>
  );
};

export default QuizGame;
