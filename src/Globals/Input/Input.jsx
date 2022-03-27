import React from "react";
import "./Input.css";

export const Input = ({ name, type, placeholder, onChange }) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className="inputForm"
      value={undefined}
      onChange={onChange}
      id={name}
    ></input>
  );
};
