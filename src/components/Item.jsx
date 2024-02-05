import React from 'react';
import Card from 'react-bootstrap/Card';

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

export default Item;