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
    cartProductIncrease(cartProduct.Product);
  };
  const handleCartProductDecrease = () => {
    cartProductDecrease(cartProduct.Product);
  };
  const handleCartProductDelete = () => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const prodRef = doc(db, "Cart" + user.uid, cartProduct.Product.ID);
        await deleteDoc(prodRef);
      }
    });
  };
  return (
    <React.Fragment>
      <div className="cartProduct">
        <div className="cartImgContainer">
          <img
            src={cartProduct.Product.Img}
            className="cartImg"
            alt="product-img"
          />
          {/* <img src={dogExam} alt="product-img" className="cartImg" /> */}
        </div>
        <div className="productNamecart">
          <p> {cartProduct.Product.Nombre}</p>
        </div>
        <div className="productPricecart">
          <p>
            {" "}
            S/.
            {cartProduct.Product.Precio}
          </p>
        </div>

        <div className="addDecreaseQuantity">
          <button className="btnCart" onClick={handleCartProductDecrease}>
            -
          </button>
          <div className="productPricecart">
            <p>{cartProduct.Product.quantity}</p>
          </div>

          <button className="btnCart" onClick={handleCartProductIncrease}>
            +
          </button>
        </div>
        <div className="productPricecart">
          <p> S/. {cartProduct.Product.TotalProductPrice}</p>
        </div>
        <button className="btnCart widerBtn" onClick={handleCartProductDelete}>
          <FaTrash />
        </button>
      </div>
    </React.Fragment>
  );
};
