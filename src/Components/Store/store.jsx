import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase-config.jsx";
import { getDocs, collection } from "firebase/firestore";
import { NavBar } from "../HomePage/NavBar/NavBar.jsx";
import { StoreProducts } from "./StoreProducts.jsx";

function Store() {
  const [compras, setCompras] = useState("");
  // const [general, setGeneral] = useState("");

  const getShoppingProducts = async () => {
    const collRef = collection(db, "compras");
    try {
      const allColl = await getDocs(collRef);
      const shoppArray = [];

      allColl.forEach((doc) => {
        let data = doc.data();

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
      <StoreProducts compras={compras} />

      <div>Soy la vista del almacén</div>
    </React.Fragment>
  );
}

export default Store;
