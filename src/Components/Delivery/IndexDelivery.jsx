import React, { useEffect, useState } from "react";
import { NavBarEmployee } from "../NavBar/NavBarEmployees/NavBarEmployee.jsx";
import { ButtonCancel } from "../../Globals/Buttons/ButtonCancel/ButtonCancel.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import "./IndexDelivery.css";
import { db } from "../../firebase/firebase-config.jsx";
import { useAuth } from "../Route/AuthContext.jsx";
import { doc, getDoc } from "firebase/firestore";
export const IndexDelivery = () => {
  const [userName, setUserName] = useState(null);
  const { user } = useAuth();
  useEffect(() => {
    // let userName = [];
    let isMounted = true;
    if (user) {
      const docRef = doc(db, "users", user.uid);

      const docSnap = getDoc(docRef);
      docSnap.then((doc) => {
        const snap = doc.data();
        if (isMounted) {
          setUserName(snap.name);
        }
      });
    } else {
      console.log("no hay usuario");
    }
    return () => {
      isMounted = false;
    };
  }, [user]);
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
        <NavBarEmployee text="Delivery" nameEmployee={userName} />
        <div className="btnContainerDelivery">
          <ButtonCancel name="A entregar" onClick={handleHome} />
          <ButtonCancel onClick={handleDelivered} name="Entregados" />
        </div>
      </div>
      <Outlet />
    </React.Fragment>
  );
};
