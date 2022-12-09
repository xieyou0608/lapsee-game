import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gameActions } from "../../store/game-slice";

import ModalContainer from "../UI/ModalContainer";
import StartButton from "../UI/StartButton";
import Setting from "../Setting/Setting";
import { styled } from "@mui/material";

const Intro = styled("div")`
  padding: 5vmin;
`;

const MemoryIntro = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toMemoryGame = () => {
    dispatch(gameActions.setNumPlayers(1));
    navigate("/memory-game");
  };
  const twoPlayerStart = () => {
    dispatch(gameActions.setNumPlayers(2));
    navigate("/memory-game");
  };

  return (
    <ModalContainer onClose={props.onClose} title="媒體對對碰">
      <Intro>
        一次可以翻兩張牌，若是翻到一樣的就可以得分！連續答對還有額外驚喜。一起邊玩邊認識這些媒體吧！
      </Intro>
      <Setting />

      <StartButton onClick={toMemoryGame}>單人遊戲</StartButton>
      <StartButton onClick={twoPlayerStart}>雙人遊戲</StartButton>
    </ModalContainer>
  );
};

export default MemoryIntro;
