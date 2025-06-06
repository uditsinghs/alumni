import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import HomePage from "./pages/homePage/HomePage";
import Profile from "./pages/Profile";
import AlumniList from "./pages/homePage/AlumniList";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DashboardLayout from "./layouts/DashboardLayout";

import AdminDashboard from "./pages/admin/AdminDashboard";
import ManageEvents from "./pages/admin/ManageEvents";
import ManageUsers from "./pages/admin/ManageUsers";

import AlumniDashboard from "./pages/alumni/AlumniDashboard";
import ManagePosts from "./pages/alumni/ManagePosts";
import ManageJobs from "./pages/alumni/ManageJobs";

import Posts from "./pages/Posts";
import DetailPost from "./pages/DetailPost";
import EventDetailPage from "./pages/homePage/EventDetailPage";
import Job from "./pages/Job";
import JobDetailPage from "./pages/JobDetailPage";
import UserView from "./pages/UserView";

import RoleBasedRoute from "./pages/Protection/RoleBasedRoute";
import ProtectedRoute from "./pages/Protection/ProtectedRoute";

import { getLoggedinUser } from "./features/auth/authService";
import { getUser } from "./features/auth/authSlice";
import Message from "./pages/Message";
import AuthRedirectRoute from "./pages/Protection/AuthRedirectRoute";
import Register from "./pages/Register";
import Login from "./pages/Login";
function App() {
  const dispatch = useDispatch();
  const { user,isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getLoggedinUser();
        dispatch(getUser(user));
      } catch (error) {
        dispatch(getUser(null)); // <- important to stop loading
        console.log("User not logged in or session expired", error);
      }
    };
    fetchUser();
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    ); 
  }

  return (
    <Router>
      {user && <Navbar />}
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/login"
          element={
            <AuthRedirectRoute>
              <Login />
            </AuthRedirectRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AuthRedirectRoute>
              <Register />
            </AuthRedirectRoute>
          }
        />
        <Route path="/message" element={<Message />} />

        {/* PROTECTED */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/detailpost/:pid"
          element={
            <ProtectedRoute>
              <DetailPost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/jobdetail/:jobId"
          element={
            <ProtectedRoute>
              <JobDetailPage />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin/*"
          element={
            <RoleBasedRoute role="admin">
              <DashboardLayout />
            </RoleBasedRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="events" element={<ManageEvents />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>

        {/* Alumni */}
        <Route
          path="/alumni/*"
          element={
            <RoleBasedRoute role="alumni">
              <DashboardLayout />
            </RoleBasedRoute>
          }
        >
          <Route path="dashboard" element={<AlumniDashboard />} />
          <Route path="manageposts" element={<ManagePosts />} />
          <Route path="managejobs" element={<ManageJobs />} />
        </Route>

        {/* Optional public routes */}
        <Route path="/alumni-list" element={<AlumniList />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/jobs" element={<Job />} />
        <Route path="/eventdetail/:eventId" element={<EventDetailPage />} />
        <Route path="/view/profile/:userid" element={<UserView />} />
      </Routes>
      {user && <Footer />}
    </Router>
  );
}

export default App;
