import React from "react";
// import { IndividualStoreProducts } from "./IndividualStoreProducts.jsx";
import "./StoreProducts.css";

export const StoreProducts = ({ compras }) => {
  // if (compras.length > 0) {
  //   //const ww = compras[0].finalProducts;
  //   compras.map((ed) => {
  //     console.log(ed);
  //   });
  // }

  return (
    <React.Fragment>
      {compras.length > 0 &&
        compras.map((compra) => (
          <div key={compra.finalProducts.buyerID} className="prueba">
            {compra.finalProducts.buyerName} {compra.finalProducts.finalPrice}{" "}
            {compra.finalProducts.finalQuantity}{" "}
            <div>
              {compra.finalProducts.productsInformation.map((ee) => (
                <div className="productsExample">${ee}</div>
              ))}
            </div>
          </div>
        ))}

      {/* {compras[0].finalProducts.length > 0 &&
        compras[0].finalProducts.map((compra) => (
          <IndividualStoreProducts key={compra.buyerID} compra={compra} />
        ))} */}
      <div> exemple</div>
    </React.Fragment>
  );

  // return compras.for

  //  return <div>productoo</div>
};
