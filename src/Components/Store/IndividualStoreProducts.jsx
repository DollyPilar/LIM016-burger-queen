import React, {useState} from "react";
import "./IndividualStoreProducts.css";

export const IndividualStoreProducts = ({ compra }) => {
  //console.log(compra);

  // const [infoCompra, setInfoCompra] = useState("")
  // setInfoCompra(compra.finalProducts.buyerName)
  // console.log(infoCompra)

  // console.log(comprap.map((ee) => ee));

  // const timeOfShopping = compra.dateOfShopping;
  // const date = new Date(timeOfShopping);
  // const myDate = date.getDate()+
  // "/"+(date.getMonth()+1)+
  // "/"+date.getFullYear()+
  // " "+date.getHours()+
  // ":"+date.getMinutes()+
  // ":"+date.getSeconds();
          
  return (
    <React.Fragment>
      <div className="prueba">
        holaaaa
        <div className="coll">
        <p>{compra.finalProducts.buyerName}</p>
        </div>
        {/*<p>{myDate}</p>
        <p>{compra.finalPrice}</p>
        <p>{compra.finalQuantity}</p>
        </div>
        
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
        </table> */}
      </div>
    </React.Fragment>
  );
};
