import React from 'react';
import Dropdown from './dropdown';
import FileDetailsModal from './details';
const HomeDropdown = ({ onSelect }) => {
  const homeOptions = [
    { value: 'download', label: 'Download' },
    { value: 'move', label: 'Move' },
    { value: 'share', label: 'Share' },
    { value: 'rename', label: 'Rename' },
    { value: 'delete', label: 'Delete' },
    { value: 'versions', label: 'Versions' },
    { value: 'details', label: 'Details' },
  ];
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
  
// const handleOptionSelect = (selectedOption) => {
//   console.log('Selected option:', selectedOption);
//   switch(selectedOption){
//     case "download":
//       navigate("/homepage");
//       break;
//     case "move":
//       navigate("/homepage");
//       break;

//     case "share":
//       navigate("/homepage");
//       break;

//     case "rename":
//       navigate("/homepage");
//       break;
//     case "delete":
//       navigate("/homepage");   
//       break;

//     case "versions":
//       navigate("/homepage");
//       break;

//     case "details":
//       navigate(FileDetailsModal);
//       break;

//   }
// };

// return <Dropdown options={homeOptions} onSelect={handleOptionSelect} plusIcon={false} />;



  // State to manage modals
  const [showModal, setShowModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  // Function to handle option selection
  const handleOptionSelect = (selectedOption) => {
    console.log('Selected option:', selectedOption);

    // Set the selected option and show the corresponding modal
    setSelectedOption(selectedOption);
    setShowModal(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    // Reset the selected option and hide the modal
    setSelectedOption(null);
    setShowModal(false);
  };

  return (
    <>
      <Dropdown options={homeOptions} onSelect={handleOptionSelect} plusIcon={false} />

      {/* Render different modals based on the selected option */}
      {selectedOption === 'download' && (
        <DownloadModal showModal={showModal} onClose={handleCloseModal} />
      )}
      {selectedOption === 'move' && <MoveModal showModal={showModal} onClose={handleCloseModal} />}
      {selectedOption === 'share' && (
        <ShareModal showModal={showModal} onClose={handleCloseModal} />
      )}
      {selectedOption === 'rename' && (
        <RenameModal showModal={showModal} onClose={handleCloseModal} />
      )}
      {selectedOption === 'delete' && (
        <DeleteModal showModal={showModal} onClose={handleCloseModal} />
      )}
      {selectedOption === 'versions' && (
        <VersionsModal showModal={showModal} onClose={handleCloseModal} />
      )}
      {selectedOption === 'details' && (
        <FileDetailsModal showModal={showModal} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default HomeDropdown;