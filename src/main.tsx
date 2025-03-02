import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Register from "./components/Register/Register";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from "./components/Login/Login";
import Home from "./Home/Home";
import FlowBuilder from "./components/Workflow/FlowBuilder";
import ProtectedRoute from "./Services/ProdectedRoute";

// Mock authentication status
const isAuthenticated = !!localStorage.getItem("accessToken"); // Replace with actual authentication logic

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} /> {/* Home Page */}
      <Route path="/Home" element={<Home />} /> {/* Home Page */}
      <Route path="/Register" element={<Register />} /> {/* Register Page */}
      <Route path="/Login" element={<Login />} /> {/* Login Page */}
      <Route path="/Admin" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<App />} redirectTo="/Login" />} /> {/* Admin Page */}
      <Route path="/Workflow" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={<FlowBuilder />} redirectTo="/Login" />} /> {/* Workflow Page */}
    </Routes>
  </BrowserRouter>
);