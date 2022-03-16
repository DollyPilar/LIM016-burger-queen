import React from "react";
import { FaPlusCircle } from "react-icons/fa";
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
        </div>
        <div className="boxContainerInfo">
        <div className="infoBoxContainer">
        <div className="productInfo">{individualProduct.Nombre}</div>
        <div className="productInfo">S/.{individualProduct.Precio}</div>
        </div>
        <div className="btnAddContainer">
        <button className="btnAddProduct" onClick={handleAddToCart}></button>
        <FaPlusCircle className="addIcon" />
        </div>
        </div>
      </div>
    </React.Fragment>
  );
};
