import React, { useState } from "react";
import Dropdown from "./dropdown";
import Move_file from "./move_file";

const HomeDropdown = () => {
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

  const handleOptionSelect = (selectedValue) => {
    if (selectedValue.value === "move") {
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