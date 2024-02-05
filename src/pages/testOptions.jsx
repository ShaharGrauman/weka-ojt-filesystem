import VersionsDropdown from "../components/VersionsDropdown";
import DeletedDropdown from "../components/DeletedDropdown";
import PlusDropdown from "../components/PlusOptions";
import React from 'react';
import HomeDropdown from "../components/HomeDropdown";
  const TestPage = () => {

  
    return (
      <div>
        <h1>Home Page options </h1>
        <HomeDropdown  />
        <DeletedDropdown />
        <PlusDropdown  />
        <VersionsDropdown />
      </div>

    );
  };
  
  export default TestPage;