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
      <img className={classes.front} src={card.src} alt={card.mark} />
      <img
        className={classes.back}
        src="./img/cards/card-back.png"
        alt={card.mark}
        onClick={flipCardHandler}
      />
    </div>
  );
};

export default Card;
