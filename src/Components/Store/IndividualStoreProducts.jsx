import React from "react";
import "./IndividualStoreProducts.css";

export const IndividualStoreProducts = ({
  compra,
  updateState,
  cancelShop,
}) => {
  //console.log(compra);
  const handleUpdateState = () => {
    updateState(compra);
  };
  const handleCancel = () => {
    cancelShop(compra);
  };

  const timeOfShopping = compra.finalProducts.dateOfShopping;
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
      <div className="prueba">
        <div className="coll">
          <p>Cliente:</p>
          <p>{compra.finalProducts.buyerName}</p>
        </div>
        <div className="coll">
          <p>Hora de entrada:</p>
          <p>{myDate}</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Cantidad</th>
              <th>Nombre</th>
              <th>Precio</th>
            </tr>
          </thead>
          {compra.finalProducts.productsInformation.map((ee, index) => (
            <tbody key={index}>
              <tr>
                <td>{ee.quantity}</td>
                <td>{ee.Nombre}</td>
                <td>S/.{ee.TotalProductPrice}</td>
              </tr>
            </tbody>
          ))}
        </table>
        <div className="coll2">
          <p>Total:</p>
          <p>S/.{compra.finalProducts.finalPrice}</p>
        </div>
        <div className="btnStore">
          <button onClick={handleCancel}>Cancelar</button>
          <button onClick={handleUpdateState}>Listo</button>
        </div>
      </div>
    </React.Fragment>
  );
};
