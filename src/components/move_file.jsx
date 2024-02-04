import react from "react";
import { useState } from "react";
import { Modal, Button, FormCheck } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import CustomRadioButton from "./CustomRadioButton";

function createCustomRadioButton(data) {
  return (
    <CustomRadioButton
      key={data.id}
      name={data.name}
    />
  );
}

const Move_file = () => {
   const [showModal, setShowModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleMove = () => {
    // Add your move logic here using the selectedFolder state
    console.log("Moving to folder:", selectedFolder);
    handleClose();
  };

  const handleRadioButtonChange = (folderName) => {
    setSelectedFolder(folderName);
  };
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Move
      </Button>

      <Modal show={showModal} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Move file to:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <CustomRadioButton
            id="picRadio"
            name="folderTypePic"
            label="pic"
            checked={selectedFolder === 'pic'}
            onChange={() => handleRadioButtonChange('pic')}
          />
          <CustomRadioButton
            id="tasksRadio"
            name="folderTypeTasks"
            label="tasks"
            checked={selectedFolder === 'tasks'}
            onChange={() => handleRadioButtonChange('tasks')}
          />
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
