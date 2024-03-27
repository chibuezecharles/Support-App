import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import httpRequest from "../../utils/httpRequest";
import { BASE_URL } from "../../config/settings";

const initialState = {
    allProjects:[],
    projects: [],
    loading: false,
    error: null,
    empty: true,
    lob: [],
    developers:[],
    otherStaff: [],
    projectHistory: [],
    clients: [],
    allUsers: [],
}

export const fetchAllUsers = createAsyncThunk("newProject/fetchAllUsers", async () => {
      const response = httpRequest(`${BASE_URL}/users/view-all-users`);
    // console.log("all users found", response);
      return response ;
});

export const fetchLOB = createAsyncThunk("newProject/fetchLOB", async () => {
    const response = httpRequest(`${BASE_URL}/lob/view-all-lob`);
    // console.log("LOB: ", response);
    return response ;
});

export const fetchUsersByRole = createAsyncThunk("newProject/fetchUsersByRole", async (rolename) => {
    const response = httpRequest(`${BASE_URL}/users/view-user-by-role?rolename=${rolename}`);
    // console.log("users by role name", response);
    return response ;
});

export const fetchClients = createAsyncThunk("newProject/fetchClients", async () => {
    const response = httpRequest(`${BASE_URL}/manageclient/view-all-clients`);
    // console.log("all Clients", response);
    return response ;
});

export const fetchProjectHistory= createAsyncThunk("newProject/fetchProjectHistory ", async ({projectId,}) => {
    const response = httpRequest(`${BASE_URL}/report/project-history/${projectId}`);
    // console.log("project history: ", response);
    return  response;
});

export const fetchNewProject = createAsyncThunk("newProject/fetchNewProject ", async () => {
     const response = httpRequest(`${BASE_URL}/project/view-all-projects/NewProject`);
    //  console.log("all new projects", response);
     return  response;
});

export const createProject = createAsyncThunk("newProject/createProject", async (arg, { rejectWithValue }) => {
   try {
    const response = await httpRequest(`${BASE_URL}/project/create-project`, "post", arg );
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

const newProjectSlice = createSlice({
    name: "newProject",
    initialState,
    extraReducers: (builder) => {
         // fetch all Users
         builder.addCase(fetchAllUsers.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.allUsers= action.payload?.data;
            state.error = null;
        });
        builder.addCase(fetchAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.allUsers = [];
            state.error = action.payload?.error?.responseDescription;
        });

        // get LOB
        builder.addCase(fetchLOB.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchLOB.fulfilled, (state, action) => {
            state.loading = false;
            state.lob = action.payload?.data;
            state.error = null;
        });
        builder.addCase(fetchLOB.rejected, (state, action) => {
            state.loading = false;
            state.lob = [];
            state.error = action.payload?.error?.responseDescription;
        });

        // Fetch users by role
        builder.addCase(fetchUsersByRole.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUsersByRole.fulfilled, (state, action) => {
            state.loading = false;
            const roleName = action.meta.arg;
            if (roleName === "developer") {
                state.developers = action.payload?.data;
            } else if (roleName === 'Other Staff') {
                state.otherStaff = action.payload?.data;
            }
            state.error = null;
        });
        builder.addCase(fetchUsersByRole.rejected, (state, action) => {
            state.loading = false;
            state.usersByRole = [];
            state.error = action.payload?.error?.responseDescription;
        });

         // Fetch All Clients
         builder.addCase(fetchClients.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchClients.fulfilled, (state, action) => {
            state.loading = false;
            state.clients = action.payload?.data;
            state.error = null;
        });
        builder.addCase(fetchClients.rejected, (state, action) => {
            state.loading = false;
            state.clients = [];
            state.error = action.payload?.error?.responseDescription;
        });

        // Fetch project History.
        builder.addCase(fetchProjectHistory.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchProjectHistory.fulfilled, (state, action) => {
            state.loading = false;
            state.projectHistory = Array.isArray(action.payload) ? action.payload : [action.payload];
            state.error = null;
        });
        builder.addCase(fetchProjectHistory.rejected, (state, action) => {
            state.loading = false;
            state.projectHistory = [];
            state.error = action.payload?.error?.responseDescription;
        });
       
       // Fetch all new projects
        builder.addCase(fetchNewProject.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchNewProject.fulfilled, (state, action) => {
            state.loading = false;
            state.projects = action.payload?.data.filter((item) => item?.isDeleted === false);
            state.error = null;
        });
        builder.addCase(fetchNewProject.rejected, (state, action) => {
            state.loading = false;
            state.projects = [];
            state.error = action.payload?.error?.responseDescription;
        });

        // Create new project
        builder.addCase(createProject.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(createProject.fulfilled, (state, action) => {
            state.loading = false;
            state.projects.push(action.payload?.data);
            // console.log("action dot payload",action.payload)
            state.error = null;
        });
        builder.addCase(createProject.rejected, (state, action) =>{
            state.loading = false;
            state.error = action.payload?.responseDescription;
            // console.log(action.payload?.responseDescription);
        });

    }

});





export default newProjectSlice.reducer;