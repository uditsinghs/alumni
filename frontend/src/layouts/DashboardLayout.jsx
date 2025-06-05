import NavButtons from "@/components/NavButtons";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col sm:flex-row min-h-screen">
      {/* Sidebar only on sm and above */}
      <div className="hidden sm:block">
        <Sidebar />
      </div>

      {/* Mobile Top Nav only below sm */}
      <div className="sm:hidden">
        <NavButtons />
      </div>

      {/* Main content area */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
