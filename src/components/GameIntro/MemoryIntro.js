import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./MemoryIntro.module.css";
import ModalContainer from "../UI/ModalContainer";
import StartButton from "../UI/StartButton";
import Setting from "../Setting/Setting";

const MemoryIntro = (props) => {
  const { numCards, setNumCards } = props;
  const navigate = useNavigate();
  const goToMemoryGame = () => {
    navigate("/memory-game");
  };

  return (
    <ModalContainer onClose={props.onClose} title="媒體對對碰">
      <div className={classes.intro}>
        一次可以翻兩張牌，若是翻到一樣的就可以得分！連續答對還有額外驚喜。一起邊玩邊認識這些媒體吧！
      </div>
      <Setting numCards={numCards} setNumCards={setNumCards} />

      <StartButton onClick={goToMemoryGame}>開始遊戲</StartButton>
    </ModalContainer>
  );
};

export default MemoryIntro;
