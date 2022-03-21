import React from "react";
import { NavBarEmployee } from "../NavBar/NavBarEmployees/NavBarEmployee.jsx";
import { ButtonCancel } from "../../Globals/Buttons/ButtonCancel/ButtonCancel.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import "./StoreIndex.css";
export const StoreIndex = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/store");
  };
  const handleDelivered = () => {
    navigate("ordersent");
  };
  return (
    <React.Fragment>
      <div>
        <NavBarEmployee text="Almacen" nameEmployee="ejemplo" />
        <div className="btnContainerStore">
          <ButtonCancel name="Por confirmar" onClick={handleHome} />
          <ButtonCancel onClick={handleDelivered} name="Listos" />
        </div>
      </div>
      <Outlet />
    </React.Fragment>
  );
};
