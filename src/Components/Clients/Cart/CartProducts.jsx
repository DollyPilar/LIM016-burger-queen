import React from "react";
import { IndividualCartProduct } from "./IndividualCartProduct.jsx";

export const CartProducts = ({
  cartProducts,
  cartProductIncrease,
  cartProductDecrease,
}) => {
  return cartProducts.map((cartProduct) => (
    // console.log(cartProduct)
    <IndividualCartProduct
      key={cartProduct.ID}
      cartProduct={cartProduct}
      cartProductIncrease={cartProductIncrease}
      cartProductDecrease={cartProductDecrease}
    />
  ));
};
