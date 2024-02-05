import React from "react";
import Card from "react-bootstrap/Card";
import HomeDropdown from "./HomeDropdown";

const Item = ({ item }) => {
  // Destructure properties from the 'item' prop
  const { fileName, lastUpdated, isFolder } = item;

  return (
    <div>
      {/* Include the LineIcons CSS */}
      <link
        href="https://cdn.lineicons.com/4.0/lineicons.css"
        rel="stylesheet"
      />

      {/* Render a Bootstrap Card */}
      <Card style={{ width: "18rem" }}>
        {/* Link to '#' */}

        {/* Render HomeDropdown component for additional actions */}
        <div className="text-right">
          <HomeDropdown />
        </div>
        <a href="#">
          {/* Render folder icon if isFolder is true, otherwise render empty file icon */}
          {isFolder ? (
            <i
              className="lni lni-folder"
              style={{ fontSize: "2rem", margin: "10px" }}
            ></i>
          ) : (
            <i
              className="lni lni-empty-file"
              style={{ fontSize: "2rem", margin: "10px" }}
            ></i>
          )}
        </a>

        {/* Card body */}
        <Card.Body>
          {/* Render file name */}
          <Card.Title>{fileName}</Card.Title>

          {/* Render last updated date */}
          <Card.Text>Last updated: {lastUpdated}.</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Item;
