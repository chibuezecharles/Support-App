import { ChakraBaseProvider } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Authenticate from "./components/Authenticate";
import CustomDrawer from "./components/drawers/CustomDrawer";
import ActivateUser from "./screens/ActivateUser";
import AdminDashboard from "./screens/AdminDashboard";
import AdminLineOfBusiness from "./screens/AdminLineOfBusiness";
import DevDashboard from "./screens/DevDashboard";
import DevProfile from "./screens/DevProfile";
import DevProject from "./screens/DevProject";
import ForgotPassword from "./screens/ForgotPassword";
import Login from "./screens/Login";
import Notification from "./screens/Notification";
import Profile from "./screens/Profile";
import Projects from "./screens/Projects";
import Reports from "./screens/Reports";
import ResetPassword from "./screens/ResetPassword";
import RoleManagement from "./screens/RoleManagement";
import StaffDashboard from "./screens/StaffDashboard";
import StaffLineOfBusiness from "./screens/StaffLineOfBusiness";
import StaffProfile from "./screens/StaffProfile";
import UserRoleManagement from "./screens/UserRoleManagement";
import CustomToast from "./components/layout/CustomToast";
import theme from "./theme";

const App = () => {
  const userRole = useSelector((state) => state.auth.user?.roleName);
  const userRole2= useSelector((state) => state.auth.user);
  console.log(userRole2);
  const getDashboard = () => {
    let DASHBOARD;
    if (userRole === "Super Admin") DASHBOARD = <AdminDashboard />;
    if (userRole === "admin") DASHBOARD = <AdminDashboard />;
    if (userRole === "Developer") DASHBOARD = <DevDashboard />;
    if (userRole === "Other Staff") DASHBOARD = <StaffDashboard />;
    return DASHBOARD;
  };
  const getLineOfBusiness = () => {
    let LOB;
    if (userRole === "Super Admin") LOB = <AdminLineOfBusiness />;
    if (userRole === "admin") LOB = <AdminLineOfBusiness />;
    if (userRole === "Other Staff") LOB = <StaffLineOfBusiness />;
    return LOB;
  };

  return (
    <ChakraBaseProvider theme={theme}>
      <CustomDrawer />
      <CustomToast />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/activate-account/:userId" element={<ActivateUser />} />
        <Route path="/change-password/:userId" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route element={<Authenticate />}>
          <Route exact path="dashboard" element={getDashboard()} />
          <Route exact path="role-management" element={<RoleManagement />} />
          <Route
            exact
            path="user-role-management"
            element={<UserRoleManagement />}
          />
          <Route exact path="line-of-business" element={getLineOfBusiness()} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/dev-projects" element={<DevProject />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dev-profile" element={<DevProfile />} />
          <Route path="/staff-profile" element={<StaffProfile />} />
          <Route path="/profile/notification" element={<Notification />} />
        </Route>
      </Routes>
    </ChakraBaseProvider>
  );
};

export default App;
