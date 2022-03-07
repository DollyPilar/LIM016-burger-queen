import React from "react";
import "./IndividualFilteredProduct.css";

export const IndividualFilteredProduct = ({
  individualFilteredProduct,
  addToCart,
}) => {
  const handleAddToCart = () => {
    addToCart(individualFilteredProduct);
  };

  return (
    <React.Fragment>
      <div className="productContainer">
        <div className="productImgContainer">
          <img src={individualFilteredProduct.Img} alt='product-img' className="productImg"/> 
          {/* <img src={dogExam} alt="product-img" className="productImg" /> */}
        </div>

        <div>{individualFilteredProduct.Nombre}</div>
        <div> $ {individualFilteredProduct.Precio}</div>
        <button className="btnAddProduct" onClick={handleAddToCart}>
          Añadir al carrito
        </button>
      </div>
    </React.Fragment>
  );
};
