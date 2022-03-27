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
          <p className="productTitle">{individualProduct.Nombre}</p>

          <div className="addPriceContainer">
            <p className="productInfo">S/.{individualProduct.Precio}</p>
            <FaPlusCircle className="addIcon" onClick={handleAddToCart} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
