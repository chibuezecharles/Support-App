import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/settings";
import httpRequest from "../../utils/httpRequest";

const initialState = {
  clients: [],
  loading: false,
  error: null,
  empty: true,
  clientData: [],
};

export const fetchClient = createAsyncThunk(
  "manageclient/fetchClient",
  async () => {
    return httpRequest(`${BASE_URL}/manageclient/view-all-clients`);
  }
);

export const createClient = createAsyncThunk(
  "manageClient/createClient",
  async (arg, { rejectWithValue }) => {
    try {
      const response = await httpRequest(
        `${BASE_URL}/manageClient/create-client`,
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

export const editClient = createAsyncThunk(
  "Client/editClient",
  async ({ id, data }) => {
    const response = await httpRequest(
      `${BASE_URL}/client/edit-client/${id}`,
      "post",
      data
    );
    return response;
  }
);

// export const checkClient = createAsyncThunk("");

const clientSlice = createSlice({
  name: "newClient",
  initialState,
  reducers: {
    clientData: (state, action) => {
      state.clientData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClient.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchClient.fulfilled, (state, action) => {
      state.loading = false;
      state.clients = action?.payload?.data;
    });
    builder.addCase(fetchClient.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    });

    // Create Client
    builder.addCase(createClient.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createClient.fulfilled, (state, action) => {
      state.loading = false;
      state.clients.push( action?.payload?.data);
      state.error = null;
    });
    builder.addCase(createClient.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });

    // Edit Client
    builder.addCase(editClient.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(editClient.fulfilled, (state, action) => {
      state.loading = false;
      state.clients = action?.payload?.data;
    });
    builder.addCase(editClient.rejected, (state, action) => {
      state.loading = false;
      state.error = action?.error?.message;
    });
  },
});

export const { clientData } = clientSlice.actions;
export default clientSlice.reducer;
