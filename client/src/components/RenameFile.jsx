import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import {
renameFile,
} from "../Dal/data.js";

const RenameFile = ({ fileId,fileName, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  const [newFileName, setNewFileName] = useState(fileName || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setNewFileName(event.target.value);
  };

  const handleRename = async () => {
    setIsLoading(true);
    try {
      await renameFile(fileId, newFileName);
      handleClose();
    } catch (error) {
      console.error("Error renaming file:", error);
    } finally {
      setIsLoading(false);
    }
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
          <Button variant="secondary" onClick={handleClose} disabled={isLoading}>
            Close
          </Button>
          <Button variant="primary" onClick={handleRename} disabled={isLoading}>
                        {isLoading ? "Renaming..." : "Rename"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RenameFile;
