import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import UserLogin from "./UserLogin";
import ProtectedRoute from "../components/ProtectedRoute";

const About = () => {
  const { user, owner, isAuthenticated, logout } = useAuth();

  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState(null);

  const [editMode, setEditMode] = useState(false);
  const [changePassMode, setChangePassMode] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    address: "",
  });

  const [passData, setPassData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const API = "http://localhost:8765";

  // Load profile
  useEffect(() => {
    if (user || owner) {
      const data = user || owner;

      setProfile(data);
      setRole(user ? "user" : "owner");

      setFormData({
        fullname: data.fullname || "",
        phone: data.phone || "",
        address: data.address || "",
      });
    }
  }, [user, owner]);

  // Auto clear message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Update profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint =
        role === "user" ? "/api/auth/profile" : "/api/auth/ownerprofile";

      const res = await axios.put(`${API}${endpoint}`, formData, {
        withCredentials: true,
      });

      setProfile(res.data.profile);
      setEditMode(false);
      setMessage("Profile updated successfully!");
    } catch {
      setMessage("Error updating profile");
    }

    setLoading(false);
  };

  // Change password
  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passData.newPassword !== passData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const endpoint =
        role === "user"
          ? "/api/auth/change-password"
          : "/api/auth/owner-change-password";

      await axios.post(`${API}${endpoint}`, passData, {
        withCredentials: true,
      });

      setPassData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      setChangePassMode(false);
      setMessage("Password changed successfully!");
    } catch (err) {
      setMessage(err?.response?.data?.message || "Error changing password");
    }

    setLoading(false);
  };

  if (!isAuthenticated) return <UserLogin />;
  if (!profile) return <div>Loading profile...</div>;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
        {/* HERO SECTION */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/images/pexels-riki-lifestyle-77353139-8649386.jpg')] bg-cover bg-center opacity-20"></div>

          <div className="relative z-10 py-24 px-4 text-center">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Rajesh Masala Agency
            </h1>

            <p className="text-xl mt-4 text-gray-700">
              Premium Wholesale Masala & Grocery Supplier
            </p>

            <div className="mt-6 bg-white/70 backdrop-blur-md rounded-2xl p-4 inline-block shadow">
              <p className="font-semibold">{profile.fullname}</p>
              <p className="text-sm text-gray-600">
                {role === "owner" ? "Owner Account" : "User Account"}
              </p>
            </div>
          </div>
        </div>

        {/* MAIN SECTION */}
        <div className="-mt-16 max-w-6xl mx-auto px-4 py-12 grid lg:grid-cols-2 gap-10">
          {/* PROFILE */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold mb-6">Profile Information</h2>

            {!editMode ? (
              <>
                <p>
                  <b>Name:</b> {profile.fullname}
                </p>
                <p>
                  <b>Phone:</b> {profile.phone}
                </p>
                <p>
                  <b>Address:</b> {profile.address}
                </p>

                <button
                  onClick={() => setEditMode(true)}
                  className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg"
                >
                  Edit Profile
                </button>
              </>
            ) : (
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <input
                  type="text"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Full Name"
                />

                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Phone"
                />

                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  placeholder="Address"
                />

                <div className="flex gap-3">
                  <button className="flex-1 bg-green-600 text-white py-2 rounded">
                    Save
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditMode(false)}
                    className="flex-1 bg-gray-500 text-white py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* SECURITY */}
          <div className="bg-white p-8 rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold mb-6">Security</h2>

            {!changePassMode ? (
              <>
                <button
                  onClick={() => setChangePassMode(true)}
                  className="w-full bg-orange-600 text-white py-2 rounded-lg"
                >
                  Change Password
                </button>

                {message && (
                  <div className="mt-4 p-2 bg-green-100 rounded">{message}</div>
                )}
              </>
            ) : (
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={passData.currentPassword}
                  onChange={(e) =>
                    setPassData({
                      ...passData,
                      currentPassword: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                />

                <input
                  type="password"
                  placeholder="New Password"
                  value={passData.newPassword}
                  onChange={(e) =>
                    setPassData({
                      ...passData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={passData.confirmPassword}
                  onChange={(e) =>
                    setPassData({
                      ...passData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                />

                <div className="flex gap-3">
                  <button className="flex-1 bg-orange-600 text-white py-2 rounded">
                    Update
                  </button>

                  <button
                    type="button"
                    onClick={() => setChangePassMode(false)}
                    className="flex-1 bg-gray-500 text-white py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            <button
              onClick={logout}
              className="w-full mt-6 bg-red-600 text-white py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default About;
