import { createSlice } from "@reduxjs/toolkit";

const quizioSlice = createSlice({
  name: "quizio",
  initialState: {
    // only stored on frontend
    userName: "",
    userId: "",

    // stored on firebase
    status: "wait",
    round: 0,
    questions: null,
    players: {}, // {id1: { name, combo, score, role }, id2: { name, combo, score, role }},
    endMessage: "",
  },
  reducers: {
    resetUserId(state) {
      state.userId = "";
    },
    setUserName(state, action) {
      state.userName = action.payload;
    },
    setUserId(state, action) {
      state.userId = action.payload;
    },
    updateRoomInfo(state, action) {
      const roomInfo = action.payload;
      state.status = roomInfo.status;
      state.round = roomInfo.round;
      state.players = roomInfo.players;
      state.endMessage = roomInfo.endMessage;
      state.questions = roomInfo.questions;
      state.playerChosen = roomInfo.playerChosen;
    },
  },
});

export const quizioActions = quizioSlice.actions;
export default quizioSlice;
