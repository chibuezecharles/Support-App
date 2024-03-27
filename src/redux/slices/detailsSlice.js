// clientDetailsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const detailsSlice = createSlice({
  name: "detailsSlice",
  initialState: {
    clientDetails: null,
    lobDetails: "",
    editLob: "",
    editClient: "",
    projectDetails: "",
    LobProjectTableDetail:"",
  },
  reducers: {
    setClientDetails: (state, action) => {
      state.clientDetails = action.payload;
    },
    setLobDetails: (state, action) => {
      state.lobDetails = action.payload;
    },
    editLobDetails: (state, action) => {
      state.editLob = action.payload;
    },
    editClientDetails: (state, action) => {
      state.editClient = action.payload;
    },
    setProjectDetails:(state, action)=>{
      // state.
    },
    setLobProjectTableDetail:(state, action)=>{
      state.LobProjectTableDetail = action.payload;
    }
    // clearClientDetails: () => null,
  },
});

export const {
  setClientDetails,
  setLobDetails,
  editLobDetails,
  editClientDetails,
  setLobProjectTableDetail,
} = detailsSlice.actions;
export default detailsSlice.reducer;
