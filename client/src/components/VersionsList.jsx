import React, { useState, useEffect } from 'react';
import FileVersion from './versionsFile';
import { getFileVersions } from '../Dal/data.js'; // Importing getFileVersions function

const VersionsList = ({ item }) => {
  const [versionData, setVersionData] = useState([]);
  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response = await getFileVersions(item.id); // Call getFileVersions function from DAL
        setVersionData(response ); // Ensure versionData is always an array
      } catch (error) {
        console.error('Error fetching file versions:', error);
      }
    };
    fetchVersions();
  }, [item]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">{item.name} - Versions</h1>
      {versionData?.length > 0 && ( // Use optional chaining here
        versionData.map((version, index) => (
          <FileVersion
            key={index}
            number={index + 1} // Assuming version number starts from 1
            date={version.upload_date}
            icon={<i className="lni lni-empty-file custom-icon"></i>}
            fileId
          />
        ))
      )}
    </div>
  );
};

export default VersionsList;
