import React from "react";
import { hourAndDate } from "../../../functions/projectFunctions";
import "./IndividualDeliveredProduct.css";
export const IndividualDeliveredProduct = ({ orderDelivered }) => {
  return (
    <React.Fragment>
      <div className="purcharseOrderStoreFinal">
        <div className="rowStoreTableFinal">
          <p>Cliente:</p>
          <p>{orderDelivered.finalProducts.buyerName}</p>
        </div>
        <div className="rowStoreTableFinal">
          <p>Hora de entrada:</p>
          <p>{hourAndDate(orderDelivered.finalProducts.dateOfShopping)}</p>
        </div>
        <div className="rowStoreTableFinal">
          <p>Hora de Salida:</p>
          <p>{hourAndDate(orderDelivered.dateToDelivery)}</p>
        </div>

        <table className="purchaseOrdeTableFinal">
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Nombre</th>
              <th>Precio</th>
            </tr>
          </thead>
          {orderDelivered.finalProducts.productsInformation.map(
            (product, index) => (
              <tbody key={index}>
                <tr>
                  <td>{product.quantity}</td>
                  <td>{product.Nombre}</td>
                  <td>S/.{product.TotalProductPrice}</td>
                </tr>
              </tbody>
            )
          )}
        </table>
        <div className="rowStoreTablePriceFinal">
          <p>Total:</p>
          <p>S/.{orderDelivered.finalProducts.finalPrice}</p>
        </div>
      </div>
    </React.Fragment>
  );
};
