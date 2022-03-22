import React from "react";

import { LowNavBar } from "../NavBar/NavBarEmployees/SideNavBar.jsx";
import "./AdminIndex.css";
import { useNavigate, Outlet } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
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
  const logOut = () => {
    console.log("click");
  };
  return (
    <React.Fragment>
      <div className="topNav">
        <p className="topNavName">Bienvenida Dolly</p>
        <FaSignOutAlt className="logOutIcon" onClick={logOut} />
      </div>
      <h2>Reporte Semanal</h2>
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
