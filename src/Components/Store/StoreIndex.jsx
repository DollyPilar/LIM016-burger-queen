import React, { useState, useEffect } from "react";
import { NavBarEmployee } from "../NavBar/NavBarEmployees/NavBarEmployee.jsx";
import { ButtonCancel } from "../../Globals/Buttons/ButtonCancel/ButtonCancel.jsx";
import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../Route/AuthContext.jsx";
import { db } from "../../firebase/firebase-config.jsx";
import { doc, getDoc } from "firebase/firestore";
import "./StoreIndex.css";
export const StoreIndex = () => {
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
    }
    return () => {
      isMounted = false;
    };
  }, [user]);
  return (
    <React.Fragment>
      <div>
        <NavBarEmployee text="Almacen" nameEmployee={userName} />
        <div className="btnContainerStore">
          <Link to="/store" style={{ width: "12rem" }}>
            <ButtonCancel name="Por alistar" />
          </Link>
          <Link to="ordersent" style={{ width: "12rem" }}>
            <ButtonCancel name="Listos" />
          </Link>
        </div>
      </div>
      <Outlet />
    </React.Fragment>
  );
};
