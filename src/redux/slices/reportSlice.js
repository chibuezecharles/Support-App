import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/settings";
import httpRequest from "../../utils/httpRequest";

const initialState = {
  data: [],
  loading: false,
  error: null,
};
export const getReport = createAsyncThunk(
  "report/getReport",
  async (formData) => {
    return httpRequest(`${BASE_URL}/report/getreport`, "post", formData);
  }
);

const reportSlice = createSlice({
  name: "report",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getReport.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getReport.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload;
      console.log(payload);
    });
    builder.addCase(getReport.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      console.log(payload);
    });
  },
});

export default reportSlice.reducer;
