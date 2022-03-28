import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase-config.jsx";
import {
  onSnapshot,
  where,
  query,
  orderBy,
  collection,
} from "firebase/firestore";

import { IndividualOrderSent } from "./IndividualOrderSent.jsx";
import "./OrderSent.css";

function Store() {
  const [ordersSent, setOrdersSent] = useState("");
  const getOrdersSentCol = () => {
    const collRef = collection(db, "compras");
    const order = query(
      collRef,
      where("finalProducts.shoppingState", "==", "Pedido Listo"),
      orderBy("dateToDelivery", "desc")
    );
    onSnapshot(order, (querySnapshot) => {
      const shoppArray = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.ID = doc.id;
        shoppArray.push(data);
      });
      setOrdersSent(shoppArray);
      // setOrders([]);
    });
  };
  //console.log(ordersSent);

  useEffect(() => {
    getOrdersSentCol();
  }, []);
  return (
    <React.Fragment>
      <div className="orderSentContainer">
        {ordersSent.length > 0 && (
          <div className="orderSentBox">
            {ordersSent.map((orderSent) => (
              <IndividualOrderSent key={orderSent.ID} orderSent={orderSent} />
            ))}
          </div>
        )}
        {ordersSent.length < 1 && (
          <div className="pleaseWaitOrderSent">
            <p className="waitOrderSent">No hay pedidos</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default Store;
