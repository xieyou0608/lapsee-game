import React from "react";
import classes from "./Player.module.css";
import { Box, Chip } from "@mui/material";
import playerA from "../../assets/images/LAPSEE-角色-2.png";
import playerB from "../../assets/images/LAPSEE-角色-1.png";

const Player = ({ score, playerName, isMyTurn }) => {
  const playerStyle = `${classes["player-name"]} ${
    isMyTurn ? classes.playing : ""
  }`;
  const playerSrc = playerName === "萊西" ? playerA : playerB;

  return (
    <React.Fragment>
      <Box
        sx={{
          height: "50vh",
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div className={playerStyle}>{playerName}</div>
        <img
          className={classes["player-img"]}
          src={playerSrc}
          alt={playerName}
        />
        <div className={classes.score}>{score}</div>
      </Box>
      <Box
        sx={{
          height: "15vh",
          width: "40vw",
          display: { xs: "flex", sm: "none" },
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <img
          className={classes["player-img"]}
          src={playerSrc}
          alt={playerName}
        />
        <div style={{ width: "100%" }}>
          <div className={playerStyle}>{playerName}</div>
          <div className={classes.score}>{score}</div>
        </div>
      </Box>
    </React.Fragment>
  );
};

export default Player;
