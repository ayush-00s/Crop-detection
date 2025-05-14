import React from "react";
// import Navbar from "../components/Navbar";
// import { Outlet } from "react-router";
import useAuthStore from "../contexts/store/authStore";
import { useEffect } from "react";
import Home from "../pages/Home";
import SignIn from "../pages/SignIn";
import Signup from "../pages/SignUp";
import SignUpPage from "../components/SignUpPage";
import { Outlet } from "react-router-dom";

export default function App() {
  const { checkAuth, loading } = useAuthStore(); // Get Zustand actions/state
  useEffect(() => {
    const fetchAuth = async () => {
      await checkAuth();
    };
    fetchAuth();
  }, [checkAuth]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  return (
    <>
     <Outlet/>
    </>
  );
}
