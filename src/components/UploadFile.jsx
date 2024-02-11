import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const UploadModal = ({ closeModal }) => {
  return (
    <Modal show={true} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Upload File</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="mb-3">
          <label htmlFor="fileInput" className="form-label">
            Choose file to upload:
          </label>
          <input type="file" className="form-control" id="fileInput" />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={closeModal}>
          Upload
        </Button>
        <Button variant="light" onClick={closeModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UploadModal;