import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    numPlayers: 1,
    score: { A: 0, B: 0 },
  },
  reducers: {
    setNumPlayers(state, action) {
      state.numPlayers = action.payload;
    },
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice;
