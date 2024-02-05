import VersionsDropdown from "../components/VersionsDropdown";
import DeletedDropdown from "../components/DeletedDropdown";
import PlusDropdown from "../components/PlusOptions";
import Dropdown from "../components/Dropdown";
import React from 'react';
import HomeDropdown from "../components/HomeDropdown";
  const TestPage = () => {
    const handleOptionSelect = (selectedOption) => {
      // Handle the selected option
      console.log('Selected option:', selectedOption);
    };
  
    return (
      <div>
        <h1>Home Page options </h1>
        <HomeDropdown onSelect={handleOptionSelect}  />
        <DeletedDropdown onSelect={handleOptionSelect}/>
        <PlusDropdown onSelect={handleOptionSelect} />
        <VersionsDropdown onSelect={handleOptionSelect}/>
      </div>

    );
  };
  
  export default TestPage;