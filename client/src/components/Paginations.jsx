import React from "react";
import Pagination from "react-bootstrap/Pagination";
import "../css/Paginations.css";

function Paginations({ itemsPerPage, totalItems, paginate }) {
  const pageNumbers = [];

  // Calculate the total number of pages
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-container">
      <Pagination>
        <Pagination.First onClick={() => paginate(1)} />

        {pageNumbers.map((number) => (
          <Pagination.Item key={number} onClick={() => paginate(number)}>
            {number}
          </Pagination.Item>
        ))}

        <Pagination.Last
          onClick={() => paginate(Math.ceil(totalItems / itemsPerPage))}
        />
      </Pagination>
    </div>
  );
}

export default Paginations;
