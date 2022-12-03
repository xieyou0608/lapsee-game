import React, { useEffect, useState } from "react";
import AdminService from "../../services/Admin.service";
import { Button, styled, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Login from "./Login";
import { AddForm, JsonForm } from "./Edits";
import Question from "./Question";

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

const SaveBox = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-top: 5vh;
  margin-bottom: 20vh;
`;

const Admin = () => {
  // 登入之後打 firebase api 會在資料庫再確認一次管理員身分
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("lapsee_user"))
  );
  const [questions, setQuestions] = useState([]);

  const loadQuestions = async () => {
    try {
      const res = await AdminService.getQuestions(user);
      const objData = res.data;
      if (objData) {
        const arrayData = Object.keys(objData).map((key) => objData[key]);
        setQuestions(arrayData);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        // token expired
        localStorage.removeItem("lapsee_user");
        setUser(null);
      } else {
        window.alert(error.message);
      }
    }
  };

  useEffect(() => {
    if (user) {
      loadQuestions();
    }
  }, [user]);

  const addNewQuestions = (num, newQuestion) => {
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
      await AdminService.putQuestions(questions, user);
      alert("儲存成功!");
    } catch (e) {
      alert("儲存失敗!");
      console.log(e);
    }
    loadQuestions();
  };

  const logoutHandler = () => {
    if (window.confirm("要登出嗎?")) {
      localStorage.removeItem("lapsee_user");
      setUser(null);
    }
  };

  return (
    <React.Fragment>
      {!user && <Login setUser={setUser} />}
      {user && (
        <React.Fragment>
          <h1>後台</h1>
          <JsonForm setQuestions={setQuestions} />
          <QuestionsLayout>
            {questions.map((question, index) => (
              <Question
                key={uuidv4()}
                question={question}
                index={index}
                deleteQuestion={deleteQuestion}
              />
            ))}
          </QuestionsLayout>
          <AddForm questions={questions} addNewQuestions={addNewQuestions} />
          <SaveBox>
            <p>
              題號沒有特別輸入的話就會加在最後面
              <br />
              全部的操作會在按儲存後才更新到資料庫
              <br />
              要取消的話只要重新整理網頁就好
              <br />
            </p>
            <Button onClick={saveQuestions} color="secondary">
              儲存全部
            </Button>
            <br />
            <Button onClick={logoutHandler}>登出</Button>
          </SaveBox>
          {/* <Button onClick={addAllQuestions}>匯入舊題目</Button> */}
          {/* <Button onClick={deleteAllQuestions}>刪除所有題目</Button> */}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Admin;
