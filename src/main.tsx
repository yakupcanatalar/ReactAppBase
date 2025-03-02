import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Register from "./Components/Register/Register";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from "./Components/Login/Login";
import Home from "./Components/Home/Home"; 
import FlowBuilder from "./Components/Workflow/FlowBuilder";
import ProtectedRoute from "./Components/ProtectodRoute/ProdectedRoute";

// Mock authentication status
const isAuthenticated = !!localStorage.getItem("accessToken"); // Replace with actual authentication logic

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} /> {/* Home Page */}
      <Route path="/home" element={<Home />} /> {/* Home Page */}
      <Route path="/register" element={<Register />} /> {/* Register Page */}
      <Route path="/login" element={<Login />} /> {/* Login Page */}
      <Route path="/admin" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<App />} redirectTo="/Login" />} /> {/* Admin Page */}
      <Route path="/workflow" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<FlowBuilder />} redirectTo="/Login" />} /> {/* Workflow Page */}
    </Routes>
  </BrowserRouter>
);