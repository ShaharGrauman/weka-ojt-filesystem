import React from 'react';
import Dropdown from './Dropdown';

const VersionsDropdown = ({ onSelect }) => {
  const versionsOptions = [
    { value: 'download', label: 'Download' },
    { value: 'share', label: 'Share' },
    { value: 'delete', label: 'Delete' },
  ];

  return <Dropdown options={versionsOptions} onSelect={onSelect} />;
};

export default VersionsDropdown;
