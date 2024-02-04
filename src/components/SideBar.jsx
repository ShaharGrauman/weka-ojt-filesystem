// Sidebar.js

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileAlt,
  faShareAlt,
  faTrashAlt,
  faSignOutAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import "./Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <button className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul className="list-unstyled components">
        <li>
          <a href="#">
            <FontAwesomeIcon icon={faHome} />
            <span className={isOpen ? "item-name" : "item-name-hidden"}>
              Home
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <FontAwesomeIcon icon={faFileAlt} />
            <span className={isOpen ? "item-name" : "item-name-hidden"}>
              My Files
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <FontAwesomeIcon icon={faShareAlt} />
            <span className={isOpen ? "item-name" : "item-name-hidden"}>
              Shared Files
            </span>
          </a>
        </li>
        <li>
          <a href="#">
            <FontAwesomeIcon icon={faTrashAlt} />
            <span className={isOpen ? "item-name" : "item-name-hidden"}>
              Deleted Files
            </span>
          </a>
        </li>
      </ul>
      <button className={`logout-btn ${isOpen ? "open" : "closed"}`}>
        <FontAwesomeIcon icon={faSignOutAlt} />
        <span className="logout-name">Logout</span>
      </button>
    </div>
  );
};

export default Sidebar;