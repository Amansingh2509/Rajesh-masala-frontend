import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, owner, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const isAuthenticated = !!user || !!owner;
  const currentRole = user ? "user" : owner ? "owner" : null;

  if (!isAuthenticated) {
    return <Navigate to="/user/login" replace />;
  }

  // Allow owners too for products page
  if (allowedRole === "user" && currentRole === "owner") {
    return children;
  }

  if (allowedRole && currentRole !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
