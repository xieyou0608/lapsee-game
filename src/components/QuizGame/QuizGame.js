import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { cardImages } from "../../assets/card-images/CardImages";
import GameContainer from "../Game/GameContainer";
import Player from "../Game/Player";

import Question from "./Question";
import CardChoices from "./CardChoices";
import classes from "./QuizGame.module.css";
import MessageModal from "../UI/MessageModal";

const NUM_QUESTIONS = 8;

const QuizGame = ({ numPlayers }) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(null);
  const [curNumber, setCurNumber] = useState(0);

  const [curPlayer, setCurPlayer] = useState("A");
  const [score, setScore] = useState({ A: 0, B: 0 });
  const [chosen, setChosen] = useState(null);
  const [endMessage, setEndMessage] = useState("");

  const drawChoices = (questionIndex) => {
    // 抽四個選項
    const randomChoices = [...Array(8).keys()]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    // 其中一個換成正答
    if (!randomChoices.includes(questionIndex)) {
      const replaced = Math.floor(Math.random() * 4);
      randomChoices[replaced] = questionIndex;
    }

    return randomChoices;
  };

  const drawQuestions = () => {
    const randomDraw = [...Array(8).keys()]
      .sort(() => Math.random() - 0.5)
      .map((q) => ({
        imgIndex: q,
        choices: drawChoices(q),
      }));

    setQuestions(randomDraw);
  };

  useEffect(() => {
    drawQuestions();
  }, []);

  const choose = (imgIndex) => {
    if (chosen) return;
    setChosen(imgIndex);
    if (imgIndex === questions[curNumber].imgIndex) {
      setScore((prev) => ({
        ...prev,
        [curPlayer]: prev[curPlayer] + 1,
      }));
    }

    setTimeout(() => {
      if (numPlayers === 2) {
        setCurPlayer((prev) => (prev == "A" ? "B" : "A"));
      }
      setChosen(null);
      if (curNumber + 1 === NUM_QUESTIONS) {
        setEndMessage("遊戲結束");
      } else {
        setCurNumber((prev) => prev + 1);
      }
    }, [3000]);
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
        {questions && (
          <Question
            imgIndex={questions[curNumber].imgIndex}
            curNumber={curNumber}
          />
        )}
        {questions && (
          <CardChoices
            choices={questions[curNumber].choices}
            onChoose={choose}
            chosen={chosen}
            correct={questions[curNumber].imgIndex}
          />
        )}
      </div>
    </GameContainer>
  );
};

export default QuizGame;
