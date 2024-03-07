
import React from 'react';
import FileVersion from './versionsFile';


const VersionsList = ({ fileId }) => {
  const [versionData, setVersionData] = useState([]);

  useEffect(() => {
    const fetchVersions = async () => {
      try {
        const response = await getFileVersions(fileId); // Call getFileVersions function from DAL
        setVersionData(response);
      } catch (error) {
        console.error('Error fetching file versions:', error);
      }
    };

    fetchVersions();
  }, [fileId]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">ojt.txt - Versions</h1>
      {versionData.map((version, index) => (
        <FileVersion
          key={index}
          number={index + 1} // Assuming version number starts from 1
          date={version.upload_date}
          icon={<i className="lni lni-empty-file custom-icon"></i>}
        />
      ))}
    </div>
  );
};

export default VersionsList;