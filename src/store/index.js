import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./game-slice";
import memorySlice from "./memory-slice";
import quizSlice from "./quiz-slice";
import quizioSlice from "./quizio-slice";

const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    memory: memorySlice.reducer,
    quiz: quizSlice.reducer,
    quizio: quizioSlice.reducer,
  },
});

export default store;
