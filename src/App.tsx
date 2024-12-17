import React from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";

const App = () => {
  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register"); // Register sayfasına yönlendir
  };

  return (
    <div className="App">
      <Login />
    </div>
  );
};

export default App;
