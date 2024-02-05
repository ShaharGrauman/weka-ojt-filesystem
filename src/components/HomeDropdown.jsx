import React from 'react';
import Dropdown from './Dropdown';

const HomeDropdown = ({ onSelect }) => {
  const homeOptions = [
    { value: 'download', label: 'Download' },
    { value: 'move', label: 'Move' },
    { value: 'share', label: 'Share' },
    { value: 'rename', label: 'Rename' },
    { value: 'delete', label: 'Delete' },
    { value: 'versions', label: 'Versions' },
    { value: 'details', label: 'Details' },
  ];

const handleOptionSelect = (selectedOption) => {
  console.log('Selected option:', selectedOption);
};

return <Dropdown options={homeOptions} onSelect={handleOptionSelect} plusIcon={false} />;


};

export default HomeDropdown;