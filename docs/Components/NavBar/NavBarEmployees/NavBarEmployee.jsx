import React, { useRef, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { auth } from "../../../firebase/firebase-config.jsx";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./NavBarEmployee.css";

export const NavBarEmployee = ({ text, nameEmployee }) => {
  // console.log(userState);
  const navigate = useNavigate();
  const isMounted = useRef(true);
  const logOut = () => {
    if (isMounted.current) {
      signOut(auth);
      navigate("/");
    }
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return (
    <React.Fragment>
      <div className="navBarContainerEmployee">
        <div className="highBarEmployee">
          <h3 className="infoEmployee">{text}</h3>
        </div>
        <div className="highBarEmployee">
          <h3 className="infoEmployee">{nameEmployee}</h3>

          <FaSignOutAlt className="navBarIconEmployee" onClick={logOut} />
        </div>
      </div>
    </React.Fragment>
  );
};
