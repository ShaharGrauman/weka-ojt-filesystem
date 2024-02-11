import React, { useState } from "react";
import { Breadcrumb, Container } from "react-bootstrap";
import "../css/Path.css";

function PathComponent() {
  const [currentDirectory, setCurrentDirectory] = useState("Home/"); // Initial directory

  const changeDirectory = (newDirectory) => {
    setCurrentDirectory(newDirectory);
  };

  return (
    <Container>
      <Breadcrumb className="path-component">
        <Breadcrumb.Item active>{currentDirectory}</Breadcrumb.Item>
      </Breadcrumb>
    </Container>
  );
}

export default PathComponent;
