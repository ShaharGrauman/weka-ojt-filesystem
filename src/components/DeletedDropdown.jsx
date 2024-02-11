import React, { useState } from 'react';
import Dropdown from './dropdown';
import DeleteModal from "./DeletModal";
import RestoreModal from "./RestoreModal";


const DeletedDropdown = ({ selectedItem }) => {
  const deletedOptions = [
    { value: 'restore', label: 'Restore' },
    { value: 'delete', label: 'Delete' },
  ];
  const [showDelete, setShowDelete] = useState(false);
  const [showRestore, setShowRestore] = useState(false);


  const handleOptionSelect = (selectedOption) => {
    switch (selectedOption.value) {
      case 'restore':
        console.log('Restoring item:', selectedItem);
        setShowRestore(true);
      case 'delete':
        console.log('Permanently deleting item:', selectedItem);
        setShowDelete(true);
      default:
        break;
    }
  };
  const handleCloseModal = () => {
    setShowDelete(false);
    setShowRestore(false);
  };

    return (
        <div>
        <Dropdown options={deletedOptions} onSelect={handleOptionSelect} plusIcon={false} />

          {showDelete && <DeleteModal onClose={handleCloseModal} />}
          {showRestore && <RestoreModal onClose={handleCloseModal} />}

        </div>
    )
};

export default DeletedDropdown;
