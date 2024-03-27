import { createSlice } from "@reduxjs/toolkit";


export const toastSlice = createSlice({
    name:'toast',
    initialState:{
        loadToast:{
            title: "",
            description: "",
            status: "success",
            duration: 9000,
            isClosable: true,
            position: "top",
        }
    },

    reducers: {
        setloadTost: (state, {payload}) =>{
            state.loadToast = {
                title : payload.title,
                description : payload.description,
                status : payload.status,
                duration : payload.duration,
                isClosable : payload.isClosable,
                position : payload.position,
            }
        }
    },
});

export const {setloadTost} = toastSlice.actions;
export default toastSlice.reducer;