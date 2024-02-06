import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'; // Example: Using Bootstrap modal

const FileDetailsModal = ({ showModal, onClose, fileDetails }) => {
  const handleClose = () => {
    onClose(); // Call the onClose function to close the modal
  };

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>File Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>File Name: {fileDetails.fileName}</p>
        <p>Last Updated: {fileDetails.lastUpdated}</p>
        {/* Add more file details here */}
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>Close</button>
      </Modal.Footer>
    </Modal>
  );
}

export default FileDetailsModal;

//
//
// import React from 'react';
// import FileDetailsContent from './FileDetailsContent';
//
//
//
// const FileDetailsModal = ({ showModal, onClose, fileDetails }) => {
//     const { owner, sharedWith, requiredPermissions } = fileDetails;
//
// return (
//     <div className="modal fade" id="fileDetailsModal" tabIndex="-1" role="dialog" aria-labelledby="fileDetailsModalLabel" aria-hidden="true">
//       <div className="modal-dialog modal-dialog-centered">
//         <div className="modal-content">
//           <div className="modal-header">
//             <h5 className="modal-title" id="fileDetailsModalLabel">File Details</h5>
//             <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>
//               <span aria-hidden="true">&times;</span>
//             </button>
//           </div>
//           <div className="modal-body">
//             {/* Pass owner, sharedWith, and requiredPermissions as props to FileDetailsContent */}
//             <FileDetailsContent owner={owner} sharedWith={sharedWith} requiredPermissions={requiredPermissions} />
//           </div>
//           <div className="modal-footer">
//             <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Close</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
//
// export default FileDetailsModal;
//
//
