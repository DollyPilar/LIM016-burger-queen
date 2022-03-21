import React from "react";
import { FaUser, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import PawLogo from "../../assets/PawLogo.png";
import { auth } from "../../firebase/firebase-config";
import { signOut } from "firebase/auth";
import "./NavBar.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  // console.log(userState);
  const navigate = useNavigate();
  const logOut = () => {
    Swal.fire({
      title: "¿Está seguro de que desea cerrar sesión?",
      showCancelButton: true,
      confirmButtonColor: "#FFFFFF",
      cancelButtonColor: "#bb53f3",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth);
        navigate("/");
      }
    });
  };

  return (
    <React.Fragment>
      <div className="navBarContainer">
        <div className="TopBarContainer">
          <div className="logoNavContainer">
            <img src={PawLogo} alt="Happy Paws" className="logoNav" />
          </div>
          <Link to="/">Inicio</Link>
          <Link to="/product">Tienda</Link>
        </div>

        <div className="iconContainer">
          <Link to="/LogIn">
            {" "}
            <FaUser className="navBarIcon" />
          </Link>

          <Link to="/cart">
            <FaShoppingCart className="navBarIcon" />
          </Link>

          <FaSignOutAlt className="navBarIcon" onClick={logOut} />
        </div>
      </div>
    </React.Fragment>
  );
};
