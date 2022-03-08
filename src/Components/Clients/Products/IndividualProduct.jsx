import React from "react";
import "./IndividualProduct.css";

export const IndividualProduct = ({ individualProduct, addToCart }) => {
  // console.log(individualProduct);
  const handleAddToCart = () => {
    addToCart(individualProduct);
  };
  return (
    <React.Fragment>
      <div className="productContainer">
        <div className="productImgContainer">
          <img
            src={individualProduct.Img}
            className="productImg"
            alt="product-img"
          />
          {/* <img src={dogExam} alt="product-img" className="productImg" /> */}
        </div>
        <div className="productInfo">{individualProduct.Nombre}</div>
        <div className="productInfo">S/.{individualProduct.Precio}</div>
        <button className="btnAddProduct" onClick={handleAddToCart}>
          Añade a tu carrito
        </button>
      </div>
    </React.Fragment>
  );
};
