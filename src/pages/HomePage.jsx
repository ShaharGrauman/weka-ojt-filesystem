import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Paginations from "../components/Paginations";
import Toolbar from "../components/Toolbar";
import Path from "../components/Path";
import { Container, Row, Col } from "react-bootstrap";
import Item from "../components/Item";
import FileViewer from "../components/FileViewer";
import VersionsList from "../components/VersionsList ";
import "./HomePage.css";
import { getMyFiles,getMyDeletedFiles,getMySharedFiles } from "../Dal/data.js";

const versionData = [
  {
    number: 1,
    date: "2023-01-15",
    dropdownItems: ["Download", "View Details", "Delete"]
  },
  {
    number: 2,
    date: "2023-02-20",
    dropdownItems: ["Download", "View Details"]
  },
  {
    number: 3,
    date: "2023-03-25",
    dropdownItems: ["Download", "View Details", "Share"]
  }
];

const Data = {
  MyFiles: getMyFiles(1),
  SharedFiles: getMySharedFiles(1),
  DeletedFiles:getMyDeletedFiles(1)
};

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVersion, setisVersion] = useState(true);
  const [showitems, setshowitems] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
 const showversion = (items,version) => {
    setshowitems(items)
    setisVersion(version);

  };
  const currentCategoryData =
    selectedCategory === "Home"
      ? [...Data.MyFiles, ...Data.SharedFiles]
      : Data[selectedCategory];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedItem(null);
    showversion(true,false)
  };

  const handleItemClick = (item) => {
    setSelectedItem(item); // Set the selected item when an item is clicked
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
    <h1 className="text-center">Main Content</h1>
{showitems ?
  (selectedItem ?
    <FileViewer filePath={selectedItem.filePath} />
    :
    <div className="item-container">
      {currentCategoryData.map((item) => (
        <Item key={item.file_id} item={item} showversion={showversion} onSelect={() => handleItemClick(item)} />
      ))}
    </div>
  )
  :
  (isVersion ?
    <VersionsList versionData={versionData} />
    :
    null
  )
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
