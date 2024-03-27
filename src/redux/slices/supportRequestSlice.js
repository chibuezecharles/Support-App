import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpRequest from "../../utils/httpRequest";
import { BASE_URL } from "../../config/settings";

const initialState = {
    supportRequest:[],
    supportprojectHistory: [],
    loading: false,
    error: null,
    empty: true,
}

export const fetchsupportRequest = createAsyncThunk("supportRequest/fetchsupportRequest ", async () => {
    const response = httpRequest(`${BASE_URL}/project/view-all-projects/ProjectSupport`);
    // console.log("all support requests: ", response);
    return  response;
});


export const createSupportRequest = createAsyncThunk("supportRequest/createSupportRequest", async (arg, { rejectWithValue }) => {
    try {
        const response = await httpRequest(`${BASE_URL}/project/create-project-support`, "post", arg );
        //  console.log("create project", response);
        if (response?.response?.data) {
            throw response;
          }
         return response;
        
       } catch (error) {
        // console.log("error: ",error?.response?.data);
        return rejectWithValue(error?.response?.data);
       }
});

export const fetchsupportProjectHistory= createAsyncThunk("supportRequest/fetchsupportProjectHistory ", async ({projectId}) => {
    const response = httpRequest(`${BASE_URL}/report/project-support-history/${projectId}`);
    // console.log("support project history: ", response);
    return  response;
});


const supportRequestSlice = createSlice({
    name: "changeRequest",
    initialState,
    extraReducers: (builder) => {
         // fetch all support Request 
         builder.addCase(fetchsupportRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchsupportRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.supportRequest = action.payload?.data.filter((item) => item.isDeleted === false);
            state.error = null;
        });
        builder.addCase(fetchsupportRequest.rejected, (state, action) =>{
            state.loading = false;
            state.supportRequest = [];
            state.error = action.payload?.error?.responseDescription;
        });

        // Create new support Request 
        builder.addCase(createSupportRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createSupportRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.supportRequest.push(action.payload?.data);
            state.error = null;
        });
        builder.addCase(createSupportRequest.rejected, (state, action) =>{
            state.loading = false;
            // state.supportRequest = [];
            state.error = action.payload?.responseDescription;
        });

         // Fetch support project History.
         builder.addCase(fetchsupportProjectHistory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchsupportProjectHistory.fulfilled, (state, action) => {
            state.loading = false;
            state.supportprojectHistory = Array.isArray(action.payload) ? action.payload : [action.payload];
            state.error = null;
        });
        builder.addCase(fetchsupportProjectHistory.rejected, (state, action) => {
            state.loading = false;
            state.supportprojectHistory = [];
            state.error = action.payload?.error?.responseDescription;
        });
    }
});


export default supportRequestSlice.reducer;