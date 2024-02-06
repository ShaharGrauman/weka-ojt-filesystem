import React, { useState } from "react";
import Dropdown from "./dropdown";
import Share from "./Share";
import FileDetailsModal from "./details"
import Move_file from "./move_file";

const HomeDropdown = ({ selectedItem }) => {
  const [showMoveFile, setShowMoveFile] = useState(false);
  const folders = [{ name: "one" }, { name: "two" }];
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
      return <FileDetailsModal showModal={true} onClose={() => {}} fileDetails={selectedItem} />;
      // Handle details option
    } else if (selectedOption === "share") {
      // Handle share option
      console.log("Sharing...", selectedItem);
    }
    else if (selectedOption.value === "move") {
      setShowMoveFile(true);
    }
   
  };

  return (
    <div>
    <Dropdown
      options={homeOptions}
      onSelect={handleOptionSelect}
      plusIcon={false}
   />
     {showMoveFile ? <Move_file folders={folders} /> : null}
  </div>
  );
};

export default HomeDropdown;