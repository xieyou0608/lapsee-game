import React from "react";
import classes from "./CardChoices.module.css";
import { cardImages } from "../../assets/card-images/CardImages";

const sign = ["A", "B", "C", "D"];

const CardChoices = ({ choices, onChoose, chosen, correct }) => {
  return (
    <div className={classes["choices"]}>
      {choices.map((imgIdx, signIdx) => {
        let style = classes["choice"];
        if (chosen) {
          if (imgIdx === chosen)
            style = `${classes["choice"]} ${classes["wrong"]}`;
          if (imgIdx === correct)
            style = `${classes["choice"]} ${classes["correct"]}`;
        }
        return (
          <div key={signIdx} className={style} onClick={() => onChoose(imgIdx)}>
            <img src={cardImages[imgIdx].src} alt="" />
            <div>
              {sign[signIdx]} {cardImages[imgIdx].name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardChoices;
