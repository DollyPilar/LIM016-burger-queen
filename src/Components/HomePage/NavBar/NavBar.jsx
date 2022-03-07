import React, { useState, useEffect } from "react";
import { FaUser, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import PawLogo from "../../../assets/PawLogo.png";
import { auth } from "../../../firebase/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import "./NavBar.css";

export const NavBar = () => {
  const [userState, setUserState] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserState(user);
      }
    });
  }, []);
  // console.log(userState);
  const logOut = () => {
    signOut(auth);
    alert("Cerraste sesión");
  };

  return (
    <React.Fragment>
      <div className="navBarContainer">
        <div className="logoIconsContainer">
          <div className="logoNavContainer">
            <img src={PawLogo} alt="Happy Paws" className="logoNav" />
          </div>
          <div className="iconContainer">
            <Link to="/LogIn">
              {" "}
              <FaUser className="navBarIcon" />
            </Link>

            <Link to="/cart">
              <FaShoppingCart className="navBarIcon" />
            </Link>

            {userState && (
              <button className="logOut" onClick={logOut}>
                <FaSignOutAlt className="navBarIcon" />
              </button>
            )}
          </div>
        </div>
        <div className="lowBarContainer">
          <Link to="/">INICIO</Link>
          <Link to="/product">TIENDA</Link>
          <Link to="/">SOBRE NOSOTROS</Link>
        </div>
      </div>
    </React.Fragment>
  );
};
