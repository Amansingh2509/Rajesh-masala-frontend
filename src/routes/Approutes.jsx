import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import UserLogin from "../pages/UserLogin";
import UserRegister from "../pages/UserRegister";
import OwnerLogin from "../pages/OwnerLogin";
import OwnerRegister from "../pages/OwnerRegister";
import UserHome from "../pages/UserHome";
import CreateItemOwner from "../item-owner/createitemowner";
import ProtectedRoute from "../components/ProtectedRoute";
import OwnerDashboard from "../pages/OwnerDashboard";
import About from "../pages/About";
import Contact from "../pages/Contact";
import CartPage from "../pages/CartPage";
import Products from "../pages/Products";

const Approutes = () => {
  return (
    <Routes>
      <Route path="/contact" element={<Contact />} />
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/products"
        element={
          <ProtectedRoute allowedRole="user">
            <Products />
          </ProtectedRoute>
        }
      />
      <Route path="/user/login" element={<UserLogin />} />
      <Route path="/user/register" element={<UserRegister />} />
      <Route path="/owner/login" element={<OwnerLogin />} />
      <Route path="/owner/register" element={<OwnerRegister />} />

      <Route
        path="/user/home"
        element={
          <ProtectedRoute allowedRole="user">
            <UserHome />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/owner/dashboard"
        element={
          <ProtectedRoute allowedRole="owner">
            <OwnerDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default Approutes;
