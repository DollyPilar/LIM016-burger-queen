import React, { useState, useRef, useEffect } from "react";
import { db } from "../../../firebase/firebase-config.jsx";
import Swal from "sweetalert2";
import {
  getDocs,
  where,
  query,
  orderBy,
  collection,
  updateDoc,
  doc,
  deleteDoc,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { IndividualOrderToSent } from "./IndividualOrderToSent.jsx";
import "./OrderToSent.css";

function Store() {
  const [orders, setOrders] = useState("");
  const isMounted = useRef(true);
  

  useEffect(() => {
    const collRef = collection(db, "compras");
    const order = query(
      collRef,
      where("finalProducts.shoppingState", "==", "Pedido a preparar"),
      orderBy("finalProducts.dateOfShopping", "desc")
    );
    const querySnapshot =  getDocs(order);
      const shoppArray = [];
      querySnapshot.then((query)=>{
        if (isMounted.current) {
        query.forEach((doc) => {
          let data = doc.data();
          data.ID = doc.id;
          shoppArray.push(data);
        });
        if (shoppArray.length > 0) {
          setOrders(shoppArray);
         }
      }
      })

    return () => {isMounted.current = false};
  }, []);
  // console.log(orders);

  const updateState = async (compra) => {
    const prodRef = doc(db, "compras", compra.ID);
    try {
      await updateDoc(prodRef, {
        "finalProducts.shoppingState": "Pedido Listo",
        dateToDelivery: Date.now(),
      });
      const filteredOrders = orders.filter(
        (ord) => ord.ID !== compra.ID
      );
      setOrders(filteredOrders);
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
