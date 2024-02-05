import React from 'react';
import Dropdown from './Dropdown';

const DeletedDropdown = ({ onSelect }) => {
  const deletedOptions = [
    { value: 'restore', label: 'Restore' },
    { value: 'delete', label: 'Delete' },
  ];

const handleOptionSelect = (selectedOption) => {
  console.log('Selected option:', selectedOption);
};

return <Dropdown options={deletedOptions} onSelect={handleOptionSelect} plusIcon={false} />;
};

export default DeletedDropdown;
