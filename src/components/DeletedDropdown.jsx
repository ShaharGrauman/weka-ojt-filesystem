import React from 'react';
import Dropdown from './dropdown';

const DeletedDropdown = () => {
  const deletedOptions = [
    { value: 'restore', label: 'Restore' },
    { value: 'delete', label: 'Delete' },
  ];


  const handleOptionSelect = (selectedOption) => {
      console.log('Selected option:', selectedOption);
      switch(selectedOption){
        case "restore":
            navigate("/homepage");
            break;
        case "delete":
          navigate("/homepage");   
          break;
      }
  };

return <Dropdown options={deletedOptions} onSelect={handleOptionSelect} plusIcon={false} />;
};




export default DeletedDropdown;
