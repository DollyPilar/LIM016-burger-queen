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
import "./store.css";

function Store() {
  const [compras, setCompras] = useState("");
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
      setCompras(shoppArray);
    });
  };
  useEffect(() => {
    getShoppingColle();
  }, []);
  const updateState = async (compra) => {
    console.log("click");
    // console.log(compra.finalProducts.shoppingState);
    // console.log(compra.finalProducts.dateOfShopping);
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
   

  }

  return (
    <React.Fragment>
      <NavBar />
      <div className="boxContainer">
        <div className="storeBox">
          <StoreProducts compras={compras} updateState={updateState} cancelShop={cancelShop} />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Store;