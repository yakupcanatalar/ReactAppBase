import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import "./Nav-bar.css";

const NavigationBar: React.FC = () => {
  return (
    <Navbar className='nav-bar' variant="dark" expand="lg">
      {/* <Navbar.Brand href="/">
        <img
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="MyWebsite logo"
        />
        MyWebsite
      </Navbar.Brand> */}
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="/login">
            <img src="src/assets/icons8-user-30.png" alt="Login Icon" /> Login
          </Nav.Link>
        </Nav>
      </Navbar.Collapse> */}
    </Navbar>
  );
};

export default NavigationBar;