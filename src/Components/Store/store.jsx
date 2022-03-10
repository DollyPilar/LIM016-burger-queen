import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase-config.jsx";
import { onSnapshot, collection } from "firebase/firestore";
import { NavBar } from "../HomePage/NavBar/NavBar.jsx";
import { StoreProducts } from "./StoreProducts.jsx";

function Store() {
  const [compras, setCompras] = useState("");

  useEffect(() => {
    onSnapshot(collection(db, "compras"), (snapshot) => {
      snapshot.docs.map((doc) => {
        const details = doc.data();
        return setCompras(details);
      });
    });
  }, []);

  // console.log(compras)

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
