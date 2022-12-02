import React, { useEffect, useRef, useState } from "react";
import AdminService from "../../services/Admin.service";
import { TextField, Button, styled, Box } from "@mui/material";
import { texts } from "../QuizGame/TextQuestions";
import { v4 as uuidv4 } from "uuid";

Button.defaultProps = {
  variant: "contained",
};

const QuestionsLayout = styled("div")`
  display: grid;
  grid-template-columns: 1fr 1fr;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    grid-template-columns: 1fr;
  }
`;

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

const EditBox = styled(QuestionBox)`
  display: flex;
  flex-direction: column;
  row-gap: 2vh;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 5vw 5vw;
  }
`;

const SaveBox = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
  margin-bottom: 20vh;
`;

const Admin = () => {
  const [questions, setQuestions] = useState([]);
  const numRef = useRef();
  const descriptionRef = useRef();
  const choicesRef = useRef();
  const answerRef = useRef();

  const loadQuestions = async () => {
    try {
      const res = await AdminService.getQuestions();
      const objData = res.data;
      if (objData) {
        const arrayData = Object.keys(objData).map((key) => objData[key]);
        console.log(arrayData);
        setQuestions(arrayData);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const addNewQuestions = (event) => {
    event.preventDefault();
    const num = numRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    const choices = choicesRef.current.value.trim();
    const answer = answerRef.current.value.trim();
    const newQuestion = { description, choices, answer };
    setQuestions((prev) => {
      const length = prev.length;
      if (!num || num <= 0 || num > length) {
        return [...prev, newQuestion];
      } else {
        const temp = JSON.parse(JSON.stringify(prev));
        temp.splice(num - 1, 0, newQuestion);
        return temp;
      }
    });
  };

  const deleteQuestion = (targetIndex) => {
    if (window.confirm("確定要刪掉嗎?")) {
      setQuestions((prev) => prev.filter((_, index) => index !== targetIndex));
    }
  };

  const saveQuestions = async () => {
    if (!window.confirm("要儲存了嗎?")) return;
    console.log(questions);
    try {
      await AdminService.putQuestions(questions);
      alert("儲存成功!");
    } catch (e) {
      alert("儲存失敗!");
      console.log(e);
    }
    loadQuestions();
  };

  // const addAllQuestions = async () => {
  //   try {
  //     await AdminService.putQuestions(texts);
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   loadQuestions();
  // };

  // const deleteAllQuestions = async () => {
  //   try {
  //     await AdminService.deleteAllQuesiton();
  //   } catch (e) {
  //     console.log(e);
  //   }
  //   loadQuestions();
  // };

  return (
    <React.Fragment>
      <h1>後台</h1>
      <QuestionsLayout>
        {questions.map((question, index) => (
          <QuestionBox key={uuidv4()}>
            <div className="content">
              <span>
                {index + 1}. {question.description}
              </span>
              <div>
                <span className="choices">{question.choices}</span>
                <span className="answer">A: {question.answer}</span>
              </div>
            </div>
            <Button onClick={() => deleteQuestion(index)} color="error">
              刪除
            </Button>
          </QuestionBox>
        ))}
      </QuestionsLayout>

      <form onSubmit={addNewQuestions}>
        <EditBox>
          <span>新增題目</span>
          <TextField
            label={`題號(${questions.length + 1})`}
            inputRef={numRef}
          />
          <TextField
            label="題目敘述"
            inputRef={descriptionRef}
            multiline
            minRows={3}
            sx={{ width: "100%" }}
          />
          <Box sx={{ width: "100%" }}>
            <TextField
              label="選項(用/分隔)"
              inputRef={choicesRef}
              multiline
              sx={{ width: "67%", mr: "3%" }}
            />
            <TextField
              label="答案"
              inputRef={answerRef}
              multiline
              sx={{ width: "30%" }}
            />
          </Box>
          <Button type="submit" size="large" fullWidth>
            新增
          </Button>
        </EditBox>
      </form>

      <SaveBox>
        <p>
          全部的操作會在按儲存後才更新到資料庫
          <br />
          要取消的話只要重新整理網頁就好
          <br />
        </p>
        <Button onClick={saveQuestions} color="secondary">
          儲存全部
        </Button>
      </SaveBox>

      {/* <Button onClick={addAllQuestions}>匯入舊題目</Button> */}
      {/* <Button onClick={deleteAllQuestions}>刪除所有題目</Button> */}
    </React.Fragment>
  );
};

export default Admin;
