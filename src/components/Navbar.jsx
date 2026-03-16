import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, owner, logout, role } = useAuth();
  const navigate = useNavigate();

  const isAuth = !!user || !!owner;

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent animate-pulse"
          >
            Rajesh Masala
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              to="/products"
              className="relative font-semibold text-gray-700 hover:text-orange-600 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Products
            </Link>

            <Link
              to="/about"
              className="relative font-semibold text-gray-700 hover:text-orange-600 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="relative font-semibold text-gray-700 hover:text-orange-600 transition duration-300 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              Contact
            </Link>

            {/* Auth Buttons */}
            {isAuth ? (
              <>
                <Link
                  to={role === "user" ? "/user/home" : "/owner/dashboard"}
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  {role === "user" ? "User Dashboard" : "Owner Dashboard"}
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-5 py-2 bg-red-500 text-white rounded-xl font-medium shadow-md hover:bg-red-600 hover:scale-105 transition-all duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/user/login"
                  className="px-5 py-2 border border-orange-500 text-orange-600 rounded-xl font-medium hover:bg-orange-500 hover:text-white transition-all duration-300"
                >
                  User Login
                </Link>

                <Link
                  to="/owner/login"
                  className="px-5 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-medium shadow-md hover:scale-105 hover:shadow-xl transition-all duration-300"
                >
                  Owner Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
