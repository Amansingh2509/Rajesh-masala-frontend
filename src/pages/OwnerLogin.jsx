import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const OwnerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8765/api/auth/owner/login",
        { email, password },
        { withCredentials: true },
      );

      if (response.status === 200) {
        login("owner", response.data.owner);
        navigate("/owner/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Badge */}
        <div className="flex justify-center mb-4">
          <span className="px-4 py-1 text-sm font-semibold bg-indigo-100 text-indigo-700 rounded-full">
            OWNER
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Owner Login</h1>
          <p className="text-gray-500 text-sm mt-1">Access your dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Owner Email
            </label>

            <input
              type="email"
              placeholder="Enter owner email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="text-sm text-red-500 bg-red-50 border border-red-200 p-2 rounded">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Owner Sign In"}
          </button>
        </form>

        {/* Register */}
        <p className="text-sm text-center text-gray-500 mt-6">
          New Owner?{" "}
          <Link
            to="/owner/register"
            className="text-indigo-600 font-medium hover:underline"
          >
            Register Owner Account
          </Link>
        </p>

        {/* Divider */}
        <div className="border-t my-6"></div>

        {/* User Login */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-3">User Login?</p>

          <Link
            to="/user/login"
            className="block w-full text-center border border-indigo-600 text-indigo-600 font-medium py-2 rounded-lg hover:bg-indigo-50 transition"
          >
            Login as User
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OwnerLogin;
