# Alumni Project Documentation

## Overview

The **Alumni** project is a full-stack web application designed to connect alumni and administrators of an educational institution. It provides features for alumni to share posts, view jobs, events, and manage their profiles, while administrators can manage users and events.

---

## Frontend (React + Redux)

### Structure

- **Tech Stack**: React, Redux Toolkit (for state management), React Router, Tailwind CSS.
- **Entry Point**: `frontend/src/main.jsx`
    - Initializes Redux store
    - Renders the main `App` component

- **Routing (`frontend/src/App.jsx`)**
    - Uses `react-router-dom` for navigation.
    - **Public Routes**: Login, Register, Alumni List, Posts, Jobs, Event Details, User Profile View.
    - **Protected Routes**: Home, Profile, Post Details, Job Details (Require authentication).
    - **Role-Based Routes**:
        - `/admin/*` for administrators (Admin Dashboard, Manage Events, Manage Users)
        - `/alumni/*` for alumni users (Alumni Dashboard, Manage Posts, Manage Jobs)

- **Core Pages/Components**:
    - `HomePage`: Displays hero, about, stats, event list, alumni stories, and latest posts.
    - `Profile`: User profile management.
    - `Posts` & `Job`: Fetch and display all posts/jobs.
    - `DashboardLayout`: Shared layout for dashboards, uses a sidebar (desktop) or top nav (mobile).
    - `Sidebar.jsx`: Shows navigation links based on user role.
    - `Footer.jsx` & `Navbar.jsx`: Consistent branding, navigation, contact, and social links.

- **State Management**:
    - Redux slices for user authentication, posts, and jobs.
    - Uses Redux for session persistence and role-based UI rendering.

- **API Communication**:
    - Axios-based service modules (e.g., `authService.js`, `jobService.js`) interact with backend REST APIs.

---

## Backend (Node.js + Express + MongoDB)

### Structure

- **Tech Stack**: Node.js, Express.js, MongoDB (Mongoose), JWT for authentication, Multer for file uploads.
- **Entry Point**: `backend/index.js`
    - Imports and uses Express app, sets up main routers:
        - `/api/v1/users`
        - `/api/v1/posts`
        - `/api/v1/events`
        - `/api/v1/jobs`

- **App Setup (`backend/app.js`)**
    - Loads environment variables, connects to MongoDB, starts web server.
    - Uses CORS, JSON body parsing, and cookie parsing.

- **Authentication & Authorization**
    - JWT-based authentication (`isAuthenticated.js`)
    - Role-based access control for admin/alumni endpoints.

- **Key Models**:
    - `User`: Includes role (user, alumni, admin), profile fields, verification status.
    - `Post`: Text/image posts, likes, comments, creator reference.
    - `Job`: Job openings posted by alumni, with company, position, description, and poster reference.

- **Core Features via Routes**:
    - **User**: Register, login, logout, profile update, get all users/alumni, verify alumni, change role, delete user.
    - **Posts**: Create/edit/delete post (alumni only), view posts, comments, likes.
    - **Jobs**: Create/edit/delete job (alumni only), get all jobs, get jobs by user.
    - **Events**: (Not detailed in snippets, but implied via `/events`).

- **Middleware**:
    - `authenticateUser`: Verifies JWT, attaches user to request.
    - `authorizeRoles`: Ensures only users with allowed roles can access route.

- **Database Connection**:
    - `db.js`: Connects to MongoDB via Mongoose using `MONGODB_URI` from environment.

---

## Key Flows

### User Authentication

- **Frontend**: Uses Redux state to manage login, registration, and session.
- **Backend**: On login, issues JWT in HTTP-only cookie; on each request, backend verifies the token and user role.

### Posts & Jobs

- **Alumni** can create, edit, and delete posts and jobs.
- **All users** can view posts and jobs.
- **Admin** can manage users and events.

---

## Example User Stories

- **Alumni**: Register → Wait for admin verification → Log in → Post updates, share jobs, comment, and like posts.
- **Admin**: Log in → Verify new alumni → Manage users and events.
- **Student/Guest**: Browse public posts, jobs, alumni list, and events.

---

## Conclusion

The alumni portal offers a secure, role-driven experience for alumni engagement and community growth, with a modular frontend and robust backend API.
