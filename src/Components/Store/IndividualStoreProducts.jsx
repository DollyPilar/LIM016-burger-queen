import React from "react";
import "./IndividualStoreProducts.css";

export const IndividualStoreProducts = ({ compra, comprap }) => {
  //console.log("product", compra);
  // console.log(comprap.map((ee) => ee));

  return (
    <React.Fragment>
      <div className="prueba">
        {compra.buyerName}

        <table>
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Nombre</th>
              <th>Precio</th>
            </tr>
          </thead>
          {comprap.map((ee) => (
            <tbody>
              <tr>
                <td>{ee.quantity}</td>
                <td>{ee.Nombre}</td>
                <td>{ee.TotalProductPrice}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </React.Fragment>
  );
};
