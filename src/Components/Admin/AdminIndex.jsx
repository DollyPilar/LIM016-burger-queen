import React from "react";

import { LowNavBar } from "../NavBar/NavBarEmployees/SideNavBar.jsx";
import "./AdminIndex.css";
import { useNavigate, Outlet } from "react-router-dom";
import { NavBarEmployee } from "../NavBar/NavBarEmployees/NavBarEmployee.jsx";
// import { NavBarEmployee } from "../HomePage/NavBar/NavBarEmployees/NavBarEmployee.jsx";

function Admin() {
  const navigate = useNavigate();
  const goStaff = () => {
    navigate("stafflist");
    console.log("click en stafflist");
  };
  const goAddStaff = () => {
    navigate("addStaff");
    console.log("click en addStaff");
  };
  const goProduct = () => {
    navigate("productslist");
    console.log("click en productslist");
  };
  const goAddProduct = () => {
    navigate("addProducts");
    console.log("click en addProducts");
  };
  const goHome = () => {
    console.log("click en home");
    navigate("/admin");
  };
  const gOrderHistory = () => {
    navigate("orderhistory");
    console.log("click en orderhistory");
  };

  return (
    <React.Fragment>
      {/* <NavBarEmployee text="Administrador" name={user} /> */}
      <LowNavBar
        goHome={goHome}
        goStaff={goStaff}
        goAddStaff={goAddStaff}
        goProduct={goProduct}
        gOrderHistory={gOrderHistory}
        goAddProduct={goAddProduct}
      />

      <Outlet />
    </React.Fragment>
  );
}
export default Admin;
