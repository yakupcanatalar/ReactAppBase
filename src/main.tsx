import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Register from "./components/Register/Register";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from "./components/Login/Login";
import Home from "./Home/Home";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} /> {/* Home Page */}
      <Route path="/Admin" element={<App />} /> {/* Admin Page */}
      <Route path="/Login" element={<Login />} /> {/* Login Page */}
      <Route path="/register" element={<Register />} /> {/* Register Page */}
    </Routes>
  </BrowserRouter>
);
