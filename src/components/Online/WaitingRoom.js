import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../services/firebase";
import { ref, update, remove } from "firebase/database";

import { Button, styled, Box } from "@mui/material";
import AppLayout from "../Layout/AppLayout";
import playerA from "../../assets/images/LAPSEE-角色-2.png";
import playerB from "../../assets/images/LAPSEE-角色-1.png";
import { useNavigate } from "react-router-dom";
import Player from "../Game/Player";
import GameLayout from "../Layout/GameLayout";

const WaitingRoom = ({ gameType, roomId }) => {
  const navigate = useNavigate();
  const { userId, players, status } = useSelector((state) => state.quizio);
  const [timer, setTimer] = useState(5);

  const startGameHandler = () => {
    const roomDbRef = ref(db, `/onlineRoom/${gameType}/${roomId}`);
    update(roomDbRef, { status: "counting" });
  };

  useEffect(() => {
    if (status === "counting") {
      let interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status]);

  useEffect(() => {
    // 由其中一個人來改動 status
    if (timer === 0 && players[userId].role === "A") {
      const roomDbRef = ref(db, `/onlineRoom/${gameType}/${roomId}`);
      update(roomDbRef, { status: "playing" });
    }
  }, [timer]);

  const leaveRoomHandler = () => {
    const userDbRef = ref(db, `/onlineRoom/quiz/${roomId}/players/${userId}`);
    remove(userDbRef)
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        alert("連線錯誤，請再試一次");
      });
  };

  if (!players) return <AppLayout />;

  const playerList = Object.keys(players).map((uid) => ({
    ...players[uid],
    userId: uid,
  }));

  const srcMap = {
    A: playerA,
    B: playerB,
  };

  return (
    <GameLayout>
      {/* mobile */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          {players &&
            playerList.map((player) => (
              <Player key={player.userId} role={player.role} myScore={0} />
            ))}
        </Box>
        {status === "waiting" && (
          <>
            <Button
              onClick={startGameHandler}
              disabled={playerList.length !== 2}
            >
              開始遊戲
            </Button>
            <br />
            <Button onClick={leaveRoomHandler}>離開遊戲</Button>
          </>
        )}
        {status === "counting" && <h1>{timer}</h1>}
      </Box>
    </GameLayout>
  );
};

export default WaitingRoom;
