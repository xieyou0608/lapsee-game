import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";
import StartButton from "../components/UI/StartButton";
import classes from "./HomePage.module.css";
import figure1 from "../assets/images/figure1.png";
import figure2 from "../assets/images/figure2.png";

import RankLinks from "../components/Layout/RankLinks";
import LapseeLinks from "../components/Layout/LapseeLinks";

const HomePage = ({ setNumPlayers }) => {
  const navigate = useNavigate();
  const singlePlayerStart = () => {
    setNumPlayers(1);
    navigate("/intro");
  };
  const twoPlayerStart = () => {
    setNumPlayers(2);
    navigate("/intro");
  };

  return (
    <React.Fragment>
      <img className={classes["figure1"]} src={figure1} alt="" />
      <div className={classes.main}>
        <Header />
        <RankLinks />
        <StartButton onClick={singlePlayerStart}>個人遊戲</StartButton>
        <StartButton onClick={twoPlayerStart}>雙人遊戲</StartButton>
        <LapseeLinks />
      </div>
      <img className={classes["figure2"]} src={figure2} alt="" />
    </React.Fragment>
  );
};

export default HomePage;
