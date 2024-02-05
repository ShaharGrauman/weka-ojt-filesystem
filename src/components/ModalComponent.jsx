import React from "react";

const ModalHeader = ({ closeModal }) => (
  <div className="modal-header">
    <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
    <button type="button" className="close" onClick={closeModal} aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
);

const ModalBody = () => (
  <div className="modal-body">
    Are you sure you want to log out?
  </div>
);

const ModalFooter = ({ closeModal, handleAction, actionText }) => (
  <div className="modal-footer">
    <button type="button" className="btn btn-secondary" onClick={closeModal}>
      Cancel
    </button>
    <button type="button" className="btn btn-primary" onClick={handleAction}>
      {actionText}
    </button>
  </div>
);

export { ModalHeader, ModalBody, ModalFooter };