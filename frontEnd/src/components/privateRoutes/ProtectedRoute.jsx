
import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../../context/userContext";

const ProtectedRoute = () => {
  const token=localStorage.getItem('token')

  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
