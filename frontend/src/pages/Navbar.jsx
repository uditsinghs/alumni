import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom"; // 👈 import Link

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const role = "user"; // "admin" ya "user"
  const user = false;
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQpP2D3Db0eXFyxHKyxGxTmnX4tTXIeRTvGg&s"
            alt="logo"
            className="w-20 "
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <Link
            to="/alumni-list"
            className="hover:text-blue-600 transition-colors"
          >
            Alumni List
          </Link>

          {role === "admin" ? (
            <>
              <Link
                to="/admin/dashboard"
                className="hover:text-blue-600 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/admin/events"
                className="hover:text-blue-600 transition-colors"
              >
                Manage Events
              </Link>
            </>
          ) : role === "user" ? (
            <>
              <Link
                to="/events"
                className="hover:text-blue-600 transition-colors"
              >
                Events
              </Link>
              <Link
                to="/profile"
                className="hover:text-blue-600 transition-colors"
              >
                Profile
              </Link>
            </>
          ) : null}
          {user ? (
            <button className="border px-4 py-1 rounded hover:bg-red-600 hover:text-white transition">
              Logout
            </button>
          ) : (
            <Link to='/login'>
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
        className={`md:hidden bg-white shadow-md transform transition-all duration-300 ease-in-out ${
          menuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col items-start p-4 gap-4">
          <Link to="/" className="hover:text-blue-600" onClick={toggleMenu}>
            Home
          </Link>
          <Link
            to="/alumni-list"
            className="hover:text-blue-600"
            onClick={toggleMenu}
          >
            Alumni List
          </Link>

          {role === "admin" ? (
            <>
              <Link
                to="/admin/dashboard"
                className="hover:text-blue-600"
                onClick={toggleMenu}
              >
                Dashboard
              </Link>
              <Link
                to="/admin/events"
                className="hover:text-blue-600"
                onClick={toggleMenu}
              >
                Manage Events
              </Link>
            </>
          ) : role === "user" ? (
            <>
              <Link
                to="/events"
                className="hover:text-blue-600"
                onClick={toggleMenu}
              >
                Events
              </Link>
              <Link
                to="/profile"
                className="hover:text-blue-600"
                onClick={toggleMenu}
              >
                Profile
              </Link>
            </>
          ) : null}

          {user ? (
            <button className="border px-4 py-1 rounded hover:bg-red-600 hover:text-white transition">
              Logout
            </button>
          ) : (
            <Link to='/login'>
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
