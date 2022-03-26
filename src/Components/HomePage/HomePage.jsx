import React from "react";
import { useNavigate } from "react-router-dom";
import dogHome from "../../assets/dogHome.png";
import "./HomePage.css";

export const HomePage = () => {
  const navigate = useNavigate();
  const goToLogIn = () => {
    navigate("/LogIn");
  };
  return (
    <React.Fragment>
      <div className="homePageContainer">
        <div className="homeInfoContainer">
          <div>
            <h2>¡BIENVENIDX A HAPPY PAWS!</h2>
          </div>
          <div className="btnContainer">
            <button className="btnBuyHomePage" onClick={goToLogIn}>
              Compra ahora
            </button>
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
