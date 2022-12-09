import React from "react";

import AppLayout from "../components/Layout/AppLayout";
import Header from "../components/Layout/Header";
import StartButton from "../components/UI/StartButton";
import classes from "./HomePage.module.css";
import figure1 from "../assets/images/figure1.png";
import figure2 from "../assets/images/figure2.png";

import RankLinks from "../components/Layout/RankLinks";
import LapseeLinks from "../components/Layout/LapseeLinks";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const toIntro = () => {
    navigate("/intro");
  };
  return (
    <AppLayout>
      <img className={classes["figure1"]} src={figure1} alt="" />
      <div className={classes.main}>
        <Header />
        <RankLinks />
        <Box sx={{ width: { xs: "100%", sm: "60%" }, textAlign: "center" }}>
          <StartButton onClick={toIntro}>開始遊戲</StartButton>
        </Box>
        <LapseeLinks />
      </div>
      <img className={classes["figure2"]} src={figure2} alt="" />
    </AppLayout>
  );
};

export default HomePage;
