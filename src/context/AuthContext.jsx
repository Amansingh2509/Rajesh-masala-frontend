import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE } from "../utils/api.js";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [owner, setOwner] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: userData } = await axios.get(
        `${API_BASE}/api/auth/profile`,
        { withCredentials: true },
      );
      setUser(userData);
    } catch {
      try {
        const { data: ownerData } = await axios.get(
          `${API_BASE}/api/auth/ownerprofile`,
          { withCredentials: true },
        );
        setOwner(ownerData);
      } catch {
        // Invalid token
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (userType, data) => {
    if (userType === "user") {
      setUser(data);
    } else {
      setOwner(data);
    }
    await checkAuth();
  };

  const logout = async () => {
    try {
      await axios.post(
        `${API_BASE}/api/auth/logout`,
        {},
        { withCredentials: true },
      );
    } catch (err) {
      console.log("Logout API call ignored (normal):", err.response?.status);
    }
    // Always clear frontend state
    setUser(null);
    setOwner(null);
    navigate("/");
  };

  const value = {
    user,
    owner,
    login,
    logout,
    loading,
    isAuthenticated: !!user || !!owner,
    role: user ? "user" : owner ? "owner" : null,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
