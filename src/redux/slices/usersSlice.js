import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpRequest from "../../utils/httpRequest";
import { BASE_URL } from "../../config/settings";

const initialState = {
  currentUser: { firstName: "", lastName: "", role: "", email: "" },
  data: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  return httpRequest(`${BASE_URL}/users/view-all-users`);
});

export const createUser = createAsyncThunk(
  "users/createUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await httpRequest(
        `${BASE_URL}/users/create-user`,
        "post",
        data
      );

      if (response?.response?.data) {
        throw response;
      }
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.ResponseDescription ||
          error?.response?.data?.responseDescription
      );
    }
  }
);
export const editUser = createAsyncThunk(
  "users/editUser",
  async (data, { rejectWithValue }) => {
    try {
      const response = await httpRequest(
        `${BASE_URL}/users/update-user-profile`,
        "post",
        data
      );
      if (response?.response?.data) {
        throw response;
      }
      return response;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.ResponseDescription ||
          error?.response?.data?.responseDescription
      );
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    removeCurrentUser: (state) => {
      state.currentUser = initialState.currentUser;
    },
    removeError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data = payload?.data;
    });
    builder.addCase(fetchUsers.rejected, (state, { payload }) => {
      state.data = false;
      state.error = payload?.message;
    });
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.data.push(payload.data);
      state.error = null;
    });
    builder.addCase(createUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
    builder.addCase(editUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(editUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state = payload;
      state.error = null;
    });
    builder.addCase(editUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export default usersSlice.reducer;
export const { addCurrentUser, removeCurrentUser, removeError } =
  usersSlice.actions;
