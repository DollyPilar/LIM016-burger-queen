import React from "react";
import { auth, db } from "../../../firebase/firebase-config.jsx";
import { FaTrash, FaAngleUp, FaAngleDown } from "react-icons/fa";
import { doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import "./IndividualCartProduct.css";
export const IndividualCartProduct = ({
  cartProduct,
  cartProductIncrease,
  cartProductDecrease,
}) => {
  //console.log(cartProduct.Product)
  const handleCartProductIncrease = () => {
    cartProductIncrease(cartProduct);
  };
  const handleCartProductDecrease = () => {
    cartProductDecrease(cartProduct);
  };
  const handleCartProductDelete = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const prodRef = doc(db, "cart" + user.uid, cartProduct.ID);
        await deleteDoc(prodRef);
      }
    });
  };
  return (
    <React.Fragment>
      <div className="cartProduct">
        <div className="productNamecart">
          <p> {cartProduct.Nombre}</p>
        </div>
        <div className="productPricecart">
          <p>
            S/.
            {cartProduct.Precio}
          </p>
        </div>

        <div className="addDecreaseQuantity">
          <FaAngleUp
            className="btnAddDecrease"
            onClick={handleCartProductIncrease}
          />

          <div className="productPricecart">
            <p>{cartProduct.quantity}</p>
          </div>

          <FaAngleDown
            className="btnAddDecrease"
            onClick={handleCartProductDecrease}
          />
        </div>
        <div className="productPricecart">
          <p> S/. {cartProduct.TotalProductPrice}</p>
        </div>

        <FaTrash className="btnCart" onClick={handleCartProductDelete} />
      </div>
    </React.Fragment>
  );
};
