import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    empty: true,
    changRequeststEmpty: true,
    supportEmpty:true,
};

const emptyStateSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        projectEmptyState : (state) =>{
            state.empty = false;
            state.changRequeststEmpty= true;
            state.supportEmpty=true;
        },
        changeRequestProjectEmptyState : (state) =>{
            state.changRequeststEmpty = false;
            state.empty = true;
            state.supportEmpty=true;
        },
        supportEmptyState : (state) =>{
            state.supportEmpty = false;
            state.empty = true;
            state.changRequeststEmpty= true;
        },
        defaultEmptyState : (state) =>{
            state.supportEmpty = true;
            state.empty = true;
            state.changRequeststEmpty= true;
        },
        
    }
});


export const {projectEmptyState, changeRequestProjectEmptyState,supportEmptyState, defaultEmptyState} = emptyStateSlice.actions;
export default emptyStateSlice.reducer;