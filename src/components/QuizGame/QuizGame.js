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
import { gameActions } from "../../store/game-slice";

// 單人知識王
const QuizGame = () => {
  const dispatch = useDispatch();
  const { questions, round, score, combo, endMessage, chosen, showAnswer } =
    useSelector((state) => state.quiz);

  useEffect(() => {
    dispatch(gameActions.setNumPlayers(1));
  }, []);

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
      dispatch(quizActions.nextRound());
    }, [2000]);
  };

  const quizArea = (
    <div className={classes["quiz-area"]}>
      {questions && <Question question={questions[round]} round={round} />}
      {questions && (
        <Choices
          question={questions[round]}
          onChoose={choose}
          showAnswer={showAnswer}
          chosen={chosen}
        />
      )}
    </div>
  );

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

      {endMessage && (
        <EndingModal endMessage={endMessage} score={score} gameType="quiz" />
      )}
    </GameLayout>
  );
};

export default QuizGame;
