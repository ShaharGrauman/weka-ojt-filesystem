import React, { useState } from "react";
import Dropdown from "./dropdown";
import DeletModal from "./DeletModal";
import RestoreModal from "./RestoreModal";
import {
  folderDeletion,
  fileDeletion,
  restoreDeletedFolder,
  restoreDeletedFile,
} from "../Dal/data.js";

const DeletedDropdown = ({ selectedItem }) => {
  const ALLOWED_EXTENSIONS = [
    ".jpg",
    ".png",
    ".pdf",
    ".mp3",
    ".doc",
    ".docx",
    ".web",
    ".pptx",
    ".jpeg",
    ".ppt",
    ".xls",
    ".xlsx",
    ".mp4",
    ".webp",
    ".csv",
  ];

  const deletedOptions = [
    { value: "restore", label: "Restore" },
    { value: "delete", label: "Delete" },
  ];
  const [showDelete, setShowDelete] = useState(false);
  const [showRestore, setShowRestore] = useState(false);

  const handleOptionSelect = (selectedOption) => {
    switch (selectedOption.value) {
      case "restore":
        setShowRestore(true);
      case "delete":
        setShowDelete(true);
      default:
        break;
    }
  };
  const handleCloseModal = () => {
    setShowDelete(false);
    setShowRestore(false);
  };

  const handledelete = () => {
  const itemName = selectedItem.name;
  const fileExtension = itemName.slice(
    ((itemName.lastIndexOf(".") - 1) >>> 0) + 2
  );

  if (ALLOWED_EXTENSIONS.includes(`.${fileExtension}`)) {
    fileDeletion(selectedItem.id);
  } else {
    folderDeletion(selectedItem.id);
  }
  };

  const handleRestore = () => {
  const itemName = selectedItem.name;

  // Get the file extension
  const fileExtension = itemName.slice(
    ((itemName.lastIndexOf(".") - 1) >>> 0) + 2
  );

  // Check if the file extension is in the allowed list
  if (ALLOWED_EXTENSIONS.includes(`.${fileExtension}`)) {
    restoreDeletedFile(selectedItem.id);
  } else {
    restoreDeletedFolder(selectedItem.id);
  }
  };

  return (
    <div>
      <Dropdown
        options={deletedOptions}
        onSelect={handleOptionSelect}
        plusIcon={false}
      />
      {showDelete && (
        <DeletModal onClose={handleCloseModal} onDelete={handledelete} />
      )}
      {showRestore && (
        <RestoreModal onClose={handleCloseModal} onRestore={handleRestore} />
      )}
    </div>
  );
};

export default DeletedDropdown;
