import React, { useEffect, useRef } from "react";
import { FaUser, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import PawLogo from "../../assets/PawLogo.png";
import { auth } from "../../firebase/firebase-config";
import { signOut } from "firebase/auth";
import "./NavBar.css";
import Swal from "sweetalert2";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../Route/AuthContext.jsx";

export const NavBar = () => {
  const { user } = useAuth();
  // console.log(user);
  // useEffect(() => {
  //   user;
  // }, []);

  const isMounted = useRef(true);

  const navigate = useNavigate();
  const logOut = () => {
    Swal.fire({
      title: "¿Está seguro de que desea cerrar sesión?",
      showCancelButton: true,
      confirmButtonColor: "#FFFFFF",
      cancelButtonColor: "#bb53f3",
      confirmButtonText: "Ok",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        if (isMounted.current) {
          signOut(auth);
          navigate("/");
        }
      }
    });
  };
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <React.Fragment>
      <div className="navBarContainer">
        <div className="TopBarContainer">
          <div className="logoNavContainer">
            <img src={PawLogo} alt="Happy Paws" className="logoNav" />
          </div>
          <div className="inicioTiends">
            <Link to="/" className="inicio">
              Inicio
            </Link>
            <Link to="product" className="inicio">
              Tienda
            </Link>
          </div>
        </div>

        <div className="iconContainer">
          <Link to="login">
            <FaUser className="navBarIcon" />
          </Link>

          <Link to="cart">
            <FaShoppingCart className="navBarIcon" />
          </Link>

          {user === null ? (
            ""
          ) : (
            <FaSignOutAlt className="navBarIcon" onClick={logOut} />
          )}
        </div>
      </div>
      <Outlet />
    </React.Fragment>
  );
};
