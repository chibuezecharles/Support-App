import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config/settings";
import httpRequest from "../../utils/httpRequest";


const initialState = {
    user: null,
    loading: false,
    error: null
};
export const getProfile = createAsyncThunk("profile/getProfile", async (userId) => {
    return httpRequest(`${BASE_URL}/users/view-users?userid=${userId}`, "get");
});

const profileSlice = createSlice({
    name: "profile",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getProfile.pending, state => {
            state.loading = true;
        });
        builder.addCase(getProfile.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.user = payload.data;
            // console.log(payload)

        });
        builder.addCase(getProfile.rejected, (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            // console.log(payload)


        })



    }

});

export default profileSlice.reducer;
