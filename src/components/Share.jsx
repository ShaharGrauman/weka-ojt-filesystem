import React, { useState } from "react";
import { DropdownButton, Dropdown, Button, Form } from "react-bootstrap";

const Share = () => {
  const [selectedPermission, setSelectedPermission] = useState("Read"); // Default permission
  const [email, setEmail] = useState("");

  const handlePermissionChange = (permission) => {
    setSelectedPermission(permission);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleShare = () => {
    console.log(
      `Sharing with email: ${email} and permission: ${selectedPermission}`
    );
  };

  return (
    <div>
      <h2>Share Component</h2>
      <div>
        {/* Email Input */}
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>

        {/* Permission Dropdown */}
        <div>
          <h3>Permissions</h3>
          <DropdownButton
            id="dropdown-basic-button"
            title={selectedPermission}
            onSelect={handlePermissionChange}
          >
            <Dropdown.Item eventKey="Read">Read</Dropdown.Item>
            <Dropdown.Item eventKey="Write">Write</Dropdown.Item>
            <Dropdown.Item eventKey="Delete">Delete</Dropdown.Item>
          </DropdownButton>
        </div>

        {/* Share Button */}
        <Button variant="primary" onClick={handleShare}>
          Share
        </Button>
      </div>
    </div>
  );
};

export default Share;
