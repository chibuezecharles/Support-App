import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpRequest from "../../utils/httpRequest";
import { BASE_URL } from "../../config/settings";

const initialState = {
  changeRequest: [],
  changeprojectHistory: [],
  loading: false,
  error: null,
  empty: true,
};

export const fetchChangeRequest = createAsyncThunk(
  "changeRequest/fetchChangeRequest ",
  async () => {
    const response = httpRequest(
      `${BASE_URL}/project/view-all-projects/ChangeRequest`
    );
    // console.log("all change requests: ", response);
    return response;
  }
);

export const createChangeRequest = createAsyncThunk(
  "changeRequest/createChangeRequest",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await httpRequest(
        `${BASE_URL}/project/create-change-request`,
        "post",
        arg
      );
      //  console.log("create change request", response);
      if (response?.response?.data) {
        throw response;
      }
      return response;
    } catch (error) {
      // console.log("error: ",error?.response?.data);
      return rejectWithValue(error?.response?.data);
    }
  }
);

export const fetchChangeProjectHistory = createAsyncThunk(
  "changeRequest/fetchChangeProjectHistory ",
  async ({ projectId }) => {
    const response = httpRequest(
      `${BASE_URL}/report/change-request-history/${projectId}`
    );
    // console.log("change project history: ", response);
    return response;
  }
);

const changeRequestSlice = createSlice({
  name: "changeRequest",
  initialState,
  extraReducers: (builder) => {
    // Fetch all changeRequest
    builder.addCase(fetchChangeRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchChangeRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.changeRequest = action.payload?.data?.filter(
        (item) => item?.isDeleted === false
      );
      state.error = null;
    });
    builder.addCase(fetchChangeRequest.rejected, (state, action) => {
      state.loading = false;
      state.changeRequest = [];
      state.error = action.payload?.error?.responseDescription;
    });

    // Create new changeRequest
    builder.addCase(createChangeRequest.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createChangeRequest.fulfilled, (state, action) => {
      state.loading = false;
      state.changeRequest.push(action.payload?.data);
      // console.log(action.payload);
      state.error = null;
    });
    builder.addCase(createChangeRequest.rejected, (state, action) => {
      state.loading = false;
      // state.changeRequest = [];
      state.error = action.payload?.responseDescription;
    });

    // Fetch change request project History.
    builder.addCase(fetchChangeProjectHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchChangeProjectHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.changeprojectHistory = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];
      state.error = null;
    });
    builder.addCase(fetchChangeProjectHistory.rejected, (state, action) => {
      state.loading = false;
      state.changeprojectHistory = [];
      state.error = action.payload?.error?.responseDescription;
    });
  },
});

export default changeRequestSlice.reducer;
