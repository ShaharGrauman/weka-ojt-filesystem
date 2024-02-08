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
    { id: 1, fileName: "File 1", lastUpdated: "2022-02-05", isFolder: false ,filePath:"../Image/photo.png"},
    { id: 3, fileName: "Folder 2", lastUpdated: "2022-02-07", isFolder: true },
    { id: 5, fileName: "Folder 3", lastUpdated: "2022-02-06", isFolder: true },
  ],
  SharedFiles: [
    { id: 2, fileName: "Folder 1", lastUpdated: "2022-02-06", isFolder: true },
  ],
  DeletedFiles: [
    { id: 4, fileName: "File 2", lastUpdated: "2022-02-05", isFolder: false, filePath:"../Image/logo.png"},
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
      <Container className={isOpen ? "sidebar-open" : ""}>
        <Header />
      </Container>
      <Container
        style={{ marginTop: "20px", marginBottom: "20px" }}
        className={isOpen ? "sidebar-open" : ""}
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
        className={isOpen ? "sidebar-open" : ""}
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
      <Container className={isOpen ? "sidebar-open" : ""}>
        <Footer />
      </Container>
    </div>
  );
};

export default HomePage;
