import React from 'react';
import Dropdown from './dropdown';

const DeletedDropdown = ({ selectedItem }) => {
  const deletedOptions = [
    { value: 'restore', label: 'Restore' },
    { value: 'delete', label: 'Delete' },
  ];

  const handleOptionSelect = (selectedOption) => {
    switch (selectedOption.value) {
      case 'restore':
        console.log('Restoring item:', selectedItem);
        break;
      case 'delete':
        console.log('Permanently deleting item:', selectedItem);
        break;
      default:
        break;
    }
  };

return <Dropdown options={deletedOptions} onSelect={handleOptionSelect} plusIcon={false} />;

};

export default DeletedDropdown;
