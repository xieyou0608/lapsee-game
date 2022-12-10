import React from "react";
import classes from "./StartButton.module.css";

const FlexibleButton = (props) => {
  return (
    <button
      className={classes["start-btn"] + " " + classes["flexible"]}
      onClick={props.onClick}
      disabled={props.disabled}
      style={props.style}
    >
      {props.children}
    </button>
  );
};

const StartButton = (props) => {
  return (
    <button
      className={classes["start-btn"]}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export { FlexibleButton, StartButton };

export default StartButton;
