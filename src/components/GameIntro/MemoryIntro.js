import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./MemoryIntro.module.css";
import ModalContainer from "../UI/ModalContainer";
import StartButton from "../UI/StartButton";

const MemoryIntro = (props) => {
  const navigate = useNavigate();
  const goToMemoryGame = () => {
    navigate("/memory-game");
  };

  return (
    <ModalContainer onClose={props.onClose} title="媒體對對碰">
      <div>這是遊戲介紹</div>
      <StartButton onClick={goToMemoryGame}>開始遊戲</StartButton>
    </ModalContainer>
  );
};

export default MemoryIntro;
