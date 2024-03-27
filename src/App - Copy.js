import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./screens/AdminDashboard";
import Authenticate from "./components/Authenticate";
import { extendTheme, ChakraBaseProvider } from "@chakra-ui/react";
import Login from "./screens/Login";
import Reports from "./screens/Reports";
import Profile from "./screens/Profile";
import Notification from "./screens/Notification";
import CustomDrawer from "./components/drawers/CustomDrawer";
import RoleManagement from "./screens/RoleManagement";
import AdminLineOfBusiness from "./screens/AdminLineOfBusiness";
import Projects from "./screens/Projects";
import StaffProfile from "./screens/StaffProfile";
import DevProfile from "./screens/DevProfile";
import DevProject from "./screens/DevProject";
import { useSelector } from "react-redux";
import StaffDashboard from "./screens/StaffDashboard";
import StaffLineOfBusiness from "./screens/StaffLineOfBusiness";
import DevDashboard from "./screens/DevDashboard";
import ActivateUser from "./screens/ActivateUser";
import ResetPassword from "./screens/ResetPassword";
import ForgotPassword from "./screens/ForgotPassword";
import UserRoleManagement from "./screens/UserRoleManagement";

const theme = extendTheme({
  fonts: {
    heading: `'DaxlinePro', sans-serif`,
    body: `'DaxlinePro', sans-serif`,
  },
  colors: {
    brand: {
      primary: "#005E39",
    },
  },
  Table: {
    variants: {
      striped: {
        tbody: {
          "tr:nth-child(odd)": {
            bg: "#F5FFFB",
          },
        },
      },
    },
  },
});

const App = () => {
  const userRole = useSelector((state) => state.auth.user?.roleName);

  const getDashboard = () => {
    let DASHBOARD;
    if (userRole === "Super Admin") DASHBOARD = <AdminDashboard />;
    if (userRole === "admin") DASHBOARD = <AdminDashboard />;
    if (userRole === "dev") DASHBOARD = <DevDashboard />;
    if (userRole === "staff") DASHBOARD = <StaffDashboard />;
    return DASHBOARD;
  };
  const getLineOfBusiness = () => {
    let LOB;
    if (userRole === "Super Admin") LOB = <AdminLineOfBusiness />;
    if (userRole === "admin") LOB = <AdminLineOfBusiness />;
    if (userRole === "staff") LOB = <StaffLineOfBusiness />;
    return LOB;
  };

  return (
    <ChakraBaseProvider theme={theme}>
      <CustomDrawer />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/activate-account/:userId" element={<ActivateUser />} />
        <Route path="/reset-password" element={<ResetPassword />} />
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
