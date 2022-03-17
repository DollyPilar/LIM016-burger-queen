import React, { useState, useEffect } from "react";
import { hourAndDate } from "../../functions/projectFunctions";
import { db, auth } from "../../firebase/firebase-config.jsx";
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
  getDoc,
} from "firebase/firestore";
import { StoreProducts } from "./StoreProducts.jsx";
import { NavBarEmployee } from "../HomePage/NavBar/NavBarEmployees/NavBarEmployee.jsx";
import "./Store.css";
import { onAuthStateChanged } from "firebase/auth";

function Store() {
  const [user, setUser] = useState(null);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //console.log(user.uid);
          const docRef = doc(db, "users", user.uid);
          const docSnap = getDoc(docRef);
          docSnap.then((doc) => setUser(doc.data().name));
        } else {
          setUser("Empleado");
          console.log("no estás logueada");
        }
      }),
    []
  );
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

  const showOrdersOending = () => {
    setShowSent(false);
  };
  const showOrdersReady = () => {
    setShowSent(true);
  };
  return (
    <React.Fragment>
      <NavBarEmployee text="Almacén" name={user} />
      <div className="btnStateContainerStore">
        <button className="btnShowPendingPOStore" onClick={showOrdersOending}>
          Pendientes
        </button>
        <button className="btnShowDonePOStore" onClick={showOrdersReady}>
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
                        <p>
                          {hourAndDate(orderSent.finalProducts.dateOfShopping)}
                        </p>
                      </div>
                      <div className="rowStoreTableSent">
                        <p>Hora de Salida:</p>
                        <p>{hourAndDate(orderSent.dateToDelivery)}</p>
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
                <p className="waitStore">No hay pedidos</p>
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
                <p className="waitStore">No hay pedidos</p>
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
