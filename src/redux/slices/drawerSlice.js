import { createSlice } from "@reduxjs/toolkit";



export const drawerSlice = createSlice({
    name: 'drawer',
    initialState:{
        loadDrawer:{
            status: false,
            title: "",
            type: "",
            others:"",
            data: null,
            size: ['md', 'lg', 'xl'],
        },
        toggleDrawer:false,
        drawer2Data: "",
    },

    
    reducers:{
        setloadDrawer: (state, {payload}) =>{
            state.loadDrawer = {
                status: payload.status,
                title: payload.title,
                type: payload.type,
                others: payload.others,
                // showCloseButton: payload?.showCloseButton,
                data: payload.data,
                size: payload?.size || ['xs', 'sm', 'md', 'lg', 'xl'],
            };
        },
        drawer2loader: (state, action) =>{
            state.drawer2Data = action.payload;
        },
        drawerToggle: (state) =>{
            state.toggleDrawer = !state.toggleDrawer;
        }


    }
});

export const {setloadDrawer, drawerToggle, drawer2loader,} = drawerSlice.actions;
export default drawerSlice.reducer;