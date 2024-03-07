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
  const deletedOptions = [
    { value: "restore", label: "Restore" },
    { value: "delete", label: "Delete" },
  ];
  const [showDelete, setShowDelete] = useState(false);
  const [showRestore, setShowRestore] = useState(false);

  const handleOptionSelect = (selectedOption) => {
    switch (selectedOption.value) {
      case "restore":
        console.log("Restoring item:", selectedItem);
        setShowRestore(true);
      case "delete":
        console.log("Permanently deleting item:", selectedItem);
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
    if (
      itemName &&
      (itemName.endsWith(".jpg") ||
        itemName.endsWith(".png") ||
        itemName.endsWith(".pdf") ||
        itemName.endsWith(".mp3"))
    ) {
      fileDeletion(selectedItem.id);
    } else {
      folderDeletion(selectedItem.id);
    }
  };

  const handleRestore = () => {
    const itemName = selectedItem.name;
    if (
      itemName &&
      (itemName.endsWith(".jpg") ||
        itemName.endsWith(".png") ||
        itemName.endsWith(".pdf") ||
        itemName.endsWith(".mp3"))
    ) {
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
