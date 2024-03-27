
import PageWrapper from "./layout/PageWrapper";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const Authenticate = () => {
  const auth = useSelector((state) => state.auth?.user);

  if (!auth) {
    return <Navigate to="/" replace />;
  }

  return <PageWrapper><Outlet /></PageWrapper>;
};

export default Authenticate;
