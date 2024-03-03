import React from "react";

const Dropdown = ({ options, onSelect, plusIcon }) => {
  return (
    <div className="dropdown dropend">
      {plusIcon ? (
        <button
          className="btn btn-secondary"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="lni lni-circle-plus" />
        </button>
      ) : (
        <i
          className="bi bi-three-dots-vertical"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        />
      )}

      <ul className="dropdown-menu">
        {options.map((option) => (
          <li key={option.value}>
            <span className="dropdown-item" onClick={() => onSelect(option)}>
              <i className={`bi bi-${getIconForOption(option.value)} mx-2`} />
              {option.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Function to get the appropriate icon for each option
const getIconForOption = (optionValue) => {
  switch (optionValue) {
    case "download":
      return "box-arrow-in-down";
    case "share":
      return "share";
    case "rename":
      return "pencil-square";
    case "move":
      return "arrows-move";
    case "delete":
      return "trash";
    case "details":
      return "info-circle-fill";
    case "restore":
      return "arrow-counterclockwise";
    case "versions":
      return "card-list";
    case "upload":
      return "cloud-upload";
    case "newfolder":
      return "cloud-plus-fill";
  }
};

export default Dropdown;
