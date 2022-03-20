import React from "react";
import "./Input.css";

export const Input = ({ name, type, placeholder, value, onChange }) => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className="inputForm"
      value={value}
      onChange={onChange}
      id={name}
    ></input>
  );
};