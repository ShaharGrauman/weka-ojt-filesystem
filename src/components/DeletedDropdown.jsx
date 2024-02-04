import React from 'react';
import Dropdown from './Dropdown';

const DeletedDropdown = ({ onSelect }) => {
  const deletedOptions = [
    { value: 'restore', label: 'Restore' },
    { value: 'delete', label: 'Delete' },
    // Add more options as needed
  ];

  return <Dropdown options={deletedOptions} onSelect={onSelect} />;
};

export default DeletedDropdown;
