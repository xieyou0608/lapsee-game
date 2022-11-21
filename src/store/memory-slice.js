import { createSlice } from "@reduxjs/toolkit";

const memorySlice = createSlice({
  name: "memory",
  initialState: {
    numCards: 8,
  },
  reducers: {
    setNumCards(state, action) {
      state.numCards = action.payload;
    },
  },
});

export const memoryActions = memorySlice.actions;
export default memorySlice;
