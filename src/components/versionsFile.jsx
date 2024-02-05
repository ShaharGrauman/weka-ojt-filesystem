import React from 'react';

const FileVersion = ({ number, date, icon, dropdownItems }) => (
  <div className="row">
    <div className="col-3 col-md-3 col-sm-3">
      <p>{number}</p>
    </div>
    <div className="col-3 col-md-3 col-sm-3">
      <p>{date}</p>
    </div>
    <div className="col-3 col-md-3 col-sm-3">
      {icon}
    </div>
    <div className="col-3 col-md-3 col-sm-3">
      <div className="dropdown dropend">
        <i className="bi bi-three-dots-vertical" data-bs-toggle="dropdown" aria-expanded="false"></i>
        <ul className="dropdown-menu">
          {dropdownItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default FileVersion;