import React from "react";
import "./IndividualStoreProducts.css";

export const IndividualStoreProducts = ({ compra }) => {
  // console.log("product", compra.Nombre);
  return (
    <React.Fragment>
      <div className="storeCart">
        <div>
          {/* <p>Nombre de producto</p>
          <p>{compra.Nombre}</p> */}
          {/* <p>Cantidad de producto</p>
          <p>{compra.quantity}</p>
        </div>
        <div>
          <p>Precio total del producto</p>
          <p>{compra.TotalProductPrice}</p>*/}
        </div>
      </div>
    </React.Fragment>
  );
};
