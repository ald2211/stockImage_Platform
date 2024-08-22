
import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

const AuthRoute = () => {
  const token=localStorage.getItem('token')

  return !token ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default AuthRoute;
