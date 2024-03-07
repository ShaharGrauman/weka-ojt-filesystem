import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { uploadFile } from '../Dal/data.js';

const UploadModal = ({ closeModal }) => {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    try {
      if (file) {
        const folderId = 2; // Replace with the actual folderId
        const response = await uploadFile(file, folderId);
        console.log(response);
      } else {
        console.error('No file selected for upload');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]); // Use only the first file if multiple files are not supported
  };

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
          <input type="file" className="form-control" id="fileInput" onChange={handleChange} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleUpload}>
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
