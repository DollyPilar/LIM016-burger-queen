import React from "react";
import { NavBarEmployee } from "../NavBar/NavBarEmployees/NavBarEmployee.jsx";
import { ButtonCancel } from "../../Globals/Buttons/ButtonCancel/ButtonCancel.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import "./IndexDelivery.css";
export const IndexDelivery = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/delivery");
  };
  const handleDelivered = () => {
    navigate("deliveredproducts");
  };
  return (
    <React.Fragment>
      <div>
        <NavBarEmployee text="Delivery" nameEmployee="ejemplo" />
        <div className="btnContainerDelivery">
          <ButtonCancel name="A entregar" onClick={handleHome} />
          <ButtonCancel onClick={handleDelivered} name="Entregados" />
        </div>
      </div>
      <Outlet />
    </React.Fragment>
  );
};
