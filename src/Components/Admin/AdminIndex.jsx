import React, { useRef, useEffect } from "react";

import { LowNavBar } from "../NavBar/NavBarEmployees/SideNavBar.jsx";
import "./AdminIndex.css";
import { useNavigate, Outlet } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { auth } from "../../firebase/firebase-config.jsx";
import { signOut } from "firebase/auth";

// import { NavBarEmployee } from "../HomePage/NavBar/NavBarEmployees/NavBarEmployee.jsx";

function Admin() {
  const navigate = useNavigate();
  const goStaff = () => {
    navigate("stafflist");
  };
  const goAddStaff = () => {
    navigate("addStaff");
  };
  const goProduct = () => {
    navigate("productslist");
  };
  const goAddProduct = () => {
    navigate("addProducts");
  };
  const goHome = () => {
    navigate("/admin");
  };
  const gOrderHistory = () => {
    navigate("orderhistory");
  };
  const isMounted = useRef(true);
  const logOut = () => {
    if (isMounted.current) {
      signOut(auth);
      navigate("/");
    }
  };
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return (
    <React.Fragment>
      <div className="topNav">
        <p className="topNavName">Bienvenida Dolly</p>
        <FaSignOutAlt className="outAdmin" onClick={logOut} />
      </div>

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
