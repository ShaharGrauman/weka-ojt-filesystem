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
    onSelect(selectedOption); // Pass selected option to parent component if needed

    console.log('Selected option in home page dropdown:', selectedOption);
  };

  return <Dropdown options={homeOptions} onSelect={handleOptionSelect} />;
};

export default HomeDropdown;