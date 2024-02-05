import React from 'react';
import Card from 'react-bootstrap/Card';
import HomeDropdown from './HomeDropdown';

const Item = ({ item }) => {
  const { fileName, lastUpdated, isFolder } = item;

  return (
    <div>
      <link href="https://cdn.lineicons.com/4.0/lineicons.css" rel="stylesheet" />
      <Card style={{ width: '18rem' }}>
        <a href="#">
          {isFolder ? (
            <i className="lni lni-folder" style={{ fontSize: '2rem', margin: '10px' }}></i>
          ) : (
            <i className="lni lni-empty-file" style={{ fontSize: '2rem', margin: '10px' }}></i>
          )}
        </a>
        <div className="text-right">
              <HomeDropdown onSelect={handleOptionSelect} />
        </div>
        <Card.Body>
          <Card.Title>{fileName}</Card.Title>
          <Card.Text>
            Last updated: {lastUpdated}.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};
const handleOptionSelect = (selectedOption) => {
  console.log('Selected option:', selectedOption);
  };
export default Item;