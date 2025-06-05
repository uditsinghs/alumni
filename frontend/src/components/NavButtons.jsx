// src/components/NavButtons.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavButtons = () => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  const adminLinks = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/events", label: "Events" },
    { to: "/admin/users", label: "Users" },
  ];

  const alumniLinks = [
    { to: "/alumni/dashboard", label: "Dashboard" },
    { to: "/alumni/manageposts", label: "Posts" },
    { to: "/alumni/managejobs", label: "Jobs" },
  ];

  const linksToShow = role === "admin" ? adminLinks : alumniLinks;

  return (
    <div className="flex justify-around bg-gray-200 p-3 shadow-md">
      {linksToShow.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="text-sm font-medium text-gray-700 hover:text-blue-600"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default NavButtons;
