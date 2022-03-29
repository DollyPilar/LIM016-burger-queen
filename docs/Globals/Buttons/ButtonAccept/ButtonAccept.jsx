import React from "react";
import "./ButtonAccept.css";

export const ButtonAccept = ({ onClick, name, type }) => {
  return (
    <button onClick={onClick} type={type} className="buttonAccept">
      {name}
    </button>
  );
};
