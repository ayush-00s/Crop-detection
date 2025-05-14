import React from "react";
import { useNavigate, NavLink } from "react-router";
import useAuthStore from "../contexts/store/authStore";

export default function Signup() {
  const navigate = useNavigate();
  const { googleLogin } = useAuthStore(); // Google login function

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#CFE6D0] relative">
      {/* Background Blur Effect */}
      <div className="absolute inset-0  bg-opacity-30 backdrop-blur-md"></div>

      {/* Signup Container */}
      <div className="relative flex bg-[#E1F1E7] shadow-2xl rounded-xl overflow-hidden w-[80%] max-w-3xl">
        {/* Signup Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Welcome to Robocrop
          </h2>
          <p className="text-gray-600 text-sm mb-6">Get started - it's free.</p>

          {/* ✅ Fix: Use `navigate()` instead of `Navigate()` */}
          <button
            onClick={() => navigate("/SignUpPage")}
            className="w-full bg-[#2AA831] hover:bg-[#5DA134] text-white font-semibold py-2 px-4 rounded-lg transition-all mb-3 cursor-pointer"
          >
            SIGN UP WITH EMAIL
          </button>

          <div className="flex items-center w-full my-3">
            <div className="border-b w-full"></div>
            <span className="mx-2 text-gray-500 text-sm">Or</span>
            <div className="border-b w-full"></div>
          </div>

          <button
            onClick={googleLogin}
            className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-100 transition-all mb-3 cursor-pointer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
              alt="Google"
              className="w-5 h-5"
            />
            SIGN UP WITH GOOGLE
          </button>

          <p className="text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <NavLink to="/login">
              <span className="text-blue-500 cursor-pointer">Log in</span>
            </NavLink>
          </p>
        </div>

        {/* Right Side */}
        <div className="hidden md:block w-1/2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      </div>
    </div>
  );
}
