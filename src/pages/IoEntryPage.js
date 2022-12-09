import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { ref, update } from "firebase/database";
import { drawQuestions } from "../components/QuizGame/drawQuestions";
import { generateRandomString } from "../components/Online/random";

import { styled, Button, TextField, Alert } from "@mui/material";
import AppLayout from "../components/Layout/AppLayout";
import StartButton from "../components/UI/StartButton";

const EntryBox = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50vmin;

  background-color: white;
  padding: 3vw;
  row-gap: 3vmin;

  border: 1vmin solid black;
  border-radius: 3vmin;
`;

const IoEntryPage = ({ gameType }) => {
  const navigate = useNavigate();

  const [roomId, setRoomId] = useState("");
  const [invalidMsg, setInvalidMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);

  const changeRoomIdHandler = (e) => {
    const input = e.target.value.trim();
    setShowMsg(false);
    setRoomId(input);
  };

  const checkValid = () => {
    if (roomId.length !== 6) {
      setInvalidMsg("房間代碼為6個字");
      return false;
    } else {
      setInvalidMsg("");
      return true;
    }
  };

  const connectRoom = () => {
    if (!checkValid()) {
      setShowMsg(true);
    } else {
      navigate(`/${gameType}.io/${roomId}`);
    }
  };

  const createGameRoom = async () => {
    const newQuestions = await drawQuestions();
    const newRoomId = generateRandomString(6);
    update(ref(db, "/onlineRoom/quiz"), {
      [newRoomId]: {
        status: "waiting",
        round: 0,
        questions: newQuestions,
        endMessage: "",
      },
    })
      .then(() => {
        navigate(`/${gameType}.io/${newRoomId}`);
      })
      .catch((e) => {
        alert("連線錯誤，請再試一次");
      });
  };

  return (
    <AppLayout>
      <EntryBox>
        <h2>新遊戲 </h2>
        <StartButton onClick={createGameRoom}>創建房間</StartButton>
      </EntryBox>
      <br />
      <EntryBox>
        <h2>加入遊戲</h2>
        <TextField
          label="房間代碼"
          onChange={changeRoomIdHandler}
          value={roomId}
        />
        {showMsg && <Alert severity="error">{invalidMsg}</Alert>}
        <StartButton onClick={connectRoom}>加入房間</StartButton>
      </EntryBox>
    </AppLayout>
  );
};

export default IoEntryPage;
