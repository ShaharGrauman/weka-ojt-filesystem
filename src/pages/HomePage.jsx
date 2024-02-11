import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Paginations from "../components/Paginations";
import Toolbar from "../components/Toolbar";
import { Container, Row, Col } from "react-bootstrap";
import Item from "../components/Item";
import FileViewer from "../components/FileViewer";
import "./HomePage.css";

const Data = {
  MyFiles: [
    { id: 1, fileName: "photo.png", lastUpdated: "2022-02-05", isFolder: false ,filePath:"../Image/photo.png", is_deleted: false,is_version: true},
    { id: 3, fileName: "photos", lastUpdated: "2022-02-07", isFolder: true ,filePath:"../files/photos", is_deleted: false,is_version: false},
    { id: 5, fileName: "docs", lastUpdated: "2022-02-06", isFolder: true ,filePath:"../files/docs", is_deleted: false,is_version: false},
  ],
  SharedFiles: [
    { id: 2, fileName: "photos", lastUpdated: "2022-02-06", isFolder: true ,filePath:"../shared/photos", is_deleted: false,is_version: false },
  ],
  DeletedFiles: [
    { id: 4, fileName: "memories.mp4", lastUpdated: "2022-02-05", isFolder: false, filePath:"../Image/memories.mp4", is_deleted: true,is_version: false },
  ],
};

const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const currentCategoryData =
    selectedCategory === "Home"
      ? [...Data.MyFiles, ...Data.SharedFiles]
      : Data[selectedCategory];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedItem(null);
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
            {selectedItem ? (
              // Render the FileViewer component if an item is selected
              <FileViewer filePath={selectedItem.filePath} />
            ) : (
            <div className="item-container">
              {currentCategoryData.map((item) => (
                <Item key={item.id} item={item} onSelect={() => handleItemClick(item)} />
              ))}
            </div>
            )}
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
