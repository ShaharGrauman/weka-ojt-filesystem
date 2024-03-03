import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const CreateFolder = ({onClose }) => {

    
  const handleClose = () => {
    onClose();
  };

  const [newFolderName, setNewFolderName] = useState("");

  const handleChange = (event) => {
    setNewFolderName(event.target.value);
  };

  const handleCreate = () => {
      handleClose();
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
            Rename
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateFolder;

