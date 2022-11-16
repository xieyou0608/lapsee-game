import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { cardImages } from "../../assets/card-images/CardImages";
import { textQuestions } from "./TextQuestions";
import GameContainer from "../Game/GameContainer";
import Player from "../Game/Player";

import classes from "./QuizGame.module.css";
import Question from "./Question";
import Choices from "./Choices";
import MessageModal from "../UI/MessageModal";

import Rank from "../Game/Rank";
import { Box } from "@mui/material";

const NUM_QUESTIONS = 10;

const QuizGame = ({ numPlayers }) => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState(null);
  const [count, setCount] = useState(0);

  const [curPlayer, setCurPlayer] = useState("A");
  const [score, setScore] = useState({ A: 0, B: 0 });
  const [chosen, setChosen] = useState(null);
  const [endMessage, setEndMessage] = useState("");
  const nameRef = useRef();
  const [isDone, setIsDone] = useState(false);

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
        [curPlayer]: prev[curPlayer] + 100,
      }));
    }
    setTimeout(() => {
      if (numPlayers === 2) {
        setCurPlayer((prev) => (prev == "A" ? "B" : "A"));
      }
      setCount((prev) => prev + 1);
      setChosen(null);
    }, [1000]);
  };

  useEffect(() => {
    if (count === NUM_QUESTIONS) {
      if (numPlayers === 2) {
        if (score.A > score.B) setEndMessage("玩家 A 贏了！");
        else if (score.A < score.B) setEndMessage("玩家 B 贏了！");
        else setEndMessage("平手!");
      } else {
        setEndMessage("你得了" + score.A + "分");
      }
    }
  }, [count, score]);

  const layoutPlayerA = (
    <Player
      score={score.A}
      playerName="萊西"
      isMyTurn={numPlayers === 2 && curPlayer === "A"}
    />
  );

  const layoutPlayerB =
    numPlayers == 2 ? (
      <Player score={score.B} playerName="剖西" isMyTurn={curPlayer === "B"} />
    ) : null;

  const nameInput = (
    <div>
      <p>{endMessage}</p>
      <label htmlFor="">你的名字</label> <input type="text" ref={nameRef} />
    </div>
  );

  const quizArea = (
    <div className={classes["quiz-area"]}>
      {questions && <Question question={questions[count]} count={count} />}
      {questions && (
        <Choices
          question={questions[count]}
          onChoose={choose}
          chosen={chosen}
        />
      )}
    </div>
  );

  return (
    <GameContainer>
      {endMessage && !isDone && numPlayers === 1 && (
        <MessageModal
          title="遊戲結束"
          content={nameInput}
          onConfirm={() => {
            setIsDone(true);
          }}
        />
      )}
      {endMessage && !isDone && numPlayers === 2 && (
        <MessageModal
          title="遊戲結束"
          content={endMessage}
          onConfirm={() => {
            navigate("/");
          }}
        />
      )}
      {isDone && numPlayers === 1 && (
        <Rank
          isDone={isDone}
          name={nameRef.current.value}
          score={score.A}
          gameType={"quiz"}
        />
      )}
      {!(count === NUM_QUESTIONS) && (
        <React.Fragment>
          <Box
            sx={{
              display: { xs: "flex", sm: "none" },
            }}
          >
            <div className={classes["quiz-game"]}>
              <div className={classes["players"]}>
                {layoutPlayerA}
                {layoutPlayerB}
              </div>
              {quizArea}
            </div>
          </Box>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
            }}
          >
            <div className={classes["quiz-game"]}>
              {layoutPlayerA}
              {quizArea}
              {layoutPlayerB}
            </div>
          </Box>
        </React.Fragment>
      )}
    </GameContainer>
  );
};

export default QuizGame;
