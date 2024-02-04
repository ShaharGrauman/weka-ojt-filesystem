import React from 'react';
import { FormCheck } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder } from '@fortawesome/free-solid-svg-icons';

function CustomRadioButton(props) {
  return (
    <FormCheck
      type="radio"
      id={props.id}
      name={props.name}  // Make sure 'name' is unique for each radio button group
      label={
        <span>
          <FontAwesomeIcon className="fs-1 text-primary" icon={faFolder} /> {props.label}
        </span>
      }
      checked={props.checked}
      onChange={props.onChange}
    />
  );
}

export default CustomRadioButton;