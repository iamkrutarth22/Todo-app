import { useSelector } from "react-redux";
import type { IAuth } from "../models/Auth";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const accessToken = useSelector(
    (state: { auth: IAuth }) => state.auth.accessToken
  );

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
