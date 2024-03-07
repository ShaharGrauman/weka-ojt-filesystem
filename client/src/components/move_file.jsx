import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import FolderRadioButton from "./FolderRadioButton";

const Move_file = ({ folders, onMove, onClose }) => {
  const [showModal, setShowModal] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState(folders[0]?.id); // Initialize with the first folder

  //   const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    onClose();
  };
  const handleMove = () => {
    console.log("Moving to folder:", selectedFolder);
    onMove(selectedFolder);
  };

  const handleRadioButtonChange = (folder_id) => {
    setSelectedFolder(folder_id);
  };

  return (
    <div>
      {/*       <Button variant="primary" onClick={handleShow}> */}
      {/*         Move */}
      {/*       </Button> */}

      <Modal show={showModal} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Move file to:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {folders.map((folder) => (
            <FolderRadioButton
              key={folder.id}
              id={`folderRadio-${folder.id}`}
              name={`folderType-${folder.id}`}
              label={folder.name}
              checked={selectedFolder === folder.id}
              onChange={() => handleRadioButtonChange(folder.id)}
            />
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleMove}>
            Move
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Move_file;
