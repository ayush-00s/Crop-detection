import { useState } from "react";
import useAuthStore from "../contexts/store/authStore";
import { useNavigate } from "react-router";

export default function Signup(isOpen, setIsOpen) {
  const signup = useAuthStore((state) => state.signup); // Zustand signup function
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrors({});
    try {
      const { firstName, lastName, email, password } = formData; // Destructure form data
      const result = await signup(firstName, lastName, email, password);

      if (!result.success) {
        setErrors(
          result.errors || {
            general: result.message || "Signup failed. Try again.",
          }
        );
        return;
      }
      console.log("✅ Signup successful! Redirecting...");
      navigate("/Dashboard"); // Redirect after successful signup
    } catch (error) {
      console.error("Signup Error:", error);
      setErrors({ general: "An unexpected error occurred. Please try again." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#CFE6D0] relative">
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-opacity-30 backdrop-blur-md"></div>

      {/* Signup Container */}
      <div className="relative flex bg-[#E1F1E7] shadow-2xl rounded-xl overflow-hidden w-[90%] max-w-3xl">
        {/* Left - Signup Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Welcome to RoboCrop
          </h2>
          <p className="text-gray-600 text-sm mb-6">Get started - it's free.</p>

          <form className="w-full flex flex-col gap-4" onSubmit={handleSignup}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2AA831]"
              required
            />

            {errors.firstName && (
              <p className="text-red-500 text-sm">{errors.firstName}</p>
            )}

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2AA831]"
              required
            />

            {errors.lastName && (
              <p className="text-red-500 text-sm">{errors.lastName}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2AA831]"
              required
            />

            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2AA831]"
              required
            />
            {errors.password &&
              errors.password.map((errMsg, index) => (
                <p key={index} className="text-red-500 text-sm">
                  {errMsg}
                </p>
              ))}

            {errors.general && (
              <p className="text-red-500 text-center">{errors.general}</p>
            )}

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full bg-[#2AA831] hover:bg-[#5DA134] text-white font-semibold py-2 px-4 rounded-lg transition-all cursor-pointer"
            >
              SIGN UP
            </button>
          </form>

          {/* Already have an account? */}
          <p className="text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-500 cursor-pointer"
            >
              Log in
            </span>
          </p>
        </div>

        {/* Right Side - Gradient Background */}
        <div className="hidden md:block w-1/2 bg-gradient-to-r from-green-500 to-[#2AA831]"></div>
      </div>
    </div>
  );
}
