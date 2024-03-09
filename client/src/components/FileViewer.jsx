import React, { useEffect, useState } from "react";
import Download from "./Download";
import { download } from "../Dal/data.js";
const FileViewer = ({ fileId, filePath, fileName }) => {
  const [fileContent, setFileContent] = useState(null);
  const [showDownload, setshowDownload] = useState(false);

  useEffect(() => {
    if (filePath) {
      displayFile(filePath, fileName);
    } else {
      setFileContent(<p>No file selected.</p>);
    }
  }, [filePath]);

  const handleCloseModal = () => {
    setshowDownload(false);
  };

  const handleShowModal = () => {
    setshowDownload(true);
  };

  const handleDownload = () => {
    download(fileId);
    handleCloseModal();
  };

  const displayFile = (filePath, fileName) => {
    const fileExtension = fileName.split(".").pop().toLowerCase();

    if (
      ["jpg", "jpeg", "png", "gif"].indexOf(fileExtension) !== -1 ||
      ["mp4", "webm"].indexOf(fileExtension) !== -1
    ) {
      if (["jpg", "jpeg", "png", "gif"].indexOf(fileExtension) !== -1) {
        setFileContent(
          <>
            <p>{fileName}</p>
            <img src={filePath} className="img-fluid" alt="Opened Image" />
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleShowModal}
              style={{ marginTop: "10px" }}
            >
              {" "}
              Download
            </button>
          </>
        );
      } else {
        setFileContent(
          <>
            {" "}
            <p>{fileName}</p>
            <video controls className="w-100">
              <source src={filePath} type="video/mp4" />
            </video>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleShowModal}
              style={{ marginTop: "10px" }}
            >
              {" "}
              Download
            </button>
          </>
        );
      }
    } else {
      setFileContent(
        <>
          <embed type="application/pdf" width="100%" height="600px" />
          <p>
            Unsupported file type. Cannot display the file. you can{" "}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleShowModal}
            >
              Download it
            </button>
          </p>
        </>
      );
    }
  };
  return (
    <div id="fileContainer" className="position-relative">
      {fileContent}
      {showDownload && (
        <Download
          show={showDownload}
          onClose={handleCloseModal}
          onDownload={handleDownload}
          downloadUrl={filePath}
        />
      )}
    </div>
  );
};

export default FileViewer;
