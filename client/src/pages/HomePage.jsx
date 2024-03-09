import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Paginations from "../components/Paginations";
import Toolbar from "../components/Toolbar";
import Path from "../components/Path";
import { Container, Row, Col } from "react-bootstrap";
import Item from "../components/Item";
import FileViewer from "../components/FileViewer";
import VersionsList from "../components/VersionsList.jsx";

import "./HomePage.css";
import {
  getMyFiles,
  getMyDeletedFiles,
  getMySharedFiles,
} from "../Dal/data.js";

const versionData = [
  {
    number: 1,
    date: "2023-01-15",
    dropdownItems: ["Download", "View Details", "Delete"],
  },
  {
    number: 2,
    date: "2023-02-20",
    dropdownItems: ["Download", "View Details"],
  },
  {
    number: 3,
    date: "2023-03-25",
    dropdownItems: ["Download", "View Details", "Share"],
  },
];

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
//   const [isVersion, setIsVersion] = useState(true);
  const [showItems, setShowItems] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const [selectedItem, setSelectedItem] = useState(null);
  const [myFiles, setMyFiles] = useState([]);
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [sharedFiles, setSharedFiles] = useState([]);
  const [showVersions, setShowVersions] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const myFilesData = await getMyFiles();
      const deletedFilesData = await getMyDeletedFiles();
      const sharedFilesData = await getMySharedFiles();

      setMyFiles(myFilesData);
      setDeletedFiles(deletedFilesData);
      setSharedFiles(sharedFilesData);
    };
    fetchData();
  }, [myFiles, deletedFiles, sharedFiles]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const showVersion = (item) => {
    setSelectedItem(item);
    setShowVersions(true);
    setShowItems(false);
    console.log("1234")
  };
  const currentCategoryData =
    selectedCategory === "Home"
      ? [...myFiles, ...sharedFiles]
      : selectedCategory === "MyFiles"
      ? myFiles
      : selectedCategory === "DeletedFiles"
      ? deletedFiles
      : sharedFiles;

  const handleCategorySelect = (category) => {
    setShowVersions(false);
    setSelectedCategory(category);
    setSelectedItem(null);
    setShowItems(true)
  };

  const handleItemClick = (item) => {
    setShowVersions(false);
    setSelectedItem(item);
  };

  return (
    <div>
      <meta charSet="UTF-8" />
      <Container className={isOpen ? "sidebar-open" : "sidebar-close"}>
        <Header />
      </Container>
      <Container
        style={{ marginTop: "20px", marginBottom: "20px" }}
        className={isOpen ? "sidebar-open" : "sidebar-close"}
      >
        <Toolbar />
      </Container>

      <Container
        style={{ marginTop: "20px", marginBottom: "20px" }}
        className={isOpen ? "sidebar-open" : "sidebar-close"}
      >
        <Path />
      </Container>

      <SideBar
        onSelect={handleCategorySelect}
        isOpen={isOpen}
        toggleSidebar={toggleSidebar}
      />
      <Container
        style={{ marginTop: "20px", marginBottom: "20px" }}
        className={isOpen ? "sidebar-open" : "sidebar-close"}
      >
        <Row className="justify-content-center">
          <Col xs={12} md={9} id="page-content-wrapper">
            {showItems ? (
              selectedItem ? (
                <FileViewer
                  fileId={selectedItem.id}
                  filePath={selectedItem.path}
                  fileName={selectedItem.name}
                />
              ) : currentCategoryData.length > 0 ? (
                <div className="item-container">
                  {currentCategoryData.map((item) => (
                    <Item
                      key={item.id}
                      id={item.id}
                      item={item}
                      showVersion={() => showVersion(item)}
                      onSelect={() => handleItemClick(item)}
                    />
                  ))}
                </div>
              ) : (
                <p>No items found.</p>
              )
            ) : showVersions ? (
              <VersionsList item={selectedItem} />
            ) : <p>no versions found</p>
            }
            <Paginations />
          </Col>
        </Row>
      </Container>
      <Container className={isOpen ? "sidebar-open" : "sidebar-close"}>
        <Footer />
      </Container>
    </div>
  );
};

export default HomePage;
