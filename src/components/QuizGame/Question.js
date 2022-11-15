import React from "react";
import classes from "./Question.module.css";
import { cardImages } from "../../assets/card-images/CardImages";

const Question = ({ question, count }) => {
  return (
    <div className={classes["question"]}>
      第{count + 1}題:
      <br />
      {question.description}
    </div>
  );
};

export default Question;
