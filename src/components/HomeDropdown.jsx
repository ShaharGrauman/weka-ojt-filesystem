import React, { useState } from "react";
import Dropdown from "./dropdown";
import Share from "./Share";
import FileDetailsModal from "./details";
import Move_file from "./move_file";
import RenameFile from "./RenameFile";
import DeleteModal from "./DeletModal";
import Download from "./Download";

const HomeDropdown = ({selectedItem ,showversion,userId}) => {
  const [showMoveFile, setShowMoveFile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRenameFile, setShowRenameFile] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showdelete, setshowdelete] = useState(false);
  const [showDownload, setshowDownload] = useState(false);
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

//    const { updateState } = showversion;
//   const showversion = () => {
//     // Your conditions here
//     updateState(false,true);
//   };

  const handleOptionSelect = (selectedOption) => {
    if (selectedOption.value === "details") {
      setShowModal(true); // Show the modal when "Details" option is selected
    } else if (selectedOption.value === "share") {
      setShowShare(true);
    } else if (selectedOption.value === "move") {
      setShowMoveFile(true);
    } else if (selectedOption.value === "rename") {
      setShowRenameFile(true);
    } else if (selectedOption.value === "delete") {
      setshowdelete(true);
    } else if (selectedOption.value === "download") {
      setshowDownload(true);
    } else if (selectedOption.value === "versions") {
           showversion(false,true)
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowMoveFile(false);
    setShowRenameFile(false);
    setshowdelete(false);
    setShowShare(false);
    setshowDownload(false);
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
      {showdelete && <DeleteModal onClose={handleCloseModal} itemId= {selectedItem.itemId} userId={userId}/>}

      {showShare ? <Share onClose={handleCloseModal} /> : null}
      {showDownload ? (
        <Download show={showDownload} onClose={handleCloseModal} />
      ) : null}
    </div>
  );
};

export default HomeDropdown;
