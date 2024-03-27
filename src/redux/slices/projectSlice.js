import { createSlice, } from "@reduxjs/toolkit";

const initialState = {
    editData: '',
    changeRequestEditData: "",
    supportEditData:"",
    changeRequestData: "",
    supportProjectData:"",
    newProjectData: "",
    devprojectData: "",
    editDevprojectData: "",
    devProjectSOPData:"",
    editDevProjectSOPData:"",
};

export const projectSlice = createSlice({
    name:'projectslices',
    initialState,
    reducers:{
        newProjectDataloader: (state, action) =>{
            state.newProjectData = action.payload;
        },
        devprojectDataloader: (state, action) =>{
            state.devprojectData = action.payload;
        },
        editDevprojectDataloader: (state, action) =>{
            state.editDevprojectData = action.payload;
        },
        devProjectSOPDataloader: (state, action) =>{
            state.devProjectSOPData = action.payload;
        },
        editDevProjectSOPDataloader: (state, action) =>{
            state.editDevProjectSOPData = action.payload;
        },
        editDataloader: (state, action) =>{
            state.editData = action.payload;
        },
        changeRequestEditDataloader: (state, action) =>{
            state.changeRequestEditData = action.payload;
        },
        supportEditDataloader: (state, action) =>{
            state.supportEditData = action.payload;
        },
        changeRequestDataloader: (state, action) =>{
            state.changeRequestData = action.payload;
        },
        supportProjectDataloader: (state, action) =>{
            state.supportProjectData = action.payload;
        },
      
        
        
    }
});

export const {devProjectSOPDataloader,editDataloader,supportEditDataloader,changeRequestDataloader,supportProjectDataloader, newProjectDataloader, changeRequestEditDataloader, devprojectDataloader, editDevprojectDataloader, editDevProjectSOPDataloader}= projectSlice.actions;
export default projectSlice.reducer;

