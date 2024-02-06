import React  from "react";
import Card from "react-bootstrap/Card";
import HomeDropdown from "./HomeDropdown";

const Item = ({ item, onSelect}) => {
  const handleDropdownSelect = () => {
    onSelect(item); // Pass the clicked item to the parent component
  };
  return (
    <div>
      <link
        href="https://cdn.lineicons.com/4.0/lineicons.css"
        rel="stylesheet"
      />
      <Card style={{ width: "18rem" }}>
        <div className="text-right">
          <HomeDropdown selectedItem={item}/>
        </div>
        <a href="#" >
          {/* Render folder icon if isFolder is true, otherwise render empty file icon */}
          {item.isFolder ? (
            <i
              className="lni lni-folder"
              style={{ fontSize: "2rem", margin: "10px" }}
            ></i>
          ) : (
            <i
              className="lni lni-empty-file"
              style={{ fontSize: "2rem", margin: "10px" }}> </i>
          )}
        </a>

        <Card.Body>
          <Card.Title>{item.fileName}</Card.Title>
          <Card.Text>Last updated: {item.lastUpdated}.</Card.Text>
        </Card.Body>
     </Card>
   </div>
  );
};

export default Item;
