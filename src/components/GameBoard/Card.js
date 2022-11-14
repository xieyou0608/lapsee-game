import React from "react";
import classes from "./Card.module.css";
import { backImage } from "../../assets/card-images/CardImages";

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

  return (
    <div className={style}>
      <img className={classes.front} src={card.src} alt={card.mark} />
      <img
        className={classes.back}
        src={backImage}
        alt={card.mark}
        onClick={flipCardHandler}
      />
    </div>
  );
};

export default Card;
