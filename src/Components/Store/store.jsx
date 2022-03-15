import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase-config.jsx";
import { getDocs, where, query, orderBy,  collection } from "firebase/firestore";
import { NavBar } from "../HomePage/NavBar/NavBar.jsx";
import { StoreProducts } from "./StoreProducts.jsx";
import "./store.css"

function Store() {
  const [compras, setCompras] = useState("");
  // const [general, setGeneral] = useState("");
  

  const getShoppingProducts = async () => {
    const collRef = collection(db, "compras");
    const order = query(collRef, where("finalProducts.shoppingState", "==", "Pedido realizado"), orderBy("finalProducts.dateOfShopping", "desc"))
    try {
      const allColl = await getDocs(order);
      const shoppArray = [];

      allColl.forEach((doc) => {
        let data = doc.data();
        data.ID = doc.id;

        shoppArray.push(data);
      });
      setCompras(shoppArray);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getShoppingProducts();
  }, []);
  const updateState=()=>{
  console.log("ya funciona")
  }

  // console.log(Array.isArray(compras));

  // compras.productos.map((producto)=>{
  //   console.log(producto.Nombre)
  // })

  // const timeOfShopping = compras.hora;
  // const date = new Date(timeOfShopping);
  // const myDate = `
  //         ${date.getHours()}:
  //         ${date.getMinutes()}`;

  return (
    <React.Fragment>
      <NavBar />
      <div className="boxContainer">
      <div className="storeBox">
      <StoreProducts compras={compras} updateState={updateState}/>
      </div>
      </div>
    </React.Fragment>
  );
}

export default Store;
