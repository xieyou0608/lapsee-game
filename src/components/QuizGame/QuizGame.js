import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gameActions } from "../../store/game-slice";

import { cardImages } from "../../assets/card-images/CardImages";
import { textQuestions } from "./TextQuestions";
import GameContainer from "../Game/GameContainer";
import Player from "../Game/Player";

import classes from "./QuizGame.module.css";
import Question from "./Question";
import Choices from "./Choices";

import Rank from "../Game/Rank";
import { Box } from "@mui/material";
import { quizExtraScore as extra } from "../Game/ExtraScore";
import EndingModal from "../Game/EndingModal";

const NUM_QUESTIONS = 10;

const QuizGame = () => {
  const dispatch = useDispatch();
  const numPlayers = useSelector((state) => state.game.numPlayers);
  const curPlayer = useSelector((state) => state.game.curPlayer);

  const [questions, setQuestions] = useState(null);
  const [count, setCount] = useState(0);

  const [score, setScore] = useState({ A: 0, B: 0 });
  const [combo, setCombo] = useState(0);

  const [chosen, setChosen] = useState(null);
  const [endMessage, setEndMessage] = useState("");
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

    const randomTextDraw = [...Array(19).keys()]
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
      setCombo((prev) => prev + 1);
    } else {
      setCombo(0);
    }
    setTimeout(() => {
      if (numPlayers === 2) {
        dispatch(gameActions.changePlayer());
      }
      setCount((prev) => prev + 1);
      setChosen(null);
    }, [1000]);
  };

  useEffect(() => {
    if (combo !== 0) {
      setScore((prev) => ({
        ...prev,
        [curPlayer]: prev[curPlayer] + 100 + extra[combo],
      }));
    }
  }, [combo]);

  useEffect(() => {
    if (count === NUM_QUESTIONS) {
      if (numPlayers === 2) {
        if (score.A > score.B) setEndMessage("萊西贏了！");
        else if (score.A < score.B) setEndMessage("剖西贏了！");
        else setEndMessage("平手!");
      } else {
        setEndMessage("你得了" + score.A + "分");
      }
    }
  }, [count, score]);

  const layoutPlayerA = <Player role="A" myScore={score.A} />;
  const layoutPlayerB =
    numPlayers == 2 ? <Player role="B" myScore={score.B} /> : null;

  const [inputName, setInputName] = useState("");

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
      {endMessage && !isDone && (
        <EndingModal
          endMessage={endMessage}
          setIsDone={setIsDone}
          inputName={inputName}
          setInputName={setInputName}
        />
      )}
      {isDone && numPlayers === 1 && (
        <Rank
          isDone={isDone}
          name={inputName}
          score={score.A}
          gameType={"quiz"}
        />
      )}
    </GameContainer>
  );
};

export default QuizGame;
