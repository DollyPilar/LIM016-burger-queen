import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase-config.jsx";
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
import { NavBar } from "../HomePage/NavBar/NavBar.jsx";
import { StoreProducts } from "./StoreProducts.jsx";
//import { OrdersReady } from "./OrdersReady/OrdersReady.jsx";
import "./store.css";

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
  /////////////////////////////////////////////
  const [showSent, setShowSent] = useState(false);

  const [ordersSent, setOrdersSent] = useState("");
  const getOrdersSentCol = () => {
    const collRef = collection(db, "compras");
    const order = query(
      collRef,
      where("finalProducts.shoppingState", "==", "Pedido Enviado"),
      orderBy("finalProducts.dateOfShopping", "desc")
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

  const showOrdersOending = () => {
    setShowSent(false);
  };
  const showOrdersReady = () => {
    setShowSent(true);
  };
  return (
    <React.Fragment>
      <NavBar />
      <div className="btnStateContainer">
        <button className="btnShowPendingPO" onClick={showOrdersOending}>
          Pendientes
        </button>
        <button className="btnShowDonePO" onClick={showOrdersReady}>
          Listos
        </button>
      </div>

      <div className="storeBoxContainer">
        {showSent ? (
          <>
            {ordersSent.length > 0 && (
              <div className="storeBox">
                {ordersSent.length > 0 &&
                  ordersSent.map((orderSent) => (
                    <div className="purcharseOrderStoreSent" key={orderSent.ID}>
                      <div className="rowStoreTableSent">
                        <p>Cliente:</p>
                        <p>{orderSent.finalProducts.buyerName}</p>
                      </div>
                      <div className="rowStoreTableSent">
                        <p>Hora de entrada:</p>
                        <p>{orderSent.finalProducts.dateOfShopping}</p>
                      </div>
                      <div className="rowStoreTableSent">
                        <p>Hora de Salida:</p>
                        <p>{orderSent.dateToDelivery}</p>
                      </div>

                      <table className="purchaseOrdeTableSent">
                        <thead>
                          <tr>
                            <th>Cantidad</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                          </tr>
                        </thead>
                        {orderSent.finalProducts.productsInformation.map(
                          (product, index) => (
                            <tbody key={index}>
                              <tr>
                                <td>{product.quantity}</td>
                                <td>{product.Nombre}</td>
                                <td>S/.{product.TotalProductPrice}</td>
                              </tr>
                            </tbody>
                          )
                        )}
                      </table>
                      <div className="rowStoreTablePriceSent">
                        <p>Total:</p>
                        <p>S/.{orderSent.finalProducts.finalPrice}</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
            {ordersSent.length < 1 && (
              <div className="pleaseWaitStore">
                <p>Por favor espera...</p>
              </div>
            )}
          </>
        ) : (
          <>
            {orders.length > 0 && (
              <div className="storeBox">
                <StoreProducts
                  orders={orders}
                  updateState={updateState}
                  cancelShop={cancelShop}
                />
              </div>
            )}
            {orders.length < 1 && (
              <div className="pleaseWaitStore">
                <p>Por favor espera...</p>
              </div>
            )}
            )
          </>
        )}
      </div>
    </React.Fragment>
  );
}

export default Store;
