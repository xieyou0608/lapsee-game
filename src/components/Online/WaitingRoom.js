import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../services/firebase";
import { ref, update, remove } from "firebase/database";

import StartButton from "../UI/StartButton";
import { styled, Box, keyframes, Button } from "@mui/material";
import AppLayout from "../Layout/AppLayout";
import { useNavigate } from "react-router-dom";
import Player from "../Game/Player";
import GameLayout from "../Layout/GameLayout";
import MessageModal from "../UI/MessageModal";

const PlayerBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

const clockAnimation = keyframes`
 from {
    transform: scale(2);
  }

  to {
    transform:scale(1);
  }
`;

const ClockH1 = styled("h1")`
  animation: ${clockAnimation} 1s linear infinite;
`;

const WaitingRoom = ({ gameType, roomId }) => {
  const navigate = useNavigate();
  const { userId, players, status } = useSelector((state) => state.quizio);
  const [clock, setClock] = useState(6);
  const [showModal, setShowModal] = useState(false);

  const startGameHandler = () => {
    const roomDbRef = ref(db, `/onlineRoom/${gameType}/${roomId}`);
    update(roomDbRef, { status: "counting" });
  };

  let interval = null;
  useEffect(() => {
    if (status === "counting") {
      interval = setInterval(() => {
        setClock((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [status]);

  useEffect(() => {
    // 由其中一個人來改動 status
    if (clock <= 0 && players[userId].role === "A") {
      clearInterval(interval);
      const roomDbRef = ref(db, `/onlineRoom/${gameType}/${roomId}`);
      update(roomDbRef, { status: "playing" });
    }
  }, [clock]);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };

  if (!players) return <AppLayout />;

  const playerList = Object.keys(players).map((uid) => ({
    ...players[uid],
    userId: uid,
  }));

  return (
    <>
      <GameLayout>
        <PlayerBox>
          {players &&
            playerList.map((player) => (
              <Player
                key={player.userId}
                role={player.role}
                myScore={0}
                isOnline
                userName={player.userName}
              />
            ))}
        </PlayerBox>
        {status === "waiting" && (
          <>
            <StartButton
              onClick={startGameHandler}
              disabled={playerList.length !== 2}
            >
              開始遊戲
            </StartButton>
            {/* <StartButton onClick={leaveRoomHandler}>離開遊戲</StartButton> */}
            <Button onClick={handleCopy} color="success" sx={{ mt: "1vh" }}>
              複製遊戲連結
            </Button>
          </>
        )}
        {status === "counting" && clock > 5 && <h1>準備開始...</h1>}
        {status === "counting" && clock <= 5 && <ClockH1>{clock}</ClockH1>}
      </GameLayout>
      {showModal && (
        <MessageModal
          title="複製成功"
          content="複製成功，傳給你的好朋友吧!"
          onConfirm={closeModal}
        />
      )}
    </>
  );
};

export default WaitingRoom;
