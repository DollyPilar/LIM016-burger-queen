import React from "react";
import "./IndividualStoreProducts.css";

export const IndividualStoreProducts = ({ order, updateState, cancelShop }) => {
  //console.log(order);
  const handleUpdateState = () => {
    updateState(order);
  };
  const handleCancel = () => {
    cancelShop(order);
  };

  const timeOfShopping = order.finalProducts.dateOfShopping;
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

  return (
    <React.Fragment>
      <div className="purcharseOrderStore">
        <div className="rowStoreTable">
          <p>Cliente:</p>
          <p>{order.finalProducts.buyerName}</p>
        </div>
        <div className="rowStoreTable">
          <p>Hora de entrada:</p>
          <p>{myDate}</p>
        </div>

        <table className="purchaseOrdeTable">
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Nombre</th>
              <th>Precio</th>
            </tr>
          </thead>
          {order.finalProducts.productsInformation.map((product, index) => (
            <tbody key={index}>
              <tr>
                <td>{product.quantity}</td>
                <td>{product.Nombre}</td>
                <td>S/.{product.TotalProductPrice}</td>
              </tr>
            </tbody>
          ))}
        </table>
        <div className="rowStoreTablePrice">
          <p>Total:</p>
          <p>S/.{order.finalProducts.finalPrice}</p>
        </div>
        <div className="btnStoreContainer">
          <button className="btnCancelStore" onClick={handleCancel}>
            Cancelar
          </button>
          <button className="btnDoneStore" onClick={handleUpdateState}>
            Listo
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
