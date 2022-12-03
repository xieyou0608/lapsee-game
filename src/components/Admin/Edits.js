import React, { useRef } from "react";
import { TextField, Button, styled, Box } from "@mui/material";
import { QuestionBox } from "./Question";

const EditBox = styled(QuestionBox)`
  display: flex;
  flex-direction: column;
  row-gap: 2vh;
  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 5vw 5vw;
  }
`;

const AddForm = ({ questions, addNewQuestions }) => {
  const numRef = useRef();
  const descriptionRef = useRef();
  const choicesRef = useRef();
  const answerRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const num = numRef.current.value.trim();
    const description = descriptionRef.current.value.trim();
    const choices = choicesRef.current.value.trim();
    const answer = answerRef.current.value.trim();
    const newQuestion = { description, choices, answer };
    addNewQuestions(num, newQuestion);
  };

  return (
    <form onSubmit={submitHandler}>
      <EditBox>
        <span>新增題目</span>
        <TextField label={`題號(${questions.length + 1})`} inputRef={numRef} />
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
  );
};

const GuideBox = styled("div")`
  display: flex;
  align-items: center;
  column-gap: 3vw;
`;

const JsonForm = ({ setQuestions }) => {
  const jsonRef = useRef();
  const importJsonHandler = () => {
    const jsonText = jsonRef.current.value.trim();
    try {
      const parsed = JSON.parse(jsonText);
      if (!Array.isArray(parsed)) {
        throw new Error("格式錯誤");
      }
      setQuestions(parsed);
      jsonRef.current.value = "";
    } catch (e) {
      window.alert(e);
    }
  };
  return (
    <EditBox>
      <GuideBox>
        <div>
          <span>
            1. 下載試算表成excel <br />
            2.{" "}
            <a
              href="https://products.aspose.app/cells/zh-hant/conversion/excel-to-json"
              target="blank"
            >
              excel to JSON 工具
            </a>
            <br />
            3. 貼進來匯入
            <br />
            4. 儲存
          </span>
        </div>
        <Button onClick={importJsonHandler}>匯入</Button>
      </GuideBox>
      <TextField
        label="JSON 字串"
        inputRef={jsonRef}
        multiline
        minRows={2}
        sx={{ bgcolor: "white", width: "100%" }}
      />
    </EditBox>
  );
};

export { AddForm, JsonForm };
