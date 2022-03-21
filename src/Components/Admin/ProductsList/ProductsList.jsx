import React, { useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  onSnapshot,
  //   doc,
  //   deleteDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase-config.jsx";

import "./ProductList.css";

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
      console.log(e);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const handleDeleteProduct = async (product) => {
    console.log("funciona", product.ID);
    // const prodRef = doc(db, "products", product.ID);
    // try {
    //   await deleteDoc(prodRef);
    // } catch (e) {
    //   console.log(e);
    // }
  };
  return (
    <React.Fragment>
      <div className="productsCardContainerAdmin">
        <div className="firstRowCard">
          <h3 className="cardName">Productos</h3>
          <h3 className="cardName">Precio</h3>
        </div>
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
                onClick={handleDeleteProduct}
              />
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};
