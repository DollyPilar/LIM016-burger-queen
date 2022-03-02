import React, { useState, useEffect } from "react";
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
  const logOut=()=>{
    signOut(auth)
    alert("Cerraste sesión")
  }

  return (
    <React.Fragment>
      <div className="navBarContainer">
        <div className="logoIconsContainer">
          <div className="logoContainer">
            <img src={PawLogo} alt="Happy Paws" className="logo" />
          </div>
          <div className="iconContainer">
            <Link to="/LogIn">
              {" "}
              <img
                src="https://img.icons8.com/fluency-systems-filled/48/000000/user.png"
                alt="user Icon"
              />
            </Link>

            <Link to="/cart">
              <img
                src="https://img.icons8.com/external-those-icons-fill-those-icons/24/000000/external-shopping-cart-shopping-those-icons-fill-those-icons.png"
                className="shoppingCart"
                alt="shopping Cart Icon"
              />
            </Link>

            {userState && <button onClick={logOut}>salir</button>}
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
