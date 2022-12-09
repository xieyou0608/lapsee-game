import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./QuizGame.module.css";
import { Box, styled } from "@mui/material";

import GameLayout from "../Layout/GameLayout";
import Player from "../Game/Player";
import Question from "./Question";
import Choices from "./Choices";
import EndingModal from "../Game/EndingModal";

import { db } from "../../services/firebase";
import { ref, update } from "firebase/database";

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

  useEffect(() => {
    let timer;
    if (backEndRound !== 0) {
      timer = setTimeout(() => {
        if (backEndRound === 10) {
          setShowEnding(true);
        } else {
          setRound(backEndRound);
        }
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [backEndRound]);

  let chosen = null;
  let judged = false;
  if (playerChosen && playerChosen[round] && playerChosen[round][userId]) {
    chosen = playerChosen[round][userId].chosen;
    judged = playerChosen[round][userId].judged;
  }

  const chooseAnswer = (option) => {
    if (chosen !== null) return;

    update(ref(db, `/onlineRoom/quiz/${roomId}/playerChosen/${round}`), {
      [userId]: { chosen: option, judged: false },
    });
  };

  const playerList = Object.keys(players).map((uid) => ({
    ...players[uid],
    userId: uid,
  }));

  const [player1, player2] = playerList.map((player) => (
    <Player
      key={player.userId}
      role={player.role}
      myScore={player.score}
      isOnline
      userName={player.userName}
    />
  ));

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
          <div className={classes["players"]}>
            {player1}
            {player2}
          </div>
          {quizArea}
        </Mobile>
        <PC>
          {player1}
          {quizArea}
          {player2}
        </PC>
      </GameLayout>
      {showEnding && <EndingModal endMessage={endMessage} gameType="quiz" />}
    </React.Fragment>
  );
};

export default Quizio;
