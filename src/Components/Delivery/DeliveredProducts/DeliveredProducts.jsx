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
} from "firebase/firestore";

import { IndividualDeliveredProduct } from "./IndividualDeliveredProduct.jsx";

function Delivery() {
  const [ordersDelivered, setOrdersDelivered] = useState("");
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
      setOrdersDelivered(shoppArray);
      // setOrders([]);
    });
  };
  //console.log(ordersSent);

  useEffect(() => {
    getOrdersDeliveryCol();
  }, []);

  return (
    <React.Fragment>
      <div className="deliveryBoxContainer">
        {ordersDelivered.length > 0 && (
          <div className="deliveryBox">
            {ordersDelivered.map((delivery) => (
              <IndividualDeliveredProduct
                key={delivery.ID}
                delivery={delivery}
                deliverProduct={deliverProduct}
              />
            ))}
          </div>
        )}
        {ordersDelivered.length < 1 && (
          <div className="pleaseWaitDelivery">
            <p className="waitDelivery">No hay pedidos</p>
          </div>
        )}
        )
      </div>
      ;
    </React.Fragment>
  );
}

export default Delivery;
