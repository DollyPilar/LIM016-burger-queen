import React, { Fragment } from "react";
import Logo from "../../../assets/PawLogo.png";

import "./SideNavBar.css";

export const LowNavBar = ({
  goHome,
  goStaff,
  goAddStaff,
  goProduct,
  gOrderHistory,
  goAddProduct,
}) => {
  const handleGoHome = () => {
    goHome(goHome);
  };
  const handleGoStaff = () => {
    goStaff(goStaff);
  };
  const handleGoAddStaff = () => {
    goAddStaff(goAddStaff);
  };
  const handleGoProduct = () => {
    goProduct(goProduct);
  };
  const handleGOrderHistory = () => {
    gOrderHistory(gOrderHistory);
  };
  const handleGoAddProduct = () => {
    goAddProduct(goAddProduct);
  };

  return (
    <Fragment>
      <div className="lowBarlogoNav">
        <img
          src={Logo}
          alt="pageLogo"
          className="
        lowBarLogo"
        />
      </div>
      <div className="lowBarAdmin">
        <h3 className="lowBarInfo" onClick={handleGoHome}>
          Home
        </h3>
        <h3 className="lowBarInfo" onClick={handleGoProduct}>
          Productos
        </h3>
        <h3 className="lowBarInfo" onClick={handleGoAddProduct}>
          Añadir productos
        </h3>
        <h3 className="lowBarInfo" onClick={handleGoStaff}>
          Empleados
        </h3>
        <h3 className="lowBarInfo" onClick={handleGoAddStaff}>
          Añadir Empleado
        </h3>
        <h3 className="lowBarInfo" onClick={handleGOrderHistory}>
          Historial de Pedidos
        </h3>
      </div>
    </Fragment>
  );
};
