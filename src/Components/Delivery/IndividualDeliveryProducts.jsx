import React from "react";

export const IndividualDeliveryProducts=({delivery, productDelivery})=>{
    //console.log(delivery.finalProducts.dateOfShopping)
    //console.log(delivery.dateToDelivery)
  const timeOfShopping = delivery.finalProducts.dateOfShopping;
  const date = new Date(timeOfShopping);
  const myDate = date.getDate()+
  "/"+(date.getMonth()+1)+
  "/"+date.getFullYear()+
  " "+date.getHours()+
  ":"+date.getMinutes()+
  ":"+date.getSeconds();

  const timeOfDelivery = delivery.dateToDelivery;
  const dateDelivery = new Date(timeOfDelivery);
  const myDateDelivery = dateDelivery.getDate()+
  "/"+(dateDelivery.getMonth()+1)+
  "/"+dateDelivery.getFullYear()+
  " "+dateDelivery.getHours()+
  ":"+dateDelivery.getMinutes()+
  ":"+dateDelivery.getSeconds();

  const handleDelivery =()=>{
      productDelivery(delivery)
  }
          
  return (
    <React.Fragment>
      <div className="individualDeliveryBox">
        <div className="rowDelivery">
        <p>Cliente:</p>
        <p>{delivery.finalProducts.buyerName}</p>
        </div>
        <div className="rowDelivery">
        <p>Hora de entrada:</p>
        <p>{myDate}</p>
        <div className="rowDelivery">
        <p>Hora de salida:</p>
        <p>{myDateDelivery}</p>
        </div>

       
        <table>
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
        <div className="rowDelivery2">
        <p>Total:</p>
        <p>S/.{delivery.finalProducts.finalPrice}</p>
        </div>
        <div className="btnDelivery">
         <button onClick={handleDelivery}>Entregado</button> 
        </div>
      </div>
      </div>
    </React.Fragment>
  );

}
