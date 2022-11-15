import React from "react";
import classes from "./Choices.module.css";
import { cardImages } from "../../assets/card-images/CardImages";
import { type } from "@testing-library/user-event/dist/type";

const sign = ["A", "B", "C", "D"];

const CardChoices = ({ question, onChoose, chosen }) => {
  const { choices, answer, type } = question;

  let layout;

  const imageGridStyle = classes["choices"] + " " + classes["images-grid"];
  const textGridStyle = classes["choices"] + " " + classes["texts-grid"];
  const wrongBorder = classes["choice"] + " " + classes["wrong"];
  const correctBorder = classes["choice"] + " " + classes["correct"];

  if (type === "image") {
    layout = (
      <div className={imageGridStyle}>
        {choices.map((option, signIdx) => {
          let style = classes["choice"];
          if (chosen === 0 || chosen) {
            if (option === chosen) style = wrongBorder;
            if (option === answer) style = correctBorder;
          }
          return (
            <div
              key={signIdx}
              className={style}
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
          let style = classes["choice"];
          if (chosen === 0 || chosen) {
            if (option === chosen) style = wrongBorder;
            if (option === answer) style = correctBorder;
          }
          return (
            <div
              key={signIdx}
              className={style}
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
