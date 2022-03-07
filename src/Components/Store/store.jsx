import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase-config.jsx";
import { onSnapshot, collection } from "firebase/firestore";
import { NavBar } from "../HomePage/NavBar/NavBar.jsx";

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
  // console.log(compras);

  const timeOfShopping = compras.hora;
  const date = new Date(timeOfShopping);
  const myDate = `
          ${date.getHours()}:
          ${date.getMinutes()}`;

  return (
    <React.Fragment>
      <NavBar />
      <div>Soy la vista del almacén</div>
      <div>Soy el nombre{compras.nombre}</div>
      {isNaN(myDate) ? <div>---</div> : myDate}
      {/* {myDate && } */}
      <div>Soy el precio final {compras.precioFinal}</div>;
    </React.Fragment>
  );
}

export default Store;
