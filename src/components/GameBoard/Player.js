import React from "react";
import classes from "./Player.module.css";
const Player = ({ score, player, isMyTurn }) => {
  return (
    <div className={classes.score}>
      <h6 className={isMyTurn ? classes.playing : ""}>玩家{player}</h6>
      <h4>分數: {score}</h4>
    </div>
  );
};

export default Player;
