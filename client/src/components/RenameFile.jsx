import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

const RenameFile = ({ fileName, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  const [newFileName, setNewFileName] = useState(fileName);

  const handleChange = (event) => {
    setNewFileName(event.target.value);
  };

  const handleRename = () => {
    handleClose();
  };

  return (
    <>
      <Modal show={true} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rename File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Enter new file name"
            value={newFileName}
            onChange={handleChange}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRename}>
            Rename
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RenameFile;
