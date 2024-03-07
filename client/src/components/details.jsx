import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'; // Example: Using Bootstrap modal

const FileDetailsModal = ({ showModal, onClose, fileDetails }) => {
  const handleClose = () => {
    onClose(); // Call the onClose function to close the modal
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>File Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>File name: {fileDetails.name}</p>
        <p>Last Updated: {fileDetails.upload_date.split('T')[0]}</p>
        {/* Add more file details here */}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>Close</button>
      </Modal.Footer>
    </Modal>
  );
}

export default FileDetailsModal;

