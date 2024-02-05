import React from 'react';
import Dropdown from './dropdown';

const VersionsDropdown = () => {
  const versionsOptions = [
    { value: 'download', label: 'Download' },
    { value: 'share', label: 'Share' },
    { value: 'delete', label: 'Delete' },
  ];
const handleOptionSelect = (selectedOption) => {
  // Handle the selected option
  console.log('Selected option:', selectedOption);
};

return <Dropdown options={versionsOptions} onSelect={handleOptionSelect} plusIcon={false} />;
};

export default VersionsDropdown;
