import React from "react";
import { Link } from "react-router-dom";
import dogHome from "../../assets/dogHome.png";
import { NavBar } from "./NavBar/NavBar.jsx";
import "./HomePage.css";

export const HomePage = () => {
  return (
    <React.Fragment>
      <NavBar />
      <div className="homePageContainer">
        <div className="homeInfoContainer">
          <div>
            <h2>
              Aquí encontrarás todo lo que <span>tu mascota necesita</span>
            </h2>
          </div>
          <div className="btnContainer">
            <Link to="/LogIn">
              <button className="btnBuy">Compra ahora</button>
            </Link>
          </div>
        </div>
        <div className="homeBackgroundImgContainer">
          <img
            src={dogHome}
            alt="dogs Background"
            className="homeBackgroundImg"
          />
        </div>
      </div>
    </React.Fragment>
  );
};
