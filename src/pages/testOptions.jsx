import VersionsDropdown from "../components/VersionsDropdown";
import DeletedDropdown from "../components/DeletedDropdown";
import PlusDropdown from "../components/PlusOptions";
import React from 'react';
import HomeDropdown from "../components/HomeDropdown";
import FileViewer from "../components/FileViewer";
  const TestPage = () => {

  
    return (
      <div>
        {/* <HomeDropdown  />
        <DeletedDropdown />
        <PlusDropdown  />
        <VersionsDropdown /> */}
        <FileViewer filePath="..\Image\photo.png" />

      </div>

    );
  };
  
  export default TestPage;