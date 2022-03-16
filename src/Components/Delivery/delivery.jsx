import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase-config.jsx";
//import Swal from "sweetalert2";
import "./delivery.css";
import {
  onSnapshot,
  where,
  query,
  orderBy,
  collection,
  updateDoc,
  doc,
  // deleteDoc,
} from "firebase/firestore";
import { NavBar } from "../HomePage/NavBar/NavBar.jsx";
import { DeliveryProducts } from "./DeliveryProducts.jsx";

function Delivery() {
  const [deliveries, setDeliveries] = useState("");
  const getDeliveryColl = () => {
    const collRef = collection(db, "compras");
    const order = query(
      collRef,
      where("finalProducts.shoppingState", "==", "Pedido Listo"),
      orderBy("dateToDelivery", "desc")
    );
    onSnapshot(order, (querySnapshot) => {
      const delivArray = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.ID = doc.id;
        delivArray.push(data);
      });
      setDeliveries(delivArray);
    });
  };
  useEffect(() => {
    getDeliveryColl();
  }, []);

  const productDelivery = async (delivery) => {
    const prodRef = doc(db, "compras", delivery.ID);
    try {
      await updateDoc(prodRef, {
        "finalProducts.shoppingState": "Pedido Enviado",
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className="deliveryBox">
        <DeliveryProducts
          deliveries={deliveries}
          productDelivery={productDelivery}
        />
      </div>
      ;
    </React.Fragment>
  );
}

export default Delivery;
