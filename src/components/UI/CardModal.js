import React from "react";
import classes from "./CardModal.module.css";

const CardModal = (props) => {
  const { card, onConfirm } = props;
  return (
    <React.Fragment>
      <div className={classes["backdrop"]} onClick={onConfirm} />
      <div className={classes["modal"]}>
        <img src={card.src} alt={card.name} />
        <div className={classes["cardInfo"]}>
          <header className={classes["title"]}>
            <h2>{card.name}</h2>
          </header>
          <div className={classes["content"]}>
            <p>
              {card.information} {card.name}
            </p>
          </div>
          <footer className={classes["action"]}>
            <button className={classes["confirm-btn"]} onClick={onConfirm}>
              OK
            </button>
          </footer>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CardModal;
