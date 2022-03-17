import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import PawLogo from "../../../../assets/PawLogo.png";
import { auth } from "../../../../firebase/firebase-config.jsx";
import { signOut } from "firebase/auth";
import "./NavBarEmployee.css";
// import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";

export const NavBarEmployee = ({ text, name }) => {
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
        <div className="highBarContainerEmployee">
          <div className="highBarEmployee">
            <div className="logoNavContainerEmployee">
              <img src={PawLogo} alt="Happy Paws" className="logoNavEmployee" />
            </div>
            <h3 className="infoEmployee">{text}</h3>
          </div>
          <div className="highBarEmployee">
            <h3 className="infoEmployee">{name}</h3>
            <button className="logOutEmployee">
              <FaSignOutAlt className="navBarIconEmployee" onClick={logOut} />
            </button>
          </div>
        </div>
        {/* 
        <div className="lowBarContainerEmployee">
          <h2 className="linklowBarEmployee" onClick={goTOrders}>
            Pedidos
          </h2>
        </div> */}
      </div>
    </React.Fragment>
  );
};
