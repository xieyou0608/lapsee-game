import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import AppLayout from "../components/Layout/AppLayout";
import Header from "../components/Layout/Header";
import StartButton from "../components/UI/StartButton";
import classes from "./HomePage.module.css";
import figure1 from "../assets/images/figure1.png";
import figure2 from "../assets/images/figure2.png";

import RankLinks from "../components/Layout/RankLinks";
import LapseeLinks from "../components/Layout/LapseeLinks";

const HomePage = () => {
  return (
    <AppLayout>
      <img className={classes["figure1"]} src={figure1} alt="" />
      <div className={classes.main}>
        <Header />
        <RankLinks />
        <Link to="/intro">
          <StartButton type="button">開始遊戲</StartButton>
        </Link>
        <LapseeLinks />
      </div>
      <img className={classes["figure2"]} src={figure2} alt="" />
    </AppLayout>
  );
};

export default HomePage;
