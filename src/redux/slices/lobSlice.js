import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/settings";
import httpRequest from "../../utils/httpRequest";

const initialState = {
  lobs: [],
  allUsers: [],
  loading: false,
  error: null,
  empty: true,
  toggleState : true,
};

export const fetchLOB = createAsyncThunk("LOB/fetchLOB", async () => {
  return httpRequest(`${BASE_URL}/lob/view-all-lob`);
});

export const createLOB = createAsyncThunk(
  "LOB/createLOB",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await httpRequest(
        `${BASE_URL}/lob/create-lob`,
        "post",
        arg
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

export const editLOB = createAsyncThunk("LOB/editLOB", async (data) => {
  const response = await httpRequest(`${BASE_URL}/lob/edit-lob`, "POST", data);
  return response;
});

export const fetchUsers = createAsyncThunk("LOB/fetchUsers", async () => {
  return httpRequest(`${BASE_URL}/users/view-all-users`);
});
// export const checkLOB = createAsyncThunk("");

const lobSlice = createSlice({
  name: "newLOB",
  initialState,
  reducers: {
    setToggleState: (state) => {
      state.toggleState = !state.toggleState;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLOB.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLOB.fulfilled, (state, action) => {
      state.loading = false;
      state.lobs = action?.payload?.data;
    });
    builder.addCase(fetchLOB.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    });

    // Create LOB
    builder.addCase(createLOB.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createLOB.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createLOB.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Edit LOB
    builder.addCase(editLOB.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editLOB.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(editLOB.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    });

    // Users
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.allUsers = action?.payload?.data;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.allUsers = action?.error?.message;
    });
  },
});

export const {setToggleState} = lobSlice.actions;
export default lobSlice.reducer;
