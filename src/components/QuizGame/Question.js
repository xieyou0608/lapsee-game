import React from "react";
import { styled } from "@mui/material";

const QuestionBox = styled("div")`
  width: 30vw;
  border-radius: 3vw;
  background-color: rgb(183, 164, 164);
  padding: 3vw;
  margin: auto 2vw;
  margin-bottom: 3vh;

  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    width: 80vw;
    margin-right: 0;
  }

  @media (min-width: 600px) {
    width: 40vw;
    font-size: 1.5vw;
  }
`;

const Question = ({ question, round }) => {
  return (
    <QuestionBox>
      第{round + 1}題:
      <br />
      {question.description}
    </QuestionBox>
  );
};

export default Question;
