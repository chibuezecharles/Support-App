import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reportData: {},
};

const reportActionSlice = createSlice({
  name: "reportActions",
  initialState,
  reducers: {
    reportDataLoader: (state, action) => {
      state.reportData = action.payload;
    },
  },
});

export const { reportDataLoader } = reportActionSlice.actions;

export default reportActionSlice.reducer;
