import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import GoogleLoginButton from "../components/GoogleLoginButton";

const UserLogin = () => {
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
        "http://localhost:8765/api/auth/user/login",
        { email, password },
        { withCredentials: true },
      );

      if (response.status === 200) {
        login("user", response.data.user);
        navigate("/user/home");
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
          <span className="px-4 py-1 text-sm font-semibold bg-green-100 text-green-700 rounded-full">
            USER
          </span>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">User Login</h1>
          <p className="text-gray-500 text-sm mt-1">Sign in to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
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
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:outline-none transition"
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
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-60"
          >
            {loading ? "Signing In..." : "User Sign In"}
          </button>
        </form>

        {/* Google Login */}
        <div className="mt-6">
          <GoogleLoginButton />
        </div>

        {/* Register */}
        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link
            to="/user/register"
            className="text-green-600 font-medium hover:underline"
          >
            Register as User
          </Link>
        </p>

        {/* Divider */}
        <div className="border-t my-6"></div>

        {/* Owner Login */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-3">Owner Login?</p>

          <Link
            to="/owner/login"
            className="block w-full text-center border border-green-600 text-green-600 font-medium py-2 rounded-lg hover:bg-green-50 transition"
          >
            Login as Owner
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
