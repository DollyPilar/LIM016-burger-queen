import React from "react";
import { IndividualStoreProducts } from "./IndividualStoreProducts.jsx";

export const StoreProducts = ({ compras }) => {
  //   if (compras.length > 0) {
  //     compras.cartProductsCol.map((pp) => {
  //       console.log("map", pp);
  //     });
  //   }

  // console.log("do", compras.cartProductsCol);
  // console.log("do",compras)
  // const[comprasReales, setComprasReales] = useState("")
  return (
    <React.Fragment>
      {/* {compras.length > 0 &&
        compras.map((compra) => <div>{compra.nombre} </div>)} */}

      {/* {compras.length > 0 &&
        compras.map((compra) => (
          <IndividualStoreProducts
            key={compra.cartProductsCol.ID}
            compra={compra}
          />
        ))} */}
    </React.Fragment>
  );

  // return compras.for

  //  return <div>productoo</div>
};
