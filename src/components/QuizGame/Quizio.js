import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QuizService from "../../services/Quiz.service";

import classes from "./QuizGame.module.css";
import { Box, styled } from "@mui/material";

import GameLayout from "../Layout/GameLayout";
import Player from "../Game/Player";
import Question from "./Question";
import Choices from "./Choices";
import EndingModal from "../Game/EndingModal";

const Clock = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1vmin solid black;
  border-radius: 50%;
  height: 10vmin;
  width: 10vmin;
  padding: 1vmin;
  h1 {
    margin: 0;
    color: red;
  }
`;

const Mobile = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 90vh;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    display: none;
  }
`;
const PC = styled("div")`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    display: none;
  }
`;
const PcQuiz = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2vmin;
`;

const MAX_CLOCK = 15;

const Quizio = ({ roomId }) => {
  const {
    userId,
    round: backEndRound,
    questions,
    players,
    endMessage,
    playerChosen,
  } = useSelector((state) => state.quizio);

  const [round, setRound] = useState(0);
  const [showEnding, setShowEnding] = useState(false);
  const [clock, setClock] = useState(MAX_CLOCK);

  let chosen = null; // 用來在前端顯示
  let judged = false;
  if (playerChosen && playerChosen[round] && playerChosen[round][userId]) {
    chosen = playerChosen[round][userId].chosen;
    judged = playerChosen[round][userId].judged;
  }

  const chooseAnswer = async (option) => {
    if (chosen !== null) return;
    await QuizService.postChosen(roomId, round, userId, option);
  };

  // 答題倒數計時
  useEffect(() => {
    let interval = setInterval(() => {
      setClock((prev) => prev - 1);
    }, [1000]);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (clock === 0 && chosen === null) {
      chooseAnswer(-1);
    }
  }, [clock]);

  // 兩個人都答題之後
  // 等後端 trigger 更新回合後再過 1 秒更新前端顯示的回合
  useEffect(() => {
    let timer;
    if (backEndRound !== 0) {
      timer = setTimeout(() => {
        if (backEndRound == 10) {
          setShowEnding(true);
        } else {
          setRound(backEndRound);
          setClock(MAX_CLOCK);
        }
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [backEndRound]);

  // 處理 Layout
  const playerList = Object.keys(players).map((uid) => ({
    ...players[uid],
    userId: uid,
  }));

  const [player1, player2] = playerList.map((player) => {
    let answerJudged = false;
    if (
      playerChosen &&
      playerChosen[round] &&
      playerChosen[round][player.userId]
    ) {
      answerJudged = playerChosen[round][player.userId].judged;
    }
    return (
      <Player
        key={player.userId}
        role={player.role}
        myScore={player.score}
        isOnline
        userName={player.userName}
        judged={answerJudged}
      />
    );
  });

  const quizArea = (
    <div className={classes["quiz-area"]}>
      <Question question={questions[round]} round={round} />
      <Choices
        question={questions[round]}
        onChoose={chooseAnswer}
        showAnswer={judged}
        chosen={chosen}
      />
    </div>
  );

  return (
    <React.Fragment>
      <GameLayout>
        <Mobile>
          <Clock>
            <h1>{clock >= 0 ? clock : 0}</h1>
          </Clock>
          <div className={classes["players"]}>
            {player1}
            {player2}
          </div>
          {quizArea}
        </Mobile>
        <PC>
          {player1}
          <PcQuiz>
            <Clock>
              <h1>{clock >= 0 ? clock : 0}</h1>
            </Clock>
            {quizArea}
          </PcQuiz>
          {player2}
        </PC>
      </GameLayout>
      {showEnding && (
        <EndingModal endMessage={endMessage} gameType="quiz" isOnline />
      )}
    </React.Fragment>
  );
};

export default Quizio;
