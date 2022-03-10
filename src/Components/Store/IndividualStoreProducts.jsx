import React from "react";

export const IndividualStoreProducts = ({ compra }) => {
  console.log("dolly", compra);
  return (
    <React.Fragment>
      <div>
        <div>
          <p>Nombre de producto</p>
          {/* <p>{compra.buyerName}</p>
          <p>Cantidad de producto</p>
          <p>{compra.finalQuantity}</p> */}
        </div>
        <div>
          <p>Precio total del producto</p>
          {/* <p>{compra.finalQuantity}</p> */}
        </div>
      </div>
    </React.Fragment>
  );
};
