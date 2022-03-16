import React from "react";
import { hourAndDate } from "../../functions/projectFunctions";
import "./IndividualDeliveryProducts.css";

export const IndividualDeliveryProducts = ({ delivery, deliverProduct }) => {
  
  const handleDelivery = () => {
    deliverProduct(delivery);
  };

  return (
    <React.Fragment>
      <div className="purcharseOrderDelivery">
        <div className="rowDeliveryTable">
          <p>Cliente:</p>
          <p>{delivery.finalProducts.buyerName}</p>
        </div>
        <div className="rowDeliveryTable">
          <p>Hora de entrada:</p>
          <p>{hourAndDate(delivery.finalProducts.dateOfShopping)}</p>
        </div>
        <div className="rowDeliveryTable">
          <p>Hora de salida:</p>
          <p>{hourAndDate(delivery.dateToDelivery)}</p>
        </div>

        <table className="purchaseOrdeTableDelivery">
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Nombre</th>
              <th>Precio</th>
            </tr>
          </thead>
          {delivery.finalProducts.productsInformation.map((ee, index) => (
            <tbody key={index}>
              <tr>
                <td>{ee.quantity}</td>
                <td>{ee.Nombre}</td>
                <td>S/.{ee.TotalProductPrice}</td>
              </tr>
            </tbody>
          ))}
        </table>
        <div className="rowDeliveryTablePrice">
          <p>Total:</p>
          <p>S/.{delivery.finalProducts.finalPrice}</p>
        </div>
        <div className="btnDeliveryContainer">
          <button className="btnSentDelivery" onClick={handleDelivery}>
            Entregado
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
