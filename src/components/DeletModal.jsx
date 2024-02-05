import React from "react";
import React from "react";
import { ModalHeader, ModalBody, ModalFooter } from "./ModalComponents";


const DeleteModal = ({ showModal, closeModal, handleLogout }) => (
  <div className={`modal fade ${showModal ? 'show' : ''}`} id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={!showModal}>
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        {/* Modal Header Component */}
        <ModalHeader closeModal={closeModal} />
        {/* Modal Body Component */}
        <ModalBody />
        {/* Modal Footer Component */}
        <ModalFooter closeModal={closeModal} handleAction={handleDelete} actionText="Delete" />
      </div>
    </div>
  </div>
);

export default DeleteModal;