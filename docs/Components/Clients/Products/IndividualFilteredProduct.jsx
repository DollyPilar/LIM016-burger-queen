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
      <div className="productContainerFiltered">
        <div className="productImgContainerFiltered">
          <img
            src={individualFilteredProduct.Img}
            alt="product-img"
            className="productImgFiltered"
          />
        </div>
        <div className="boxContainerInfoFiltered">
          <p className="productTitleFiltered">
            {individualFilteredProduct.Nombre}
          </p>

          <div className="addPriceContainerFiltered">
            <p className="productInfoFiltered">
              S/. {individualFilteredProduct.Precio}
            </p>
            <FaPlusCircle
              className="addIconFiltered"
              onClick={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
