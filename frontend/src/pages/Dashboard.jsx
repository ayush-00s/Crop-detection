
import React, { useState } from "react";
import TabsNavigation from "../components/TabsNavigation";
import FieldMonitoring from "./FieldMonitoring";
import WeedManagement from "./WeedManagement";
import DashboardData from "./DashboardData";

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState("Dashboard");

  return (
    <div className="min-h-screen bg-gray-200 flex">
      <TabsNavigation onSelect={setSelectedTab} />

      {/* Add margin-left to offset sidebar width */}
      <div className="flex-1 ml-16 md:ml-64 p-6 md:p-10">
        {selectedTab === "Dashboard" && <DashboardData/>}

        {selectedTab === "Field Monitoring" && <FieldMonitoring/>}

        {selectedTab === "Weed Management" && <WeedManagement/>}

        {selectedTab === "Marketplace" && (
          <div className="mt-6">
            <h1 className="text-2xl font-bold mb-6">Marketplace</h1>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-bold mb-2">Agricultural Products</h2>
              <p>Browse and purchase quality agricultural supplies and equipment.</p>
              <div className="mt-4 flex gap-4 flex-col sm:flex-row">
                <button className="bg-green-500 px-6 py-2 text-white rounded-full text-lg font-medium hover:bg-green-600 transition">
                  Browse Products
                </button>
                <button className="bg-gray-200 px-6 py-2 text-gray-800 rounded-full text-lg font-medium hover:bg-gray-300 transition">
                  Sell Items
                </button>
              </div>
            </div>
          </div>
        )}

        {selectedTab === "Settings" && (
          <div className="mt-6">
            <h1 className="text-2xl font-bold mb-6">Settings</h1>
            <div className="p-6 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-bold mb-2">Account Preferences</h2>
              <p>Manage your account settings and notification preferences.</p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <button className="bg-green-500 px-6 py-3 text-white rounded-full text-lg font-medium hover:bg-green-600 transition">
                  Profile Settings
                </button>
                <button className="bg-gray-400 px-6 py-3 text-white rounded-full text-lg font-medium hover:bg-gray-500 transition">
                  Notification Preferences
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
