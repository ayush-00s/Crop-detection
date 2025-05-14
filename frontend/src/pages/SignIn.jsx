import { useState } from "react";
import useAuthStore from "../contexts/store/authStore";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";

export default function SignIn() {
  const login = useAuthStore((state) => state.login); // Zustand login function
  const navigate = useNavigate();
  const { googleLogin } = useAuthStore(); // Google login function

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const handleLogin = async (e) => {
    e.preventDefault();
    setError({});

    try {
      const response = await login(email, password);

      if (!response.success) {
        setError({ general: response.message || "Login failed" });
        return;
      }

      setError({});
      console.log("✅ Login successful! Redirecting...");
      navigate("/Dashboard");
    } catch (error) {
      console.error("❌ Login Error:", error);
      setError({
        general: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#CFE6D0]">
      {/* Login Container */}
      <div className="bg-[#E1F1E7] shadow-2xl rounded-xl p-8 w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Welcome Back!
        </h2>
        <p className="text-gray-600 text-sm mb-6">Login to continue.</p>

        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2AA831] mb-3"
            required
          />

          {/* Password Field */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2AA831] mb-3"
            required
          />

          {error.general && (
            <p className="text-red-500 text-sm">{error.general}</p>
          )}

          {/* Forgot Password */}
          <NavLink
            to="/forgot-password"
            className="text-[#2AA831] text-sm self-start mb-4 block text-right"
          >
            Forgot your password?
          </NavLink>

          {/* Login Button */}
          <button className="w-full bg-[#2AA831] hover:bg-[#5DA134] text-white font-semibold py-2 px-4 rounded-lg transition-all mb-3 cursor-pointer">
            LOGIN
          </button>

          {/* OR Divider */}
          <div className="flex items-center w-full my-3">
            <div className="border-b w-full"></div>
            <span className="mx-2 text-gray-500 text-sm">Or</span>
            <div className="border-b w-full"></div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={googleLogin}
            className="w-full border border-gray-300 flex items-center justify-center gap-2 py-2 px-4 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/09/IOS_Google_icon.png"
              alt="Google"
              className="w-5 h-5"
            />
            LOGIN WITH GOOGLE
          </button>
        </form>

        {/* Signup Redirect */}
        <p className="text-sm text-gray-600 mt-4">
          New to RoboCrop?{" "}
          <NavLink to="/SignUpPage">
            <span className="text-blue-500 cursor-pointer">Sign up</span>
          </NavLink>
        </p>
      </div>
    </div>
  );
}
