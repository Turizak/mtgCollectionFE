import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes() {
  const auth = localStorage.getItem("token");
  return auth ? <Outlet /> : <Navigate to="/" />;
}

export default PrivateRoutes;
