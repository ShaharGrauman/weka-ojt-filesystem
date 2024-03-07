import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import { ModallBody, ModallFooter, ModallHeader } from "./ModalComponent";

const DeleteModal = ({ onClose, onDelete }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    onClose();
  };

  const handledelete = () => {
    onDelete();
    setShow(false);
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <ModallHeader closeModal={handleClose} />
        <ModallBody />
        <ModallFooter
          closeModal={handleClose}
          handleAction={handledelete}
          actionText="Delete"
        />
      </Modal>
    </div>
  );
};

export default DeleteModal;
