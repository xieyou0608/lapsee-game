import { createSlice } from "@reduxjs/toolkit";
import { quizExtraScore as extra } from "../components/Game/ExtraScore";

const quizInitialState = {
  round: 0,
  questions: null,
  combo: 0,
  score: 0,
  role: "萊西",
  endMessage: "",
  chosen: null,
  showAnswer: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState: quizInitialState,
  reducers: {
    loadQuestions(state, action) {
      // 不能直接動 state
      // state = { ...quizInitialState, questions: action.payload };
      return { ...quizInitialState, questions: action.payload };
    },
    chooseAnswer(state, action) {
      const option = action.payload;
      const { questions, round } = state;
      if (option === questions[round].answer) {
        const combo = state.combo + 1;
        state.score = state.score + 100 + extra[combo];
        state.combo = combo;
        state.showAnswer = "答對了";
      } else {
        state.combo = 0;
        state.showAnswer = "答錯了";
      }
    },
    resetChosen(state) {
      const { questions, round } = state;
      if (round !== questions.length - 1) {
        state.round += 1;
        state.chosen = null;
      } else {
        state.endMessage = "你得了" + state.score + "分";
      }
      state.showAnswer = null;
    },
  },
});

export const quizActions = quizSlice.actions;
export default quizSlice;
