import React from "react";
import classes from "./Card.module.css";

const Card = ({ card, flipCard, isOpened }) => {
  const flipCardHandler = () => {
    flipCard(card);
  };

  let style = classes.card;
  if (isOpened) {
    style = classes.card + " " + classes.opened;
  }

  if (card.matched) {
    style = classes.card + " " + classes.opened + " " + classes.matched;
  }

  const cardSrc = require(`../../assets/card-images/${card.name}.PNG`);
  const backSrc = require("../../assets/card-images/card-back.png");

  return (
    <div className={style}>
      <img className={classes.front} src={cardSrc} alt={card.mark} />
      <img
        className={classes.back}
        src={backSrc}
        alt={card.mark}
        onClick={flipCardHandler}
      />
    </div>
  );
};

export default Card;
