// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  const adminLinks = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/events", label: "Manage Events" },
    { to: "/admin/users", label: "Manage Users" },
  ];

  const alumniLinks = [
    { to: "/alumni/dashboard", label: "Dashboard" },
    { to: "/alumni/manageposts", label: "Manage Posts" },
    { to: "/alumni/managejobs", label: "Manage Jobs" },
  ];

  const linksToShow = role === "admin" ? adminLinks : alumniLinks;

  return (
    <aside className="w-64 bg-gray-100 h-screen p-4 shadow">
      <h2 className="text-xl font-semibold mb-4">Dashboard</h2>
      <nav className="flex flex-col gap-2">
        {linksToShow.map((link) => (
          <Link key={link.to} to={link.to} className="hover:text-blue-600">
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
