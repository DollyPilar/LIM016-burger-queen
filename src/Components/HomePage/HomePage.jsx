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
              Aquí encontrarás todo para <span>DIVERTIR A TU MASCOTA</span>
            </h2>
          </div>
          <div className="btnContainer">
            <Link to="/LogIn">
              <button className="btnBuy">Compra ahora</button>
            </Link>
          </div>
        </div>

        <img
          src={dogHome}
          alt="dogs Background"
          className="homeBackgroundImg"
        />
      </div>
    </React.Fragment>
  );
};
