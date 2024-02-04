import react from "react";
import { useState } from "react";
import { Modal, Button, FormCheck } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import CustomRadioButton from "./CustomRadioButton";
const Move_file = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleMove = () => {
    // Add your move logic here
    handleClose();
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
            name="folderType"
            label="pic"
            icon={faFolder}
          />
          <CustomRadioButton
            id="tasksRadio"
            name="folderType"
            label="tasks"
            icon={faFolder}
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
