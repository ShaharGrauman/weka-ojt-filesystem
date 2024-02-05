import React from 'react';
import Dropdown from './Dropdown';

const PlusDropdown = ({ onSelect }) => {

const plusOptions = [
    { value: 'upload', label: 'Upload file' },
    { value: 'newfolder', label: 'New folder' },
  ];

const handleOptionSelect = (selectedOption) => {
  console.log('Selected option:', selectedOption);
};

return <Dropdown options={plusOptions} onSelect={handleOptionSelect} plusIcon={true} />;

};

export default PlusDropdown;

