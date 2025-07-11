import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@/features/auth/authService";
import { logout } from "@/features/auth/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const role = user?.role;
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = async () => {
    const data = await logoutUser();
    dispatch(logout());
    if (data.success) toast.success(data.message);
    navigate("/login");
  };

  // Common Links
  const baseLinks = [
    { to: "/", label: "Home" },
    { to: "/alumni-list", label: "Alumni List" },
    { to: "/posts", label: "Posts" },
    { to: "/jobs", label: "Jobs" },
    { to: "/profile", label: "Profile" },
  ];

  // Role-Specific Links
  const adminLinks = [{ to: "/admin/dashboard", label: "Dashboard" }];

  const alumniLinks = [{ to: "/alumni/dashboard", label: "Dashboard" }];

  const navLinks = [
    ...baseLinks,
    ...(role === "admin" ? adminLinks : []),
    ...(role === "alumni" ? alumniLinks : []),
  ];

  return (
    <nav className="bg-white shadow-md ">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 ">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGBZhQbrcMQV_GBExnXGmsYPZAJujaCY6Seg&s"
            alt="logo"
            className="w-20"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-blue-600 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="border px-4 py-1 rounded hover:bg-red-600 hover:text-white transition"
            >
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="border px-4 py-1 rounded hover:bg-blue-600 hover:text-white transition">
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-300 ease-in-out ${
          menuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-start p-4 gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={toggleMenu}
              className="hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}

          {isLoggedIn ? (
            <button
              onClick={() => {
                toggleMenu();
                handleLogout();
              }}
              className="border px-4 py-1 rounded hover:bg-red-600 hover:text-white transition"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" onClick={toggleMenu}>
              <button className="border px-4 py-1 rounded hover:bg-blue-600 hover:text-white transition">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
