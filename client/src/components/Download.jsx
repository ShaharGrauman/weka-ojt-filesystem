import React from "react";
import { Modal, Button } from "react-bootstrap";

const Download = ({ show, onClose, onDownload, downloadUrl }) => {
  const handleDownload = () => {
    onDownload();
    window.location.href = downloadUrl;
    onClose();
  };
  const handleClose = () => {
    onClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Download File</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to download the file?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleDownload}>
          Download
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default Download;
