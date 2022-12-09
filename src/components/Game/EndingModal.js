import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import classes from "./EndingModal.module.css";
import { TextField } from "@mui/material";

import MessageModal from "../UI/MessageModal";
import { winImageA, winImageB } from "../../assets/card-images/CardImages";
import RankService from "../../services/Rank.service";

const EndingModal = ({ endMessage, score, gameType }) => {
  const navigate = useNavigate();
  const numPlayers = useSelector((state) => state.game.numPlayers);

  const [inputName, setInputName] = useState("");
  const [isValidName, setIsValidName] = useState(true);
  const handleChangeName = (e) => {
    setIsValidName(true);
    setInputName(e.target.value);
    if (e.target.value.trim().length > 10) setIsValidName(false);
  };

  // singleEnding
  const nameInput = (
    <div className={classes["single-ending"]}>
      <img src={winImageA} alt="" />
      <p>{endMessage}</p>
      <TextField
        type="text"
        label="你的暱稱"
        color="secondary"
        onChange={handleChangeName}
        value={inputName}
        error={!isValidName}
        helperText={!isValidName ? "長度上限為10個字" : null}
      />
    </div>
  );

  // pkEnding
  const pkEnding = (
    <div className={classes["pk-ending"]}>
      {endMessage === "萊西贏了！" && <img src={winImageA} alt="" />}
      {endMessage === "剖西贏了！" && <img src={winImageB} alt="" />}
      <p>{endMessage}</p>
    </div>
  );

  const recordNewRank = async () => {
    if (inputName === "") {
      navigate("/" + gameType + "-rank");
      return;
    }

    try {
      const res = await RankService.postScore(gameType, inputName, score);
    } catch (error) {
      console.log(error);
    }
    navigate("/" + gameType + "-rank");
  };

  const confirmHandler = () => {
    if (isValidName) {
      recordNewRank();
    }
  };

  return (
    <React.Fragment>
      {numPlayers === 1 && (
        <MessageModal
          title="過關"
          content={nameInput}
          onConfirm={confirmHandler}
        />
      )}
      {numPlayers === 2 && (
        <MessageModal
          title="遊戲結束"
          content={pkEnding}
          onConfirm={() => {
            navigate("/");
          }}
        />
      )}
    </React.Fragment>
  );
};

export default EndingModal;
