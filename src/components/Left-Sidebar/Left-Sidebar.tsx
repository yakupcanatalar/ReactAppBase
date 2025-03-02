import React from 'react';
import { Nav } from "react-bootstrap";
import { FaWalking, FaReadme, FaRegAngry, FaInfoCircle, FaTasks, FaThLarge, FaUser, FaSignOutAlt } from "react-icons/fa";
import "./Left-Sidebar.css";

const LeftSideBar: React.FC = () => {
  return (
    <div className={`sidebar bg-dark d-flex flex-column vh-100`}>
      <h4></h4>
      <Nav className="flex-column px-3 py-4 flex-grow-1 justify-content-start">
        <Nav.Link href="#" className="sidebar-item">
          <FaTasks className="me-2" /> Create a task
        </Nav.Link>
        <Nav.Link href="#" className="sidebar-item">
          <FaThLarge className="me-2" /> Dashboard
        </Nav.Link>
        <Nav.Link href="#" className="sidebar-item">
          <FaUser className="me-2" /> Profile
        </Nav.Link>
        <Nav.Link href="/Workflow" className="sidebar-item">
          <FaWalking className="me-2" /> WorkFlow
        </Nav.Link>
        <Nav.Link href="#" className="sidebar-item">
          <FaReadme className="me-2" /> Statistics
        </Nav.Link>
        <Nav.Link href="#" className="sidebar-item">
          <FaRegAngry className="me-2" /> Settings
        </Nav.Link>
        <Nav.Link href="#" className="sidebar-item">
          <FaInfoCircle className="me-2" /> About
        </Nav.Link>
      </Nav>
      <Nav className="mt-auto px-3 py-3">
        <Nav.Link href="#" className="sidebar-item text-danger">
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default LeftSideBar;
