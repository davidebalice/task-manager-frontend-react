import { Route, Routes } from "react-router-dom";

import Dashboard from "../pages/dashboard/index";
// Auth
import Login from "../pages/Auth/login";
import Register from "../pages/Auth/register";
import ForgotPassword from "../pages/Auth/forgotPassword";

import Projects from "../pages/projects/Projects";
import Project from "../pages/projects/Project";
import AddProject from "../pages/projects/AddProject";
import ProjectMembers from "../pages/projects/ProjectMembers";

import Tasks from "../pages/tasks/Tasks";
import Task from "../pages/tasks/Task";

import Profile from "../pages/profile/Profile";

export function AdminRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/projects" element={<Projects />} />
        <Route path="/project/:id" element={<Project />} />
        <Route path="/add/project/" element={<AddProject />} />
        <Route path="/project/members/:id" element={<ProjectMembers />} />

        <Route path="/project/tasks/:id" element={<Tasks />} />
        <Route path="/project/task/:id" element={<Task />} />

        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}
