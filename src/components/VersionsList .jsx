
import React from 'react';
import FileVersion from './versionsFile';

const VersionsList = () => (
  <div className="container mt-5">
    <h1 className="text-center mb-5">ojt.txt- Versions</h1>
    {/* Replace the following data with your actual data */}
    <FileVersion
      number={1}
      date="02/01/2024"
      icon={<i className="lni lni-empty-file custom-icon"></i>}
      dropdownItems={[
        <span key="download"><i className="bi bi-box-arrow-in-down mx-2"></i> Download</span>,
        <span key="share"><i className="bi bi-share mx-2"></i> Share</span>,
        <span key="delete"><i className="bi bi-trash mx-2"></i> Delete</span>,
      ]}
    />
    {/* Add more FileVersion components for each row */}
  </div>
);

export default VersionsList;