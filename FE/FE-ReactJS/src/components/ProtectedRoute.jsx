import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isLoggedIn = localStorage.getItem("isLogin");

  return isLoggedIn === "true" ? <Outlet /> : <Navigate to="/auth" />;
};

export default ProtectedRoute;