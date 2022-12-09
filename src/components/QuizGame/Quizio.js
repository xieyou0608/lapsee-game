import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gameActions } from "../../store/game-slice";

import classes from "./QuizGame.module.css";
import { Box } from "@mui/material";

import GameLayout from "../Layout/GameLayout";
import Player from "../Game/Player";
import Question from "./Question";
import Choices from "./Choices";
import EndingModal from "../Game/EndingModal";
import playerA from "../../assets/images/LAPSEE-角色-2.png";
import playerB from "../../assets/images/LAPSEE-角色-1.png";

import { db } from "../../services/firebase";
import { ref, update } from "firebase/database";

const Quizio = ({ roomId }) => {
  const {
    userName,
    userId,
    status,
    round,
    questions,
    players,
    endMessage,
    playerChosen,
  } = useSelector((state) => state.quizio);

  let chosen = null;
  if (playerChosen && playerChosen[round] && playerChosen[round][userId]) {
    chosen = playerChosen[round][userId].chosen;
  }

  const choose = (option) => {
    if (chosen !== null) return;

    update(ref(db, `/onlineRoom/quiz/${roomId}/playerChosen/${round}`), {
      [userId]: { chosen: option, judged: false },
    });
  };

  const playerList = Object.keys(players).map((uid) => ({
    ...players[uid],
    userId: uid,
  }));

  const srcMap = {
    A: playerA,
    B: playerB,
  };

  return (
    <React.Fragment>
      <GameLayout>
        <Box>
          <div className={classes["quiz-game"]}>
            <div className={classes["players"]}>
              {players &&
                playerList.map((player) => (
                  <div key={player.userId}>
                    <img src={srcMap[player.role]} alt={player.role} />
                    <div>{player.userName}</div>
                    <div>combo: {player.combo}</div>
                    <div>score: {player.score}</div>
                  </div>
                ))}
            </div>
            <div className={classes["quiz-area"]}>
              {questions && (
                <Question question={questions[round]} round={round} />
              )}
              {questions && (
                <Choices
                  question={questions[round]}
                  onChoose={choose}
                  chosen={chosen}
                />
              )}
            </div>
          </div>
        </Box>
      </GameLayout>
      {endMessage && <EndingModal endMessage={endMessage} gameType="quiz" />}
    </React.Fragment>
  );
};

export default Quizio;
