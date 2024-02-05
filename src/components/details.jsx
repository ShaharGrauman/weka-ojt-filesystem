import React from 'react';
import FileDetailsContent from './FileDetailsContent';



const FileDetailsModal = ({showModal, onClose, fileDetails }) => {
  const { owner, sharedWith, requiredPermissions } = fileDetails;

  return (
    <div className={`container mt-5 ${showModal ? 'modal show' : 'modal'}`} id="fileDetailsModal" tabIndex="-1" role="dialog" aria-labelledby="fileDetailsModalLabel" aria-hidden={!showModal}>
      <div className="modal fade" >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="fileDetailsModalLabel">File Details</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={onClose}>  
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <FileDetailsContent owner={owner} sharedWith={sharedWith} requiredPermissions={requiredPermissions} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileDetailsModal;