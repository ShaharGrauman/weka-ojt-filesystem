import React from "react";
import { FormCheck } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";

function CustomRadioButton(props) {
  return (
    <FormCheck
      type="radio"
      name={props.name}
      label={
        <span>
          <FontAwesomeIcon className="fs-1 text-primary" icon={props.icon} />{" "}
          {props.label}
        </span>
      }
      id={props.id}
    />
  );
}

export default CustomRadioButton;
