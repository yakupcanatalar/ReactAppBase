import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Register from "./components/Register/Register";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import FlowBuilder from "./components/Workflow/FlowBuilder";
import ProtectedRoute from "./components/ProtectodRoute/ProdectedRoute";
import CustomerManagement from "./components/Customer/CustomerManagement";
import About from "./components/About/About";
import Dashboard from "./components/Dasboard/Dashboard";
import Profile from "./components/Profile/Profile";
import Settings from "./components/Settings/Settings";
import Statistics from "./components/Statistics/Statistics";
import Tasks from "./components/Tasks/Tasks";
import Logout from "./components/Logout/Logout";

const isAuthenticated = !!localStorage.getItem("accessToken"); // Replace with actual authentication logic

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} /> {/* Home Page */}
      <Route path="/home" element={<Home />} /> {/* Home Page */}
      <Route path="/register" element={<Register />} /> {/* Register Page */}
      <Route path="/login" element={<Login />} /> {/* Login Page */}
      <Route path="/admin" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<App />} redirectTo="/Login" />} />
      <Route path="/admin/customer" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<CustomerManagement />} redirectTo="/Login" />} />
      <Route path="/admin/workflow" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<FlowBuilder />} redirectTo="/Login" />} />
      <Route path="/admin/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Dashboard />} redirectTo="/Login" />} />
      <Route path="/admin/tasks" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Tasks />} redirectTo="/Login" />} />
      <Route path="/admin/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Profile />} redirectTo="/Login" />} />
      <Route path="/admin/statistics" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Statistics />} redirectTo="/Login" />} />
      <Route path="/admin/settings" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Settings />} redirectTo="/Login" />} />
      <Route path="/admin/about" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<About />} redirectTo="/Login" />} />
      <Route path="/admin/logout" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<Logout />} redirectTo="/Login" />} />

    </Routes>
  </BrowserRouter>
);