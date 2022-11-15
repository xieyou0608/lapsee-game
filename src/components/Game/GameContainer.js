import React from "react";
import classes from "./GameContainer.module.css";

const GameContainer = (props) => {
  return <div className={classes["game-container"]}>{props.children}</div>;
};

export default GameContainer;
