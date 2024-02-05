import React from "react";
import Dropdown from "./dropdown";
import FileDetailsModal from "./details";
import Share from "./Share";

const HomeDropdown = () => {
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
    if (selectedOption === "details") {
    } else if (selectedOption === "share") {
      <Share />;
    }
  };

  return (
    <Dropdown
      options={homeOptions}
      onSelect={handleOptionSelect}
      plusIcon={false}
    />
  );
};

export default HomeDropdown;
