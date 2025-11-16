import axios from "axios";
import React, { use, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/user/login`,
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    setEmail("");
    setPassword("");
    navigate("/");
  };
  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] via-[#111] to-[#1a1a1a] text-white p-4">
      <div className="glow absolute w-80 h-80 blur-3xl  rounded-full bg-blue-700 opacity-40 bottom-0 right-0"></div>

      <div className="w-full max-w-md bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-xl">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <img src="/food.png" alt="Logo" className="w-16 mb-3" />
          <h1 className="text-2xl font-semibold mb-1">Welcome Back</h1>
          <p className="text-gray-400 text-sm text-center mb-6">
            Login to continue ordering your favorite food.
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 text-sm rounded-md bg-white/5 border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 text-sm rounded-md bg-white/5 border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />

          <button
            onClick={handleSubmit}
            className="py-2 bg-blue-600 rounded-md text-sm font-medium hover:bg-blue-700 transition-all shadow-md"
          >
            Login
          </button>

          <a
            href="/foodPartner/register"
            className="text-blue-400 text-sm text-center hover:underline mt-1"
          >
            Become a Food Partner
          </a>

          <p className="text-gray-400 text-sm text-center mt-3">
            Don’t have an account?{" "}
            <a href="/user/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
