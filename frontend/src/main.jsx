import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import App from "./layout/App.jsx";
import Home from "./pages/Home.jsx";
import Signup from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import SignUpPage from "./components/SignUpPage.jsx";

import useAuthStore from "./contexts/store/authStore";
import Dashboard from "./pages/Dashboard";
import DashboardData from "./pages/DashboardData";
import TabsNavigation from "./components/TabsNavigation";
import WeedManagement from "./pages/WeedManagement";
import FieldMonitoring from "./pages/FieldMonitoring";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="SignUp" element={<Signup />} />
      <Route path="login" element={<SignIn />} />
      <Route path="SignUpPage" element={<SignUpPage />} />
      <Route path="Dashboard" element={<Dashboard />} />
      <Route path="DashboardData" element={<DashboardData />} />
      <Route path="TabsNavigation" element={<TabsNavigation />} />
      <Route path="WeedManagement" element={<WeedManagement />} />
      <Route path="FieldMonitoring" element={<FieldMonitoring />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
