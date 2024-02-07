import React, { useState } from "react";
import Dropdown from "./dropdown";
import Share from "./Share";
import FileDetailsModal from "./details";
import Move_file from "./move_file";
import RenameFile from "./RenameFile";

const HomeDropdown = ({ selectedItem }) => {
  const [showMoveFile, setShowMoveFile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRenameFile, setShowRenameFile] = useState(false);
  const [showShare, setShowShare] = useState(false);

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
      setShowModal(true); // Show the modal when "Details" option is selected
    } else if (selectedOption.value === "share") {
      setShowShare(true);
    } else if (selectedOption.value === "move") {
      setShowMoveFile(true);
    } else if (selectedOption.value === "rename") {
      setShowRenameFile(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowMoveFile(false);
    setShowRenameFile(false);
    setShowShare(false);
  };

  return (
    <div>
      <Dropdown
        options={homeOptions}
        onSelect={handleOptionSelect}
        plusIcon={false}
      />
      {showModal && (
        <FileDetailsModal
          showModal={showModal}
          onClose={handleCloseModal}
          fileDetails={selectedItem}
        />
      )}
      {showMoveFile ? (
        <Move_file folders={folders} onClose={handleCloseModal} />
      ) : null}

      {showRenameFile && <RenameFile onClose={handleCloseModal} />}

      {showShare ? <Share onClose={handleCloseModal} /> : null}
    </div>
  );
};

export default HomeDropdown;
