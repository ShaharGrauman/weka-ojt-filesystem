import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { addFile } from "../Dal/data.js";
const CreateFolder = ({ onClose }) => {
  const handleClose = () => {
    onClose();
  };

  const [newFolderName, setNewFolderName] = useState("");

  const handleChange = (event) => {
    setNewFolderName(event.target.value);
  };

  const handleCreate = async () => {
    try {
      // Call the addFolder API
      const response = await addFile(1, newFolderName); // Assuming folderId is accessible in this scope
      if (response) {
        handleClose();
        // Optionally, you can perform additional actions upon successful folder creation
        console.log("Folder created successfully");
      }
      else {
        console.error("Failed to create folder");
        // Optionally, you can display an error message to the user
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Folder:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter folder name"
            value={newFolderName}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreate}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateFolder;

