import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gameActions } from "../store/game-slice";

import AppLayout from "../components/Layout/AppLayout";
import Header from "../components/Layout/Header";
import StartButton from "../components/UI/StartButton";
import classes from "./HomePage.module.css";
import figure1 from "../assets/images/figure1.png";
import figure2 from "../assets/images/figure2.png";

import RankLinks from "../components/Layout/RankLinks";
import LapseeLinks from "../components/Layout/LapseeLinks";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const singlePlayerStart = () => {
    dispatch(gameActions.setNumPlayers(1));
    navigate("/intro");
  };
  const twoPlayerStart = () => {
    dispatch(gameActions.setNumPlayers(2));
    navigate("/intro");
  };

  return (
    <AppLayout>
      <img className={classes["figure1"]} src={figure1} alt="" />
      <div className={classes.main}>
        <Header />
        <RankLinks />
        <StartButton onClick={singlePlayerStart}>個人遊戲</StartButton>
        <StartButton onClick={twoPlayerStart}>雙人遊戲</StartButton>
        <LapseeLinks />
      </div>
      <img className={classes["figure2"]} src={figure2} alt="" />
    </AppLayout>
  );
};

export default HomePage;
