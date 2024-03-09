import React, { useState } from "react";
import Dropdown from "./dropdown";
import Share from "./Share";
import FileDetailsModal from "./details";
import Move_file from "./move_file";
import RenameFile from "./RenameFile";
import DeleteModal from "./DeletModal";
import Download from "./Download";
import {
  delete_file,
  delete_folder,
  moveFile,
  getMyFolders,
  download,renameFile
} from "../Dal/data.js";

const HomeDropdown = ({ selectedItem, showVersions }) => {
  const [showMoveFile, setShowMoveFile] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showRenameFile, setShowRenameFile] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showdelete, setshowdelete] = useState(false);
  const [showDownload, setshowDownload] = useState(false);
  const [folders, setFolders] = useState([]);
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
      console.log(selectedItem)
    } else if (selectedOption.value === "move") {
      setFolders(getMyFolders(selectedItem.folder_id));
      setShowMoveFile(true);
    } else if (selectedOption.value === "rename") {
      setShowRenameFile(true);
    } else if (selectedOption.value === "delete") {
      setshowdelete(true);
    } else if (selectedOption.value === "download") {
      setshowDownload(true);
    } else if (selectedOption.value === "versions") {
      showVersions(selectedItem.id);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setShowRenameFile(false);
    setshowdelete(false);
    setShowShare(false);
    setshowDownload(false);
    setShowMoveFile(false);
  };

  const handleMove = (targetFolderId) => {
    moveFile(selectedItem.id, targetFolderId);
    setShowMoveFile(false);
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
      delete_file(selectedItem.id);
    } else {
      delete_folder(selectedItem.id);
    }
  };

  const handleDownload = () => {
    download(selectedItem.id);
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
        <Move_file
          folders={folders}
          onMove={handleMove}
          onClose={handleCloseModal}
        />
      ) : null}

      {showRenameFile && (
      <RenameFile
      fileId={selectedItem.id}
      onClose={handleCloseModal}
      />
      )}

      {showdelete && (
        <DeleteModal
          onClose={handleCloseModal}
          onDelete={handledelete}
          itemId={selectedItem.id}
        />
      )}

      {showShare ? <Share onClose={handleCloseModal} selectedItem={selectedItem} /> : null}

      {showDownload ? (
        <Download
          show={showDownload}
          onClose={handleCloseModal}
          onDownload={handleDownload}
        />
      ) : null}
    </div>
  );
};

export default HomeDropdown;
