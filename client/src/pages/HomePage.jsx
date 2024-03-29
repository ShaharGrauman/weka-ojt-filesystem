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
import { get_name } from "../Dal/data.js"; // Importing getFileVersions function
import axios from "axios";

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
  const [sortBy, setSortBy] = useState(""); // Track the sorting criteria
  const [sortedFiles, setSortedFiles] = useState([]); // Store the sorted list of files
  const [searchFiles, setsearchFiles] = useState([]); // Store the sorted list of files
  const [username, setUsername] = useState("");
  const [currentCategoryData, setcurrentCategoryData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Define items per page

  // useEffect to update currentCategoryData when selectedCategory changes
  useEffect(() => {
    // Function to set currentCategoryData based on selectedCategory
    const setCurrentData = () => {
      if (selectedCategory === "Home") {
        setcurrentCategoryData([...myFiles, ...sharedFiles]);
      } else if (selectedCategory === "MyFiles") {
        setcurrentCategoryData(myFiles);
      } else if (selectedCategory === "DeletedFiles") {
        setcurrentCategoryData(deletedFiles);
      } else if (selectedCategory === "SharedFiles") {
        setcurrentCategoryData(sharedFiles);
      }
    };

    // Call the function to set currentCategoryData when selectedCategory changes
    setCurrentData();
  }, [selectedCategory, myFiles, deletedFiles, sharedFiles]);

  const fetchUsername = async () => {
    // Example: fetch username from an API
    const response = await get_name();
    setUsername(response);
  };

  // Call fetchUsername when component mounts
  useEffect(() => {
    fetchUsername();
  }, []);

  const handleSearch = (searchTerm) => {
    const filteredData = currentCategoryData.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setcurrentCategoryData(filteredData);
  };

  const handleSort = (criteria) => {
    setSortBy(criteria);
    if (criteria === "name") {
      currentCategoryData.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      );
    } else if (criteria === "date") {
      currentCategoryData.sort((a, b) =>
        a.upload_date < b.upload_date ? 1 : -1
      );
    }
  };

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
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const showVersion = (item) => {
    setSelectedItem(item);
    setShowVersions(true);
    setShowItems(false);
    console.log("1234");
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  // Calculate the index of the last item being displayed
  const indexOfLastItem = currentPage * itemsPerPage;
  // Calculate the index of the first item being displayed
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // Slice the array to display only the items for the current page
  const currentItems = currentCategoryData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleCategorySelect = (category) => {
    setShowVersions(false);
    setSelectedCategory(category);
    setSelectedItem(null);
    setShowItems(true);
    setCurrentPage(1);
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
        style={{ marginTop: "2px", marginBottom: "2px" }}
        className={isOpen ? "sidebar-open" : "sidebar-close"}
      >
        <Toolbar onSort={handleSort} onSearch={handleSearch} />
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
              ) : currentItems.length > 0 ? (
                <div className="item-container">
                  {currentItems.map((item) => (
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
            ) : (
              <p>no versions found</p>
            )}
            <Paginations
              itemsPerPage={itemsPerPage}
              totalItems={currentCategoryData.length}
              paginate={paginate}
            />
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
