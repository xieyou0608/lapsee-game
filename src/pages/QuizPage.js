import React from "react";
import QuizGame from "../components/QuizGame/QuizGame";

const QuizPage = ({ numPlayers }) => {
  return <QuizGame numPlayers={numPlayers} />;
};

export default QuizPage;
