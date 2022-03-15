import React from "react";
import { IndividualStoreProducts } from "./IndividualStoreProducts.jsx";

export const StoreProducts = ({ compras, updateState }) => {
  
  return (
    <React.Fragment>
      {compras.length > 0 &&
        compras.map((compra) => (
          <IndividualStoreProducts
            key={compra.ID}
            compra={compra}
            updateState={updateState}
          />
        ))}
    </React.Fragment>
  );
};
