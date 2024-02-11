
import React from 'react';
import FileVersion from './versionsFile';

const VersionsList = ({ versionData }) => (

//  const { updateState } = show;
//   const gotologin = () => {
//     // Your conditions here
//     updateState(false, true); // Example values, update as needed
//   };


  <div className="container mt-5">
    <h1 className="text-center mb-5">ojt.txt- Versions</h1>

    {versionData.map((version, index) => (
      <FileVersion
        key={index} // Ensure each child component has a unique key
        number={version.number}
        date={version.date}
        icon={<i className="lni lni-empty-file custom-icon"></i>} 
        dropdownItems={version.dropdownItems}
      />
    ))}
  </div>
);

export default VersionsList;