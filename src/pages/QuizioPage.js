import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../services/firebase";
import { ref, onValue, update } from "firebase/database";

import { generateRandomString } from "../components/Online/random";
import { quizioActions } from "../store/quizio-slice";

import ModalContainer from "../components/UI/ModalContainer";
import { styled, Button, TextField, Alert } from "@mui/material";
import WaitingRoom from "../components/Online/WaitingRoom";
import Quizio from "../components/QuizGame/Quizio";

const ModalContent = styled("div")`
  display: flex;
  justify-content: center;
  padding: 1rem;
`;

const InputNameModal = ({ gameType }) => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.quizio.userName);
  const players = useSelector((state) => state.quizio.players);
  const [invalidMsg, setInvalidMsg] = useState("請輸入暱稱");
  const [showMsg, setShowMsg] = useState(false);

  const changeNameHandler = (e) => {
    const inputName = e.target.value.trim();
    setShowMsg(false);
    dispatch(quizioActions.setUserName(inputName));
  };

  const checkValid = () => {
    if (userName.length > 0 && userName.length <= 10) {
      setInvalidMsg("");
      return true;
    } else {
      setInvalidMsg("請輸入1~10個字");
      return false;
    }
  };

  const enterRoom = () => {
    if (!checkValid) {
      setShowMsg(true);
    } else {
      // 加入遊戲
      const newUserId = generateRandomString(10);
      const playerDbRef = ref(db, `/onlineRoom/${gameType}/${roomId}/players`);
      update(playerDbRef, {
        [newUserId]: {
          userName: userName,
          combo: 0,
          score: 0,
          role: !players ? "A" : "B",
        },
      })
        .then(() => {
          dispatch(quizioActions.setUserId(newUserId));
        })
        .catch((e) => {
          alert("連線錯誤，請再試一次");
        });
    }
  };

  return (
    <ModalContainer title="連線遊戲" onClose={() => {}}>
      <ModalContent>
        <TextField label="暱稱" onChange={changeNameHandler} value={userName} />
        {showMsg && <Alert severity="error">{invalidMsg}</Alert>}
      </ModalContent>
      <Button onClick={enterRoom} fullWidth>
        連線
      </Button>
    </ModalContainer>
  );
};

// page 主要控管連線到 firebase，遊戲邏輯交給底下 component
const QuizioPage = () => {
  const { roomId } = useParams();
  const userId = useSelector((state) => state.quizio.userId);
  const { status, players } = useSelector((state) => state.quizio);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const dbRef = ref(db, `/onlineRoom/quiz/${roomId}`);
    // onValue() will return an unsuscriber
    return onValue(dbRef, (snapShot) => {
      const roomInfo = snapShot.val();
      dispatch(quizioActions.updateRoomInfo(roomInfo));
    });
  }, [dispatch, roomId]);

  useEffect(() => {
    if (players && Object.hasOwn(players, userId)) {
      setShowModal(false);
      setSuccess(true);
    } else {
      setShowModal(true);
    }
  }, [userId, players]);

  return (
    <React.Fragment>
      {showModal && <InputNameModal gameType="quiz" />}
      {success && (status === "waiting" || status === "counting") && (
        <WaitingRoom gameType="quiz" roomId={roomId} />
      )}
      {status === "playing" && <Quizio roomId={roomId} />}
    </React.Fragment>
  );
};

export default QuizioPage;
