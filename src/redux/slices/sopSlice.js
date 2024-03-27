import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpRequest from "../../utils/httpRequest";
import { BASE_URL } from "../../config/settings";


const initialState = {
    sop:[],
    loading: false,
    error: null,
    empty: true,
}

export const fetchsop = createAsyncThunk("sop/fetchsop ", async () => {
    const response = httpRequest(`${BASE_URL}/sop/view-sop`);
    // console.log("all sop: ", response);
    return  response;
});

export const createSop = createAsyncThunk("sop/createSop", async (arg) => {
    const response = httpRequest(`${BASE_URL}/sop/create-sop`, "post", arg );
    // console.log("create sop: ", response);
    return response;
});

export const editSop = createAsyncThunk("sop/editSop", async (arg) => {
    const response = httpRequest(`${BASE_URL}/sop/edit-sop`, "post", arg );
    // console.log("edit sop: ", response);
    return response;
});


const sopSlice = createSlice({
    name: "changeRequest",
    initialState,
    extraReducers: (builder) => {
        // fetch all sop : 
        builder.addCase(fetchsop.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchsop.fulfilled, (state, action) => {
            state.loading = false;
            state.sop = action.payload?.data;
            state.error = null;
        });
        builder.addCase(fetchsop.rejected, (state, action) =>{
            state.loading = false;
            state.sop = [];
            state.error = action.payload?.error?.responseDescription;
        });

        // create sop :
        builder.addCase(createSop.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createSop.fulfilled, (state, action) => {
            state.loading = false;
            state.sop = action.payload?.data;
            state.error = null;
        });
        builder.addCase(createSop.rejected, (state, action) =>{
            state.loading = false;
            state.sop = [];
            state.error = action.payload?.error?.responseDescription;
        });

         // edit sop :
         builder.addCase(editSop.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(editSop.fulfilled, (state, action) => {
            state.loading = false;
            state.sop = action.payload?.data;
            state.error = null;
        });
        builder.addCase(editSop.rejected, (state, action) =>{
            state.loading = false;
            state.sop = [];
            state.error = action.payload?.error?.responseDescription;
        });
    }
});

export default sopSlice.reducer;