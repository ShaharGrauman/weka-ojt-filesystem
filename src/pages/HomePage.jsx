import React, { useState } from "react";
import Cards from "../components/Cards";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Paginations from "../components/Paginations";
import Toolbar from "../components/Toolbar";
import { Container, Row, Col } from "react-bootstrap";
import Item from "../components/Item";
import PlusDropdown from "../components/PlusOptions";
import "./HomePage.css";

const Data = {
  MyFiles: [
    { id: 1, fileName: "File 1", lastUpdated: "2022-02-05", isFolder: false },
    { id: 3, fileName: "Folder 2", lastUpdated: "2022-02-07", isFolder: true },
    { id: 5, fileName: "Folder 3", lastUpdated: "2022-02-06", isFolder: true },
  ],
  SharedFiles: [
    { id: 2, fileName: "Folder 1", lastUpdated: "2022-02-06", isFolder: true },
  ],
  DeletedFiles: [
    { id: 4, fileName: "File 2", lastUpdated: "2022-02-05", isFolder: false },
  ],
};

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const currentCategoryData =
    selectedCategory === "Home"
      ? [...Data.MyFiles, ...Data.SharedFiles]
      : Data[selectedCategory];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const styles = {
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", // Responsive grid columns
      gap: "20px", // Adjust gap according to your design
    },
  };

  return (
    <div>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Home Page</title>
      <Header />
      <Toolbar />

      <SideBar onSelect={handleCategorySelect} />

      <Container style={{ marginTop: "20px", marginBottom: "20px" }}>
        <Row className="justify-content-center">
          {" "}
          {/* Centering the content */}
          <Col xs={12} md={9} id="page-content-wrapper">
            <h1 className="text-center">Main Content</h1>{" "}
            {/* Centering the h1 element */}
            <div style={styles.container}>
              {currentCategoryData.map((item) => (
                <Item key={item.id} item={item} />
              ))}
            </div>
            <Paginations />
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default HomePage;
