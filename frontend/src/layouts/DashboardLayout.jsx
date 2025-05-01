// src/layouts/DashboardLayout.jsx
import Sidebar from "@/components/Sidebar";
// import StatsSection from "@/pages/homePage/StatsSection";
import React from "react";
import { Outlet } from "react-router-dom";


const DashboardLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <Outlet />
      
      </main>
    </div>
  );
};

export default DashboardLayout;
