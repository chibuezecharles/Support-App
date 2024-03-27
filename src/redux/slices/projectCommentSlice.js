import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpRequest from "../../utils/httpRequest";
import { BASE_URL } from "../../config/settings";

const initialState = {
    projectComments:[],
    loading: false,
    error: null,
    empty: true,
};


export const fetchProjectComment= createAsyncThunk("projectComment/fetchProjectComment ", async (arg) => {
    const response = httpRequest(`${BASE_URL}/comment/get-comment-by-projecttype-and-id`, "post", arg );
    console.log("project comments: ", response);
    return  response;
});

export const createProjectComment = createAsyncThunk("projectComment/createProjectComment", async (arg) => {
    const response = httpRequest(`${BASE_URL}/comment/add-project-comment`, "post", arg );
    console.log("create comments: ", response);
    return response;
});



const projectCommentSlice = createSlice({
    name: "changeRequest",
    initialState,
    extraReducers: (builder) => {
        // fetch project comments 
        builder.addCase(fetchProjectComment.pending, (state) => {
           state.loading = true;
       });
       builder.addCase(fetchProjectComment.fulfilled, (state, action) => {
           state.loading = false;
           state.projectComments =  state.projectComments = Array.isArray(action.payload?.data)
           ? action.payload.data
           : [action.payload?.data];
           state.error = null;
       });
       builder.addCase(fetchProjectComment.rejected, (state, action) =>{
           state.loading = false;
           state.projectComments = [];
           state.error = action.payload?.error?.responseDescription;
       });

       // Create project comment 
       builder.addCase(createProjectComment.pending, (state) => {
           state.loading = true;
       });
       builder.addCase(createProjectComment.fulfilled, (state, action) => {
           state.loading = false;
           state.projectComments = action.payload?.data;
           state.error = null;
       });
       builder.addCase(createProjectComment.rejected, (state, action) =>{
           state.loading = false;
           state.projectComments = [];
           state.error = action.payload?.error?.responseDescription;
       });
   }
});





export default projectCommentSlice.reducer;