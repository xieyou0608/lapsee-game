import React from "react";
import { Button, styled } from "@mui/material";

const QuestionBox = styled("div")`
  display: flex;
  align-items: center;
  column-gap: 2vw;
  margin: 1vw;
  padding: 1vw 2vw;
  width: 40vw;
  border: solid black 0.2vw;
  border-radius: 1.5vw;
  background-color: white;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 1vw 5vw;
    width: 80vw;
  }

  .content {
    flex-grow: 1;

    div {
      display: flex;
      justify-content: space-between;

      ${({ theme }) => theme.breakpoints.down("sm")} {
        flex-direction: column;
      }

      .choices {
        color: blue;
      }
      .answer {
        color: red;
      }
    }
  }
`;

const Question = ({ question, index, deleteQuestion }) => {
  const deleteHandler = () => {
    deleteQuestion(index);
  };
  return (
    <QuestionBox>
      <div className="content">
        <span>
          {index + 1}. {question.description}
        </span>
        <div>
          <span className="choices">{question.choices}</span>
          <span className="answer">A: {question.answer}</span>
        </div>
      </div>
      <Button onClick={deleteHandler} color="error">
        刪除
      </Button>
    </QuestionBox>
  );
};

export { QuestionBox };
export default Question;
