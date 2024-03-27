import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addLoginUser: (state, { payload }) => {
      console.log({ payload });
      state.user = payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
  },
});

export default authSlice.reducer;
export const { removeUser, addLoginUser } = authSlice.actions;
