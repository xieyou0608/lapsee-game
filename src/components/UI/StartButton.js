import React from "react";
import classes from "./StartButton.module.css";

const Button = (props) => {
  return (
    <button className={classes["start-btn"]} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
