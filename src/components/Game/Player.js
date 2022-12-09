import React from "react";
import { useSelector } from "react-redux";

import classes from "./Player.module.css";
import { Box, Chip } from "@mui/material";
import playerA from "../../assets/images/LAPSEE-角色-2.png";
import playerB from "../../assets/images/LAPSEE-角色-1.png";

const Player = ({ role, myScore, userName, gameType }) => {
  const { numPlayers, curPlayer } = useSelector((state) => state.game);

  let playerName = role === "A" ? "萊西" : "剖西";
  if (userName) {
    playerName = userName;
  }

  const playerSrc = role === "A" ? playerA : playerB;
  let playerStyle = classes["player-name"];
  if (gameType === "memory" && curPlayer === role) {
    playerStyle = classes["player-name"] + " " + classes["playing"];
  }

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
        <div className={classes["score"]}>{myScore}</div>
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
          <div className={classes.score}>{myScore}</div>
        </div>
      </Box>
    </React.Fragment>
  );
};

export default Player;
