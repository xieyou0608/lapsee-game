import React, { useState } from "react";
import classes from "./Card.module.css";
const Card = ({ card, idx, flipCard }) => {
  const flipCardHandler = () => {
    if (!card.flipped) {
      flipCard(idx);
    }
  };

  let style = classes.card;
  if (!card.matched && !card.flipped) {
    style = style + " " + classes.fold;
  }

  return (
    <div className={style} onClick={flipCardHandler}>
      <p>{card.img}</p>
    </div>
  );
};

export default Card;
