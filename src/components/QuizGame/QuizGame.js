import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cardImages } from "../../assets/card-images/CardImages";
import { textQuestions } from "./TextQuestions";
import GameContainer from "../Game/GameContainer";
import Player from "../Game/Player";

import classes from "./QuizGame.module.css";
import Question from "./Question";
import Choices from "./Choices";
import MessageModal from "../UI/MessageModal";

const NUM_QUESTIONS = 10;

const QuizGame = ({ numPlayers }) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(null);
  const [count, setCount] = useState(0);

  const [curPlayer, setCurPlayer] = useState("A");
  const [score, setScore] = useState({ A: 0, B: 0 });
  const [chosen, setChosen] = useState(null);
  const [endMessage, setEndMessage] = useState("");

  const drawImageChoices = (imgIndex) => {
    // 抽四個選項
    const randomChoices = [...Array(8).keys()]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    // 其中一個換成正答
    if (!randomChoices.includes(imgIndex)) {
      const replaced = Math.floor(Math.random() * 4);
      randomChoices[replaced] = imgIndex;
    }

    return randomChoices;
  };

  const drawQuestions = () => {
    const randomImageDraw = [...Array(8).keys()]
      .sort(() => Math.random() - 0.5)
      .map((num) => ({
        description: cardImages[num].information,
        choices: drawImageChoices(num),
        answer: num,
        src: cardImages[num].src,
        type: "image",
      }));

    const randomTextDraw = [...Array(4).keys()]
      .sort(() => Math.random() - 0.5)
      .map((num) => ({ ...textQuestions[num], type: "text" }));

    const combination = randomImageDraw
      .concat(randomTextDraw)
      .sort(() => Math.random() - 0.5);

    setQuestions(combination);
  };

  useEffect(() => {
    drawQuestions();
  }, []);

  const choose = (option) => {
    if (chosen || chosen === 0) return; //選到資訊精靈的時候chosen會 = 0
    setChosen(option);
    if (option === questions[count].answer) {
      setScore((prev) => ({
        ...prev,
        [curPlayer]: prev[curPlayer] + 1,
      }));
    }
    setTimeout(() => {
      if (numPlayers === 2) {
        setCurPlayer((prev) => (prev == "A" ? "B" : "A"));
      }
      if (count + 1 === NUM_QUESTIONS) {
        setEndMessage("遊戲結束");
      } else {
        setCount((prev) => prev + 1);
      }
      setChosen(null);
    }, [1000]);
  };

  const layoutPlayerA = (
    <Player score={score.A} player="A" isMyTurn={curPlayer === "A"} />
  );

  const layoutPlayerB =
    numPlayers == 2 ? (
      <Player score={score.B} player="B" isMyTurn={curPlayer === "B"} />
    ) : null;

  const goToHome = () => {
    navigate("/");
  };

  return (
    <GameContainer>
      {endMessage && (
        <MessageModal title="結束" content={endMessage} onConfirm={goToHome} />
      )}
      <div className={classes["quiz-game"]}>
        <div className={classes["players"]}>
          {layoutPlayerA}
          {layoutPlayerB}
        </div>
        {questions && <Question question={questions[count]} count={count} />}
        {questions && (
          <Choices
            question={questions[count]}
            onChoose={choose}
            chosen={chosen}
          />
        )}
      </div>
    </GameContainer>
  );
};

export default QuizGame;
