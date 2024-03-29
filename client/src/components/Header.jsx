import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../css/Header.css";
import { get_name } from '../Dal/data.js'; // Importing getFileVersions function


function Header() {
  const [username, setUsername] = useState("");

  const fetchUsername = async () => {
    // Example: fetch username from an API
    const response = await get_name();
    setUsername(response);
  };

  // Call fetchUsername when component mounts
  useEffect(() => {
    fetchUsername();
  }, []);

  return (
    <Navbar expand="sm" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand>
          <img
            alt=""
            src="../../image/logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          File System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            
          ></Nav>
          <Nav>
            <div  style={{ color:"black"}}>{`Welcome, ${username}`}</div>
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
