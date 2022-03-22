import React, { useState, useEffect } from "react";
import "./OrderHistory.css";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebase-config.jsx";
import { hourAndDate } from "../../../functions/projectFunctions";

export const OrderHistory = () => {
  const [products, setProducts] = useState([]);
  // función que trae los productos
  const getProducts = async () => {
    const collRef = collection(db, "compras");
    try {
      const allColl = await getDocs(collRef);
      const productsArray = [];

      allColl.forEach((doc) => {
        let data = doc.data();
        data.ID = doc.id;
        productsArray.push(data);
      });
      setProducts(productsArray);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  // console.log(products);
  return (
    <React.Fragment>
      <div className="historyBoxContainer">
        {products.length > 0 && (
          <div className="productsBoxHistory">
            {products.map((individualProduct) => (
              <div
                className="purcharseOrderStoreHistory"
                key={individualProduct.ID}
              >
                <div className="rowStoreTableHistory">
                  <p>Cliente:</p>
                  <p>{individualProduct.finalProducts.buyerName}</p>
                </div>
                <div className="rowStoreTableHistory">
                  <p>Hora de entrada:</p>
                  <p>
                    {hourAndDate(
                      individualProduct.finalProducts.dateOfShopping
                    )}
                  </p>
                </div>
                <div className="rowStoreTableHistory">
                  <p>Hora de Salida:</p>
                  <p>{hourAndDate(individualProduct.dateToDelivery)}</p>
                </div>

                <table className="purchaseOrdeTableHistory">
                  <thead>
                    <tr>
                      <th>Cantidad</th>
                      <th>Nombre</th>
                      <th>Precio</th>
                    </tr>
                  </thead>
                  {individualProduct.finalProducts.productsInformation.map(
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
                <div className="rowStoreTablePriceHistory">
                  <p>Total:</p>
                  <p>S/.{individualProduct.finalProducts.finalPrice}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        {products.length < 1 && (
          <div className="pleaseWaitHistory">
            <p className="waitHistory">Por favor espera...</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
