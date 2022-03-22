import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { auth } from "../../../firebase/firebase-config.jsx";
import { signOut } from "firebase/auth";
import "./NavBarEmployee.css";
// import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export const NavBarEmployee = ({ text, nameEmployee }) => {
  // console.log(userState);
  const navigate = useNavigate();
  const logOut = () => {
    signOut(auth);
    navigate("/");
  };
  //   const goTOrders = () => {
  //     myOrder(myOrder);
  //   };

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
