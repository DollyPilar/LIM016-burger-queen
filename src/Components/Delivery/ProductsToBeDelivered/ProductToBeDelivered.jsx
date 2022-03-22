import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase-config.jsx";

import "./ProductToBeDelivered.css";
import {
  onSnapshot,
  where,
  query,
  orderBy,
  collection,
  updateDoc,
  doc,
} from "firebase/firestore";
import { IndividualProductToBeDelivered } from "./IndividualProductToBeDelivered.jsx";

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
  return (
    <React.Fragment>
      <div className="deliveredBoxContainer">
        {deliveries.length > 0 && (
          <div className="deliveredBox">
            {deliveries.map((delivery) => (
              <IndividualProductToBeDelivered
                key={delivery.ID}
                delivery={delivery}
                deliverProduct={deliverProduct}
              />
            ))}
          </div>
        )}
        {deliveries.length < 1 && (
          <div className="pleaseWaitDelivered">
            <p className="waitDelivered">No hay pedidos</p>
          </div>
        )}
        )
      </div>
    </React.Fragment>
  );
}

export default Delivery;
