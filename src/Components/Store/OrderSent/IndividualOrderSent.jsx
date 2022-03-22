import React from "react";
import "./IndividualOrderSent.css";
import { hourAndDate } from "../../../functions/projectFunctions.jsx";

export const IndividualOrderSent = ({ orderSent }) => {
  //   console.log(orderSent);
  return (
    <React.Fragment>
      <div className="purcharseOrderStoreSent">
        <div className="rowStoreTableSent">
          <p>Cliente:</p>
          <p>{orderSent.finalProducts.buyerName}</p>
        </div>
        <div className="rowStoreTableSent">
          <p>Hora de entrada:</p>
          <p>{hourAndDate(orderSent.finalProducts.dateOfShopping)}</p>
        </div>
        <div className="rowStoreTableSent">
          <p>Hora de Salida:</p>
          <p>{hourAndDate(orderSent.dateToDelivery)}</p>
        </div>

        <table className="purchaseOrdeTableSent">
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Nombre</th>
              <th>Precio</th>
            </tr>
          </thead>
          {orderSent.finalProducts.productsInformation.map((product, index) => (
            <tbody key={index}>
              <tr>
                <td>{product.quantity}</td>
                <td>{product.Nombre}</td>
                <td>S/.{product.TotalProductPrice}</td>
              </tr>
            </tbody>
          ))}
        </table>
        <div className="rowStoreTablePriceSent">
          <p>Total:</p>
          <p>S/.{orderSent.finalProducts.finalPrice}</p>
        </div>
      </div>
    </React.Fragment>
  );
};
