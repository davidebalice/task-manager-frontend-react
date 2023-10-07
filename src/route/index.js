import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard/index";
import Login from "../pages/Auth/login";
import Register from "../pages/Auth/register";
import ForgotPassword from "../pages/Auth/forgotPassword";
import Projects from "../pages/projects/Projects";
import Project from "../pages/projects/Project";
import AddProject from "../pages/projects/AddProject";
import EditProject from "../pages/projects/EditProject";
import AddTask from "../pages/tasks/AddTask";
import EditTask from "../pages/tasks/EditTask";
import ProjectMembers from "../pages/projects/ProjectMembers";
import Users from "../pages/users/Users";
import AddUser from "../pages/users/AddUser";
import EditUser from "../pages/users/EditUser";
import PhotoUser from "../pages/users/PhotoUser";
//import Clients from "../pages/clients/Clients";
//import AddClient from "../pages/clients/AddClient//";
//import EditClient// from "../pages/clients/EditClient//";
//import PhotoClient// from "../pages/clients/PhotoClient//";

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
        <Route path="/edit/project/:id" element={<EditProject />} />
        <Route path="/project/members/:id" element={<ProjectMembers />} />

        <Route path="/project/tasks/:id" element={<Tasks />} />
        <Route path="/project/task/:id" element={<Task />} />
        <Route path="/project/add/task/:id" element={<AddTask />} />
        <Route path="/project/edit/task/:id" element={<EditTask />} />

        <Route path="/users" element={<Users />} />
        <Route path="/add/user/" element={<AddUser />} />
        <Route path="/edit/user/:id" element={<EditUser />} />
        <Route path="/photo/user/:id" element={<PhotoUser />} />

        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}
