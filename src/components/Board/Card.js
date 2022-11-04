import React, { useState } from "react";
import classes from "./Card.module.css";
const Card = ({ card, flipCard, isOpened }) => {
  const flipCardHandler = () => {
    flipCard(card);
  };

  let style = classes.card;
  if (isOpened) {
    style = style + " " + classes.opened;
  }

  return (
    <div className={style}>
      <img src={card.src} alt={card.mark} className={classes.front} />
      <img
        src={card.src}
        alt={card.mark}
        className={classes.back}
        onClick={flipCardHandler}
      />
    </div>
  );
};

export default Card;
