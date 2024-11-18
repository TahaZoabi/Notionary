import { Outlet, Navigate } from "react-router-dom";

function PrivateRoutes() {
  const user = false;
  return user ? <Outlet /> : <Navigate to={"/login"} />;
}

export default PrivateRoutes;
