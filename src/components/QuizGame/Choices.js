import React from "react";
import classes from "./Choices.module.css";
import { cardImages } from "../../assets/card-images/CardImages";

const sign = ["A", "B", "C", "D"];

const CardChoices = ({ question, onChoose }) => {
  const { choices, type } = question;

  let layout;

  const imageGridStyle = classes["choices"] + " " + classes["images-grid"];
  const textGridStyle = classes["choices"] + " " + classes["texts-grid"];

  if (type === "image") {
    layout = (
      <div className={imageGridStyle}>
        {choices.map((option, signIdx) => {
          return (
            <div
              key={signIdx}
              className={classes["choice"]}
              onClick={() => onChoose(option)}
            >
              <img src={cardImages[option].src} alt="" />
              {sign[signIdx]} {cardImages[option].name}
            </div>
          );
        })}
      </div>
    );
  }

  if (type === "text") {
    layout = (
      <div className={textGridStyle}>
        {choices.map((option, signIdx) => {
          return (
            <div
              key={signIdx}
              className={classes["choice"]}
              onClick={() => onChoose(option)}
            >
              <div className={classes["text-choice"]}>
                {sign[signIdx]} {option}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return <div>{layout}</div>;
};

export default CardChoices;
