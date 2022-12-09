import React from "react";
import { cardImages } from "../../assets/card-images/CardImages";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material";

const sign = ["A", "B", "C", "D"];

const BasicGrid = styled("div")`
  width: 80vw;
  display: grid;

  row-gap: 0.5vh;
  column-gap: 0.5vh;
  justify-items: center;

  .image-choice,
  .text-choice {
    transition: 0.5s;
    cursor: pointer;
    border: 1vh solid transparent;
    border-radius: 1vh;
    position: relative; // to make icon offset
  }

  .wrong {
    border-color: red;
  }
  .bingo {
    border-color: green;
  }

  ${({ theme }) => theme.breakpoints.up("sm")} {
    width: 40vw;

    .image-choice:hover,
    .text-choice:hover {
      transform: scale(1.15);
    }
  }
`;

const ImageGrid = styled(BasicGrid)`
  grid-template-columns: 1fr 1fr 1fr 1fr;

  .image-choice {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      width: 100%;
      box-shadow: 0.5vmin 0.5vmin 1vmin rgba(0, 0, 0, 0.5);
      margin-bottom: 1vmin;
    }

    .icon {
      position: absolute;
      bottom: -20%;
    }
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    grid-template-columns: 1fr 1fr;
    .image-choice {
      width: 20vw;
      img {
        width: 100%;
      }
      .icon {
        position: absolute;
        left: -50%;
        bottom: 20%;
      }
    }
  }
`;

const TextGrid = styled(BasicGrid)`
  grid-template-columns: 1fr;

  .text-choice {
    display: flex;
    align-items: center;

    background-color: rgb(82, 44, 4);
    color: white;
    padding: 1vh;
    width: 20vw;

    span {
      flex-grow: 1;
    }
  }

  .icon {
    position: absolute;
    left: -20%;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    .text-choice {
      width: 50vw;
    }
  }
`;

const Choices = ({ question, onChoose, showAnswer, chosen }) => {
  const { choices, type, answer } = question;

  const bingoIcon = (
    <CheckIcon className="icon" color="success" fontSize="large" />
  );
  const wrongIcon = (
    <ClearIcon className="icon" color="error" fontSize="large" />
  );
  const reveal = (option) => {
    let choiceStyle = type === "image" ? "image-choice" : "text-choice";
    let revealIcon = "";
    if (showAnswer) {
      if (option === answer) {
        choiceStyle += " bingo";
        revealIcon = bingoIcon;
      } else if (option === chosen) {
        choiceStyle += " wrong";
        revealIcon = wrongIcon;
      }
    }
    return { choiceStyle, revealIcon };
  };

  let layout;
  if (type === "image") {
    layout = (
      <ImageGrid>
        {choices.map((option, signIdx) => {
          const { choiceStyle, revealIcon } = reveal(option);
          return (
            <div
              key={signIdx}
              className={choiceStyle}
              onClick={() => onChoose(option)}
            >
              <img src={cardImages[option].src} alt="" />
              <span>
                {sign[signIdx]} {cardImages[option].name}
              </span>
              {revealIcon}
            </div>
          );
        })}
      </ImageGrid>
    );
  }

  if (type === "text") {
    layout = (
      <TextGrid>
        {choices.map((option, signIdx) => {
          const { choiceStyle, revealIcon } = reveal(option);
          return (
            <div
              key={signIdx}
              className={choiceStyle}
              onClick={() => onChoose(option)}
            >
              <span>
                {sign[signIdx]} {option}
              </span>
              {revealIcon}
            </div>
          );
        })}
      </TextGrid>
    );
  }

  return <div>{layout}</div>;
};

export default Choices;
