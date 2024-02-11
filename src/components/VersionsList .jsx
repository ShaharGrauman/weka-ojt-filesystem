
import React from 'react';
import FileVersion from './versionsFile';
import VersionsDropdown from './VersionsDropdown';

const VersionsList = ({ versionData }) => (
  <div className="container mt-5">
    <h1 className="text-center mb-5">ojt.txt- Versions</h1>
    {versionData.map((version, index) => (
      <FileVersion
        key={index} // Ensure each child component has a unique key
        number={version.number}
        date={version.date}
        icon={<i className="lni lni-empty-file custom-icon"></i>}
      />
    ))}
  </div>
);

export default VersionsList;