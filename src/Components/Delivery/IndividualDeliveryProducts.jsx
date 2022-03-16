import React from "react";
import "./IndividualDeliveryProducts.css";

export const IndividualDeliveryProducts = ({ delivery, deliverProduct }) => {
  const timeOfShopping = delivery.finalProducts.dateOfShopping;
  const date = new Date(timeOfShopping);
  const myDate =
    date.getDate() +
    "/" +
    (date.getMonth() + 1) +
    "/" +
    date.getFullYear() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();

  const timeOfDelivery = delivery.dateToDelivery;
  const dateDelivery = new Date(timeOfDelivery);
  const myDateDelivery =
    dateDelivery.getDate() +
    "/" +
    (dateDelivery.getMonth() + 1) +
    "/" +
    dateDelivery.getFullYear() +
    " " +
    dateDelivery.getHours() +
    ":" +
    dateDelivery.getMinutes() +
    ":" +
    dateDelivery.getSeconds();

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
          <p>{myDate}</p>
        </div>
        <div className="rowDeliveryTable">
          <p>Hora de salida:</p>
          <p>{myDateDelivery}</p>
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
