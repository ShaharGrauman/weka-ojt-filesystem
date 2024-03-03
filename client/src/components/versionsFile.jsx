import React from 'react';
import VersionsDropdown from './VersionsDropdown';
const FileVersion = ({number, date, icon}) => (
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
      <VersionsDropdown/>
    </div>
  </div>
);

export default FileVersion;