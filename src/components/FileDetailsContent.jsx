import React from 'react';

const FileDetailsContent = ({ owner, sharedWith, requiredPermissions }) => {
  return (
    <div>
      <p><strong>Owner:</strong> {owner}</p>
      <p><strong>Shared with:</strong></p>
      <ul>
        {sharedWith.map((shared, index) => (
          <li key={index}>{shared.name} - {shared.permission}</li>
        ))}
      </ul>
      <p><strong>Required permissions:</strong> {requiredPermissions}</p>
    </div>
  );
}

export default FileDetailsContent;
