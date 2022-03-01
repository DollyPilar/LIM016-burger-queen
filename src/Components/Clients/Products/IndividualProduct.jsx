import React from "react";
import "./IndividualProduct.css";
import dogExam from "../../../assets/dogExam.jpg";

export const IndividualProduct = ({ individualProduct, addToCart }) => {
  // console.log(individualProduct);
  const handleAddToCart = () => {
    addToCart(individualProduct);
  };
  return (
    <React.Fragment>
      <div className="productContainer">
        <div className="productImgContainer">
          {/* <img src={individualProduct.Imagen} alt='product-img'/> */}
          <img src={dogExam} alt="product-img" className="productImg" />
        </div>
        <div>{individualProduct.Nombre}</div>
        <div>S/.{individualProduct.Precio}</div>
        <button className="btnAddProduct" onClick={handleAddToCart}>
          Añade a tu carrito
        </button>
      </div>
    </React.Fragment>
  );
};
