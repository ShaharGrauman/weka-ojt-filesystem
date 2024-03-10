import React, { useState } from "react";
import Dropdown from "./dropdown"; // Make sure to import Dropdown component properly
import Share from "./Share";
import FileDetailsModal from "./details"

const ItemDropDown = ({ selectedItem }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const homeOptions = [
    { value: "download", label: "Download" },
    { value: "move", label: "Move" },
    { value: "share", label: "Share" },
    { value: "rename", label: "Rename" },
    { value: "delete", label: "Delete" },
    { value: "versions", label: "Versions" },
    { value: "details", label: "Details" },
  ];

  const handleOptionSelect = (selectedOption) => {
    if (selectedOption.value === "details") {
      setShowDropdown(false); // Hide the dropdown menu after selecting an option
      return <FileDetailsModal showModal={true} onClose={() => {}} fileDetails={selectedItem} />;
      // Handle details option
    } else if (selectedOption === "share") {
        setShowDropdown(false); // Hide the dropdown menu after selecting an option
      // Handle share option
      console.log("Sharing...", selectedItem);
    }
  };

  return (
  <div>
    <Dropdown
      options={homeOptions}
      onSelect={handleOptionSelect}
      plusIcon={false}
      showDropdown={showDropdown}
      toggleDropdown={() => setShowDropdown(!showDropdown)}
   />
  </div>
  );
};

export default ItemDropDown;
