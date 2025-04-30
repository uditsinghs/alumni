import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import Profile from "./pages/Profile";
import AlumniList from "./pages/homePage/AlumniList";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import DashboardLayout from "./layouts/DashboardLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import ManageUsers from "./pages/admin/ManageUsers";

import AlumniDashboard from "./pages/alumni/AlumniDashboard";

import { useDispatch, useSelector } from "react-redux";
import { getLoggedinUser } from "./features/auth/authService";
import { getUser } from "./features/auth/authSlice";
import { useEffect } from "react";
import ManagePosts from "./pages/alumni/ManagePosts";
import ManageJobs from "./pages/alumni/ManageJobs";
import Posts from "./pages/Posts";
import DetailPost from "./pages/DetailPost";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const role = user?.role;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getLoggedinUser();

        dispatch(getUser(user));
      } catch (error) {
        console.log("User not logged in or session expired", error);
      }
    };

    fetchUser();
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/alumni-list" element={<AlumniList />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/detailpost/:pid" element={<DetailPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin Dashboard Routes */}
        {role === "admin" && (
          <Route path="/admin" element={<DashboardLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="events" element={<ManageEvents />} />
            <Route path="users" element={<ManageUsers />} />
          </Route>
        )}

        {/* Alumni Dashboard Routes */}
        {role === "alumni" && (
          <Route path="/alumni" element={<DashboardLayout />}>
            <Route path="dashboard" element={<AlumniDashboard />} />
            <Route path="manageposts" element={<ManagePosts />} />
            <Route path="managejobs" element={<ManageJobs></ManageJobs>} />
          </Route>
        )}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
