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
  MyFiles: [
    {
      id: 1,
      fileName: "photo.png",
      lastUpdated: "2022-02-05",
      isFolder: false,
      filePath: "../Image/photo.png",
      is_deleted: false,
      is_version: true,
    },
    { id: 7, 
      fileName: "file.pdf",
      lastUpdated: "2022-02-05",
      isFolder: false, 
      filePath:"../Image/file.pdf",
      is_deleted: false,
      is_version: true},
    {
      id: 3,
      fileName: "photos",
      lastUpdated: "2022-02-07",
      isFolder: true,
      filePath: "../files/photos",
      is_deleted: false,
      is_version: false,
    },
    {
      id: 5,
      fileName: "docs",
      lastUpdated: "2022-02-06",
      isFolder: true,
      filePath: "../files/docs",
      is_deleted: false,
      is_version: false,
    },
  ],
  SharedFiles: [
    {
      id: 2,
      fileName: "photos",
      lastUpdated: "2022-02-06",
      isFolder: true,
      filePath: "../shared/photos",
      is_deleted: false,
      is_version: false,
    },
  ],
  DeletedFiles: [
    {
      id: 4,
      fileName: "memories.mp4",
      lastUpdated: "2022-02-05",
      isFolder: false,
      filePath: "../Image/memories.mp4",
      is_deleted: true,
      is_version: false,
    },
  ],
};

const HomePage = (props) => {
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
        <Item key={item.id} item={item} showversion={showversion} onSelect={() => handleItemClick(item)} />
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
