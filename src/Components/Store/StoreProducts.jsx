import React from "react";
import { IndividualStoreProducts } from "./IndividualStoreProducts.jsx";

export const StoreProducts = ({ compras, updateState, cancelShop }) => {
  
  return (
    <React.Fragment>
      {compras.length > 0 &&
        compras.map((compra) => (
          <IndividualStoreProducts
            key={compra.ID}
            compra={compra}
            updateState={updateState}
            cancelShop={cancelShop}
          />
        ))}
    </React.Fragment>
  );
};
