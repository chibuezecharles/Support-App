import { createSlice } from "@reduxjs/toolkit";

export const searchFilterSlice = createSlice({
    name: 'searchFilter',
    initialState:{
        searchData: "",
        filterData: "",
    },

    reducers:{
        setSearchData: (state, {payload}) =>{
            state.searchData = payload;
        },
        setFilterData: (state, {payload}) =>{
            state.filterData = payload;
        },
        clearsearchFilter: (state) =>{
            state.searchData = "";
            state.filterData = "";
        }
    }
});

export const {setSearchData, setFilterData, clearsearchFilter} = searchFilterSlice.actions;
export default searchFilterSlice.reducer