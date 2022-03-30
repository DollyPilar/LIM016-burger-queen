import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase-config.jsx";
import { FaTrash } from "react-icons/fa";
import "./ProductsList.css";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  // función que trae los productos
  const getProducts = async () => {
    const collRef = collection(db, "products");
    try {
      const order = query(collRef, where("Tienda", "==", "Happy Paws"));
      // const productsArray = [];

      onSnapshot(order, (querySnapshot) => {
        const delivArray = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          data.ID = doc.id;
          delivArray.push(data);
        });
        setProducts(delivArray);
      });
    } catch (e) {
      console.log(e.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const handleDeleteProduct = async (e) => {
    const prodRef = doc(db, "products", e);
    try {
      await deleteDoc(prodRef);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <React.Fragment>
      <div className="productsCardContainerAdmin">
        {products.length > 0 && (
          <div className="firstRowCard">
            <h3 className="cardName">Productos</h3>
            <h3 className="cardName">Precio</h3>
          </div>
        )}

        {products.length > 0 &&
          products.map((product, index) => (
            <div className="individualProductCard" key={index}>
              <div className="cardImg">
                <img
                  src={product.Img}
                  className="imgProduct"
                  alt="productImg"
                />
              </div>
              <h3 className="productInfoCardName">{product.Nombre}</h3>
              <h3 className="productInfoCard">S./{product.Precio}</h3>
              <FaTrash
                className="productInfoCard"
                onClick={() => handleDeleteProduct(product.ID)}
              />
            </div>
          ))}

        {products.length < 1 && (
          <div className="pleaseWaitProductsList ">
            <p className="waitProductsList ">Por favor espera...</p>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};
