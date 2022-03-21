import React from "react";
import { NavBarEmployee } from "../NavBar/NavBarEmployees/NavBarEmployee.jsx";
import { ButtonCancel } from "../../Globals/Buttons/ButtonCancel/ButtonCancel.jsx";
import { Outlet, Link } from "react-router-dom";
import "./StoreIndex.css";
export const StoreIndex = () => {
  // const handleHome = () => {
  //   navigate("/store");
  // };
  // const handleDelivered = () => {
  //   navigate("ordersent");
  // };
  return (
    <React.Fragment>
      <div>
        <NavBarEmployee text="Almacen" nameEmployee="ejemplo" />
        <div className="btnContainerStore">
          <Link to="/store" className="infoUnderline">
            <ButtonCancel name="Por alistar" />
          </Link>
          <Link to="ordersent" className="infoUnderline">
            <ButtonCancel name="Listos" />
          </Link>
        </div>
      </div>
      <Outlet />
    </React.Fragment>
  );
};
