import React from "react";
import "./ButtonCancel.css";

export const ButtonCancel = ({ onClick, name, type }) => {
  return (
    <button onClick={onClick} type={type} className="buttonCancel">
      {name}
    </button>
  );
};
