import React from "react";
import classes from "./Question.module.css";
import { cardImages } from "../../assets/card-images/CardImages";

const Question = ({ imgIndex, curNumber }) => {
  return (
    <div className={classes["question"]}>
      第{curNumber + 1}題:
      <br />
      {cardImages[imgIndex].information}
    </div>
  );
};

export default Question;
