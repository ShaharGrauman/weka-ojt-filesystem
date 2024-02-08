import React, { useEffect ,useState} from 'react';
import SideBar from "./SideBar.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";


const FileViewer = ({ filePath }) => {

  const [unsupportedFileType, setUnsupportedFileType] = useState(false);
  const [fileContent, setFileContent] = useState(null);

  useEffect(() => {
    if (filePath) {
      displayFile(filePath);
    } else {
      setFileContent(<p>No file selected.</p>);
    }
  }, [filePath]);


  const displayFile = (filePath) => {
    const fileExtension = filePath.split('.').pop().toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif'].indexOf(fileExtension) !== -1 || ['mp4', 'webm'].indexOf(fileExtension) !== -1) {
      setUnsupportedFileType(false);
      if (['jpg', 'jpeg', 'png', 'gif'].indexOf(fileExtension) !== -1) {
        setFileContent(<img src={filePath} className="img-fluid" alt="Opened Image" />);
      } else {
        setFileContent(<video controls className="w-100"><source src={filePath} type="video/mp4" />Your browser does not support the video tag.</video>);
      }
    } else if (fileExtension === 'pdf') {
      setFileContent(<embed src={filePath} type="application/pdf" width="100%" height="600px" />);
    } else {
      setFileContent(<p>Unsupported file type. Cannot display the file.</p>);
      setUnsupportedFileType(true);
      const myModal = new bootstrap.Modal(document.getElementById('myModal'));
      myModal.show();
    }
  };

  return (
    <>
    <div>
    <Header />
    <SideBar></SideBar>
    <div id="fileContainer">{fileContent}</div>
    
      <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Download File</h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              This file cannot be opened, you can download it.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Download</button>
              <button type="button" className="btn btn-light" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
    </>
  );
};

export default FileViewer;