import React from "react";
import { FaPlusCircle } from "react-icons/fa";
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
          <img
            src={individualFilteredProduct.Img}
            alt="product-img"
            className="productImg"
          />
        </div>
        <div className="boxContainerInfo">
        <div className="infoBoxContainer">
        <div className="productInfo">{individualFilteredProduct.Nombre}</div>
        <div className="productInfo"> S/. {individualFilteredProduct.Precio}</div>
        </div>
        <div className="btnAddContainer">
        <FaPlusCircle className="addIcon" onClick={handleAddToCart} /> 
        </div>
        </div>
      </div>
    </React.Fragment>
  );
};
