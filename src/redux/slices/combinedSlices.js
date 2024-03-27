import { combineReducers } from "redux";
import authSlice from "./authSlice";
import usersSlice from "./usersSlice";
import drawerSlice from "./drawerSlice";
import emptyStateSlice from "./emptyStateSlice";
import projectSlice from "./projectSlice";
import rolesSlice from "./rolesSlice";
import newProject from "./newProjectSlice";
import changeRequest from "./changeRequestSlice";
import supportRequest from "./supportRequestSlice";
import projectComments from "./projectCommentSlice";
import sopSlice from "./sopSlice";
import lobSlice from "./lobSlice";
import clientSlice from "./clientSlice";
import detailsReducer from "./detailsSlice";
import reportActions from "./reportActions";
import profileSlice from "./profileSlice";
import reportSlice from "./reportSlice";
import toastSlice from "./toastSlice";
import searchFilterSlice from "./searchFilterSlice";


const combinedSlices = combineReducers({
  auth: authSlice,
  users: usersSlice,
  roles: rolesSlice,
  drawer: drawerSlice,
  emptyState: emptyStateSlice,
  projectSlice: projectSlice,
  newProject: newProject,
  changeRequest: changeRequest,
  supportRequest: supportRequest,
  projectComments: projectComments,
  sop: sopSlice,
  lobSlice: lobSlice,
  clientSlice: clientSlice,
  detailsSlice: detailsReducer,
  profile: profileSlice,
  report: reportSlice,
  reportActions: reportActions,
  toast : toastSlice,
  searchFilter: searchFilterSlice,
});

export default combinedSlices;
