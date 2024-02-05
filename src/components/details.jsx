import React from 'react';
import FileDetailsContent from './FileDetailsContent';



const FileDetailsModal = ({ fileDetails }) => {
  const { owner, sharedWith, requiredPermissions } = fileDetails;

  return (
    <div className="container mt-5">
      <div className="modal fade" id="fileDetailsModal" tabIndex="-1" role="dialog" aria-labelledby="fileDetailsModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="fileDetailsModalLabel">File Details</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <FileDetailsContent owner={owner} sharedWith={sharedWith} requiredPermissions={requiredPermissions} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileDetailsModal;