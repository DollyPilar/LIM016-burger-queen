import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase-config.jsx";
//import Swal from "sweetalert2";
import "./Delivery.css";
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

  const deliverProduct = async (delivery) => {
    const prodRef = doc(db, "compras", delivery.ID);
    try {
      await updateDoc(prodRef, {
        "finalProducts.shoppingState": "Pedido Enviado",
      });
    } catch (e) {
      console.log(e);
    }
  };
  /////////////////////
  const [showDelivered, setShowDelivered] = useState(false);

  const [ordersDelivery, setOrdersDelivery] = useState("");
  const getOrdersDeliveryCol = () => {
    const collRef = collection(db, "compras");
    const order = query(
      collRef,
      where("finalProducts.shoppingState", "==", "Pedido Enviado"),
      orderBy("dateToDelivery", "desc")
    );
    onSnapshot(order, (querySnapshot) => {
      const shoppArray = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.ID = doc.id;
        shoppArray.push(data);
      });
      setOrdersDelivery(shoppArray);
      // setOrders([]);
    });
  };
  //console.log(ordersSent);

  useEffect(() => {
    getOrdersDeliveryCol();
  }, []);
  const showOrdersToDeliver = () => {
    setShowDelivered(false);
  };
  const showOrdersDelivered = () => {
    setShowDelivered(true);
  };

  return (
    <React.Fragment>
      <NavBar />
      <div className="btnStateContainerDelivery">
        <button
          className="btnShowPendingPODelivery"
          onClick={showOrdersToDeliver}
        >
          Pendientes
        </button>
        <button className="btnShowDonePODelivery" onClick={showOrdersDelivered}>
          Listos
        </button>
      </div>
      <div className="deliveryBoxContainer">
        {deliveries.length > 0 && (
          <div className="deliveryBox">
            <DeliveryProducts
              deliveries={deliveries}
              deliverProduct={deliverProduct}
            />
          </div>
        )}
        {deliveries.length < 1 && (
          <div className="pleaseWaitDelivery">
            <p>Por favor espera...</p>
          </div>
        )}
      </div>
      ;
    </React.Fragment>
  );
}

export default Delivery;
