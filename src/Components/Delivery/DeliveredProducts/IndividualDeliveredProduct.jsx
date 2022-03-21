import React from "react";
import { hourAndDate } from "../../../functions/projectFunctions";
import "./IndividualDeliveredProduct.css";
export const IndividualDeliveredProduct = ({ delivery }) => {
  console.log(delivery);
  return (
    <React.Fragment>
      <div className="purcharseOrderStoreFinal">
        <div className="rowStoreTableFinal">
          <p>Cliente:</p>
          <p>{delivery.finalProducts.buyerName}</p>
        </div>
        <div className="rowStoreTableFinal">
          <p>Hora de entrada:</p>
          <p>{hourAndDate(delivery.finalProducts.dateOfShopping)}</p>
        </div>
        <div className="rowStoreTableFinal">
          <p>Hora de Salida:</p>
          <p>{hourAndDate(delivery.dateToDelivery)}</p>
        </div>

        <table className="purchaseOrdeTableFinal">
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Nombre</th>
              <th>Precio</th>
            </tr>
          </thead>
          {delivery.finalProducts.productsInformation.map((product, index) => (
            <tbody key={index}>
              <tr>
                <td>{product.quantity}</td>
                <td>{product.Nombre}</td>
                <td>S/.{product.TotalProductPrice}</td>
              </tr>
            </tbody>
          ))}
        </table>
        <div className="rowStoreTablePriceFinal">
          <p>Total:</p>
          <p>S/.{delivery.finalProducts.finalPrice}</p>
        </div>
      </div>
    </React.Fragment>
  );
};
