import React,{ useState }  from "react";
import Card from "react-bootstrap/Card";
import HomeDropdown from "./HomeDropdown";
import ItemDropDown from "./ItemDropDown";

const Item = ({ item }) => {
  // Destructure properties from the 'item' prop
//   const { fileName, lastUpdated, isFolder } = item;

  const [selectedItem, setSelectedItem] = useState(null);
  const handleItemClick = () => {
    setSelectedItem(item);
  };
  return (
    <div>
      <link
        href="https://cdn.lineicons.com/4.0/lineicons.css"
        rel="stylesheet"
      />
      <Card style={{ width: "18rem" }}>
        <div className="text-right">
          <HomeDropdown selectedItem={selectedItem}/>
        </div>
        <a href="#" onClick={handleItemClick}>
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
