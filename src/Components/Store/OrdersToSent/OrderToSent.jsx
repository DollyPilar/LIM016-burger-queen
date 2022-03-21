import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase-config.jsx";
import Swal from "sweetalert2";
import {
  onSnapshot,
  where,
  query,
  orderBy,
  collection,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { IndividualOrderToSent } from "./IndividualOrderSent.jsx";
import "./OrderToSent.css";

function Store() {
  const [orders, setOrders] = useState("");
  const getShoppingColle = () => {
    const collRef = collection(db, "compras");
    const order = query(
      collRef,
      where("finalProducts.shoppingState", "==", "Pedido realizado"),
      orderBy("finalProducts.dateOfShopping", "desc")
    );
    onSnapshot(order, (querySnapshot) => {
      const shoppArray = [];
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.ID = doc.id;
        shoppArray.push(data);
      });
      setOrders(shoppArray);
    });
  };

  useEffect(() => {
    getShoppingColle();
  }, []);

  const updateState = async (compra) => {
    const prodRef = doc(db, "compras", compra.ID);
    try {
      await updateDoc(prodRef, {
        "finalProducts.shoppingState": "Pedido Listo",
        dateToDelivery: Date.now(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const cancelShop = (compra) => {
    Swal.fire({
      title: "¿Está seguro de cancelar el pedido?",
      showCancelButton: true,
      confirmButtonColor: "#FFFFFF",
      cancelButtonColor: "#bb53f3",
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDoc(doc(db, "compras", compra.ID));
      }
    });
  };

  return (
    <React.Fragment>
      <div className="storeBoxContainer">
        {orders.length > 0 && (
          <div className="storeBox">
            {orders.map((order) => (
              <IndividualOrderToSent
                key={order.ID}
                order={order}
                updateState={updateState}
                cancelShop={cancelShop}
              />
            ))}
          </div>
        )}
        {orders.length < 1 && (
          <div className="pleaseWaitStore">
            <p className="waitStore">No hay pedidos</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default Store;
