import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import FolderRadioButton from "./FolderRadioButton";

const Move_file = ({ folders, onMove } ,props) => {
  const [showModal, setShowModal] = useState(true);
  const [selectedFolder, setSelectedFolder] = useState(folders[0]?.name); // Initialize with the first folder
  const { updateState } = props;
 const updatetofalse = () => {
    updateState(false);
  };

// useEffect(() => {
//   setShowModal(false);
// },[updateState])

  const handleClose = () => {setShowModal(false);
   updatetofalse()}


  const handleMove = () => {
    // Add your move logic here using the selectedFolder state
    console.log("Moving to folder:", selectedFolder);
    onMove(selectedFolder);
    handleClose();
  };

  const handleRadioButtonChange = (folderName) => {
    setSelectedFolder(folderName);
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
              checked={selectedFolder === folder.name}
              onChange={() => handleRadioButtonChange(folder.name)}
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