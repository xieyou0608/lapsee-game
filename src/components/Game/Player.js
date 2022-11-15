import React from "react";
import classes from "./Player.module.css";
import { Box, Chip } from "@mui/material";
import playerA from "../../assets/images/LAPSEE-角色-2.png";
import playerB from "../../assets/images/LAPSEE-角色-1.png";

const Player = ({ score, player, isMyTurn }) => {
  const playerStyle = `${classes["player-name"]} ${
    isMyTurn ? classes.playing : ""
  }`;
  const playerSrc = player === "A" ? playerA : playerB;

  return (
    <Box
      sx={{
        height: { xs: "15vh", sm: "50vh" },
        marginTop: 3,
        marginBottom: 7,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className={playerStyle}>玩家{player}</div>
      <img className={classes["player-img"]} src={playerSrc} alt={player} />
      <div className={classes.score}>{score}</div>
    </Box>
  );
};

export default Player;
