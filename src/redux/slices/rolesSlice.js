import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpRequest from "../../utils/httpRequest";
import { BASE_URL } from "../../config/settings";

const initialState = {
  currentRole: null,
  data: null,
  loading: false,
  error: null,
};

export const fetchRoles = createAsyncThunk("role/view-role", async () => {
  return httpRequest(`${BASE_URL}/roles/view-role`);
});

const rolesSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentRole: (state, { payload }) => {
      state.currentRole = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRoles.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRoles.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload?.data;
    });
    builder.addCase(fetchRoles.rejected, (state, { payload }) => {
      state.data = false;
      state.error = payload?.message;
    });
  },
});

export default rolesSlice.reducer;
export const { setCurrentRole } = rolesSlice.actions;
