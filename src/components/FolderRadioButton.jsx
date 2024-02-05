import React from "react";
import CustomRadioButton from "./CustomRadioButton";

const FolderRadioButton = ({ id, name, label, checked, onChange }) => {
  return (
    <CustomRadioButton
      id={id}
      name={name}
      label={label}
      checked={checked}
      onChange={onChange}
    />
  );
};

export default FolderRadioButton;
