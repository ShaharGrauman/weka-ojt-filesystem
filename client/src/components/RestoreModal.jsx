import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import { ModallBody, ModallFooter, ModallHeader } from "./ModalComponent";
import { restoreDeletedFile } from "../Dal/data.js";

const RestoreModal = ({ onClose, itemId, userId }) => {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  const handleRestore = () => {
    restoreDeletedFile(userId, itemId);
    handleClose();
    onClose();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <ModallHeader closeModal={handleClose} />
        <ModallBody />
        <ModallFooter
          closeModal={handleClose}
          handleAction={handleRestore}
          actionText="Restore"
        />
      </Modal>
    </div>
  );
};

export default RestoreModal;
