import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    numPlayers: 1,
    // score: { A: 0, B: 0 },
    curPlayer: "A",
    inputName: "",
  },
  reducers: {
    setNumPlayers(state, action) {
      state.numPlayers = action.payload;
      state.curPlayer = "A";
    },
    changePlayer(state) {
      state.curPlayer = state.curPlayer === "A" ? "B" : "A";
    },
    // setScore(state, action) {
    //   state.score = action.payload;
    // },
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice;
