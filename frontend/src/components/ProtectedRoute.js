import React from "react";
import { Navigate, Outlet } from "react-router-dom";
export const ProtectedRoute = (props) => {
  const { loggedIn, children } = props;

  if (!loggedIn) {
    return <Navigate to="/signin" replace />;
  }
  return children? children : <Outlet />;
};
