import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  // DrawerCloseButton,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setloadDrawer } from "../../redux/slices/drawerSlice";
import { BsArrowLeft } from "react-icons/bs";
import CreateARoleForm from "../CreateARoleForm";
import RolePrivilegesForm from "../RolePrivilegesForm";
import RoleDetails from "../RoleDetails";
import ReportDrawerMain from "../layout/ReportDrawerMain";
import CreateProjectForm from "../layout/CreateProjectForm";
import CreateProjectsDrawer from "../layout/CreateProjectsDrawer";
import EditProjectForm from "../EditProjectForm";
import EditChangeRequestForm from "../layout/EditChangeRequestForm";
import ChangeProjectFormDrawer from "../layout/ChangeProjectFormDrawer";
import ChangeProjectForm from "../layout/ChangeProjectForm";
import SupportProjectForm from "../layout/SupportProjectForm";
import SupportProjectFormDrawer from "../layout/SupportProjectFormDrawer";
import EditSupportProjectForm from "../layout/EditSupportProjectForm";
import ManageClientDetails from "../ManageClientDetails";
import CreateClientForm from "../CreateClientForm";
import CreateLOBForm from "../CreateLOBForm";
import LOBDetails from "../AdminLOBDetalis";
import DevProjectDrawer from "../layout/DevProjectDrawer";
import DevSOPDrawerContainer from "../layout/DevSOPDrawerContainer";
import DevAddNewSOP from "../layout/DevAddNewSOP";
// import StaffLOBDetails from "../StaffLOBDetails";
import CreateUserForm from "../CreateUserForm";
import EditLOBForm from "../EditLOBForm";
import EditClientForm from "../EditClientForm";
import EditSOP from "../layout/EditSOP";
import { clearsearchFilter } from "../../redux/slices/searchFilterSlice";
import LobSOPContainer from "../../screens/LobSOPContainer";

const CustomDrawer = () => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const dispatch = useDispatch();
  const drawer = useSelector((state) => state.drawer.loadDrawer);
  const toggleDrawer = useSelector((state) => state.drawer.toggleDrawer);

  const onClose = () => {
    dispatch(setloadDrawer({ status: false, data: null }));
    dispatch(clearsearchFilter());
  };
  return (
    <>
      <Drawer
        isOpen={drawer?.status}
        placement="right"
        closeOnOverlayClick={false}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        onClose={onClose}
        size={drawer?.size}
      >
        <DrawerOverlay />
        <DrawerContent>
          {/* <DrawerCloseButton /> */}
          {toggleDrawer ? null : (
            <BsArrowLeft
              style={{
                margin: "20px",
                width: "24px",
                height: "24px",
                color: "#292D32",
                cursor: "pointer",
              }}
              onClick={onClose}
            />
          )}

          {drawer?.title && <DrawerHeader>{drawer?.title}</DrawerHeader>}
          <DrawerBody pb={6}>
            {drawer?.type === "projectHistory" ? (
              <ReportDrawerMain others={drawer.others} />
            ) : drawer?.type === "createRole" ? (
              <CreateARoleForm />
            ) : drawer?.type === "rolePrivileges" ? (
              <RolePrivilegesForm />
            ) : drawer?.type === "roleDetails" ? (
              <RoleDetails />
            ) : drawer?.type === "manageClient" ? (
              <ManageClientDetails />
            ) : drawer?.type === "createClient" ? (
              <CreateClientForm />
            ) : drawer?.type === "createLOB" ? (
              <CreateLOBForm />
            ) : drawer?.type === "editClient" ? (
              <EditClientForm />
            ) : drawer?.type === "editLOB" ? (
              <EditLOBForm />
            ) : drawer?.type === "LOBDetails" ? (
              <LOBDetails />
            ) : drawer?.type === "createProject" ? (
              <CreateProjectForm />
            ) : drawer?.type === "editProject" ? (
              <EditProjectForm />
            ) : drawer?.type === "CreateProjectsDrawer" ? (
              <CreateProjectsDrawer />
            ) : drawer?.type === "changeRequest" ? (
              <ChangeProjectForm />
            ) : drawer?.type === "editChangeRequest" ? (
              <EditChangeRequestForm />
            ) : drawer?.type === "changeProjectsDrawer" ? (
              <ChangeProjectFormDrawer />
            ) : drawer?.type === "supportRequest" ? (
              <SupportProjectForm />
            ) : drawer?.type === "editsupportproject" ? (
              <EditSupportProjectForm />
            ) : drawer?.type === "supportDrawer" ? (
              <SupportProjectFormDrawer />
            ) : drawer?.type === "staffLOBDetails" ? (
              // <StaffLOBDetails />
              <LobSOPContainer />
            ) : drawer?.type === "devProjectDrawer" ? (
              <DevProjectDrawer />
            ) : drawer?.type === "devSOPDrawer" ? (
              <DevSOPDrawerContainer />
            ) : drawer?.type === "addNewSOP" ? (
              <DevAddNewSOP />
            ) : drawer?.type === "createNewUser" ? (
              <CreateUserForm />
            ) : drawer?.type === "editSOP" ? (
              <EditSOP />
            ) : null}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CustomDrawer;
