import React from "react";
import { IndividualStoreProducts } from "./IndividualStoreProducts.jsx";

export const StoreProducts = ({ compras }) => {
  // if (compras.length > 0) {
  //   console.log(
  //     compras.map((e) => {
  //       const mmn = e.finalProducts.productsInformation;
  //       return mmn.map((ee) => ee.Nombre);
  //     })
  //   );
  // }
  //console.log(compras);
  // if (compras.length > 0) {
  //   compras.map((compra) =>
  //   console.log(compra.ID) )
  // }
  return (
    <React.Fragment>
      {/* {compras.length > 0 &&
        compras.map((compra) => (
          <IndividualStoreProducts key={compra.ID} compra={compra} />
        ))} */}
      {compras.length > 0 &&
        compras.map((compra, index) => (
          <IndividualStoreProducts
            key={compra.ID}
            compra={compra}
          />
        ))}
    </React.Fragment>
  );
};
