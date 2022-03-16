import React from "react";
import { auth, db } from "../../../firebase/firebase-config.jsx";
import { FaTrash } from "react-icons/fa";
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
        {/* <div className="cartImgContainer">
          <img src={cartProduct.Img} className="cartImg" alt="product-img" />
          </div> */}
          {/* <img src={dogExam} alt="product-img" className="cartImg" /> */}
        
        <div className="productNamecart">
          <p> {cartProduct.Nombre}</p>
        </div>
        <div className="productPricecart">
          <p>
            {" "}
            S/.
            {cartProduct.Precio}
          </p>
        </div>

        <div className="addDecreaseQuantity">
          <button
            className="btnAddDecrease"
            onClick={handleCartProductDecrease}
          >
            -
          </button>
          <div className="productPricecart">
            <p>{cartProduct.quantity}</p>
          </div>

          <button
            className="btnAddDecrease"
            onClick={handleCartProductIncrease}
          >
            +
          </button>
        </div>
        <div className="productPricecart">
          <p> S/. {cartProduct.TotalProductPrice}</p>
        </div>
        <button className="btnIconTrash" onClick={handleCartProductDelete}>
          <FaTrash className="btnCart" />
        </button>
      </div>
    </React.Fragment>
  );
};
