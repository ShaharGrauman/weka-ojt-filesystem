import React from "react";
import Card from "react-bootstrap/Card";
import HomeDropdown from "./HomeDropdown";
import DeletedDropdown from "./DeletedDropdown";

const Item = ({ item, onSelect, showversion }) => {
  const userId = 1;
  const handleItemClick = () => {
    onSelect(item); // Pass the clicked file item to the parent componen
  };
  const isFile = item.name.includes('.');
  return (
    <div>
      <link
        href="https://cdn.lineicons.com/4.0/lineicons.css"
        rel="stylesheet"
      />
      <Card style={{ width: "18rem" }}>
        <div className="text-right">
          {item.is_deleted ? (
            <DeletedDropdown selectedItem={item} />
          ) : (
            <HomeDropdown selectedItem={item} showversion={showversion} />
          )}
        </div>
        <a href="#" onClick={handleItemClick}>
            {isFile ? (
            <i
              className="lni lni-empty-file"
              style={{ fontSize: "2rem", margin: "10px" }}
            ></i>
          ) : (
            <i
              className="lni lni-folder"
              style={{ fontSize: "2rem", margin: "10px" }}
            ></i>
          )}
        </a>

        <Card.Body>
          <Card.Title>{item.name}</Card.Title>
          <Card.Text>
            {" "}
            Last updated: {item.upload_date.split("T")[0]}.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Item;
