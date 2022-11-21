import { configureStore } from "@reduxjs/toolkit";
import gameSlice from "./game-slice";
import memorySlice from "./memory-slice";
const store = configureStore({
  reducer: {
    game: gameSlice.reducer,
    memory: memorySlice.reducer,
  },
});

export default store;
