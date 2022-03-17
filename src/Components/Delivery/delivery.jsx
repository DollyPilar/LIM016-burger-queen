import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase/firebase-config.jsx";
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
  getDoc,
  // deleteDoc,
} from "firebase/firestore";
import { NavBarEmployee } from "../HomePage/NavBar/NavBarEmployees/NavBarEmployee.jsx";
import { DeliveryProducts } from "./DeliveryProducts.jsx";
import { hourAndDate } from "../../functions/projectFunctions.jsx";
import { onAuthStateChanged } from "firebase/auth";

function Delivery() {
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
      <NavBarEmployee text="Delivery" name={user} />
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
        {showDelivered ? (
          <>
            {ordersDelivery.length > 0 && (
              <div className="deliveryBox">
                {ordersDelivery.map((orderDelivery) => (
                  <div
                    className="purcharseOrderStoreFinal"
                    key={orderDelivery.ID}
                  >
                    <div className="rowStoreTableFinal">
                      <p>Cliente:</p>
                      <p>{orderDelivery.finalProducts.buyerName}</p>
                    </div>
                    <div className="rowStoreTableFinal">
                      <p>Hora de entrada:</p>
                      <p>
                        {hourAndDate(
                          orderDelivery.finalProducts.dateOfShopping
                        )}
                      </p>
                    </div>
                    <div className="rowStoreTableFinal">
                      <p>Hora de Salida:</p>
                      <p>{hourAndDate(orderDelivery.dateToDelivery)}</p>
                    </div>

                    <table className="purchaseOrdeTableFinal">
                      <thead>
                        <tr>
                          <th>Cantidad</th>
                          <th>Nombre</th>
                          <th>Precio</th>
                        </tr>
                      </thead>
                      {orderDelivery.finalProducts.productsInformation.map(
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
                    <div className="rowStoreTablePriceFinal">
                      <p>Total:</p>
                      <p>S/.{orderDelivery.finalProducts.finalPrice}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {ordersDelivery.length < 1 && (
              <div className="pleaseWaitDelivery">
                <p className="waitDelivery">No hay pedidos</p>
              </div>
            )}
          </>
        ) : (
          <>
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
                <p className="waitDelivery">No hay pedidos</p>
              </div>
            )}
            )
          </>
        )}
      </div>
      ;
    </React.Fragment>
  );
}

export default Delivery;
