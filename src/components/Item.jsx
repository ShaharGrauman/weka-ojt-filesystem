import React  from "react";
import Card from "react-bootstrap/Card";
import HomeDropdown from "./HomeDropdown";
import DeletedDropdown from "./DeletedDropdown"
const Item = ({ item, onSelect,showversion}) => {

  const handleItemClick = () => {
//     if (!item.isFolder) {
//       onSelect(item); // Pass the clicked file item to the parent component
//     }
      onSelect(item); // Pass the clicked file item to the parent componen
  };
  
  return (
    <div>
      <link
        href="https://cdn.lineicons.com/4.0/lineicons.css"
        rel="stylesheet"
      />
      <Card style={{ width: "18rem" }}>
        <div className="text-right">
          {item.is_deleted?(<DeletedDropdown selectedItem={item}/>):
          (<HomeDropdown selectedItem={item} showversion={showversion} />)}
        </div>
        <a href="#" onClick={handleItemClick}>
          {/* Render folder icon if isFolder is true, otherwise render empty file icon */}

            <i
              className="lni lni-empty-file"
              style={{ fontSize: "2rem", margin: "10px" }}
            ></i>


        </a>

        <Card.Body>
          <Card.Title>{item.file_name}</Card.Title>
          <Card.Text>  Last updated: {item.upload_date ? item.upload_date.toLocaleDateString().toString() : 'Unknown'}.</Card.Text>
        </Card.Body>
     </Card>
   </div>
  );
};

export default Item;
