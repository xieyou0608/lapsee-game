import React from "react";
import classes from "./StartButton.module.css";

const StartButton = (props) => {
  return (
    <button className={classes["start-btn"]} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default StartButton;
