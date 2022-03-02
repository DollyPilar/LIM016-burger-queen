import React, { useState, useEffect } from 'react';
import {db} from "../../firebase/firebase-config.jsx"
import { onSnapshot, collection } from 'firebase/firestore';


function Store() {
  const [compras, setCompras] = useState('');

  useEffect(
    () =>onSnapshot(collection(db, "compras"), (snapshot) => {
    const newShop = snapshot.docs.map((doc) => 

      doc.data()
    );
    setCompras(newShop);
  }),
  
    []
  );
console.log(compras)




  

  return (
    <React.Fragment>
    <div>Soy la vista del almacén</div>;
    <div>Soy el nombre</div>;
    <div>Soy la hora</div>;
    <div>Soy el precio final</div>;
    </React.Fragment>
  )
  
}

export default Store;
