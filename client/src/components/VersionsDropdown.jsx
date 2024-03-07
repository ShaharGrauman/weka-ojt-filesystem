import React from "react";
import Dropdown from "./dropdown";

const VersionsDropdown = (itemID) => {
  const [showdelete, setshowdelete] = useState(false);
  const [showDownload, setshowDownload] = useState(false);

  const versionsOptions = [
    { value: "download", label: "Download" },
    { value: "delete", label: "Delete" },
  ];

  const handleOptionSelect = (selectedOption) => {
    if (selectedOption.value === "delete") {
      setshowdelete(true);
    } else if (selectedOption.value === "download") {
      setshowDownload(true);
    }
  };

  const handleCloseModal = () => {
    setshowdelete(false);
    setshowDownload(false);
  };

  const handledelete = (itemID) => {
    if (
      selectedItem.name.endsWith(".jpg") ||
      selectedItem.name.endsWith(".png") ||
      selectedItem.name.endsWith(".pdf") ||
      selectedItem.name.endsWith(".mp3")
    ) {
      fileDeletion(itemID);
    } else {
      folderDeletion(itemID);
    }
  };

  return (
    <div>
      <Dropdown
        options={versionsOptions}
        onSelect={handleOptionSelect}
        plusIcon={false}
      />
      {showdelete && (
        <DeleteModal
          onClose={handleCloseModal}
          OnDelete={handledelete}
          itemId={itemID}
        />
      )}
      {showDownload ? (
        <Download show={showDownload} onClose={handleCloseModal} />
      ) : null}
    </div>
  );
};

export default VersionsDropdown;
