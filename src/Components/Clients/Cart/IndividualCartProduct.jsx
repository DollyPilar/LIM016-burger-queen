import React from "react";
import { auth, db } from "../../../firebase/firebase-config.jsx";
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
           <img src={cartProduct.Product.Img} className="cartImg" alt='product-img'/> 
          {/* <img src={dogExam} alt="product-img" className="cartImg" /> */}
        </div>
        <div>{cartProduct.Product.Nombre}</div>
        <div>
          S/.
          {cartProduct.Product.Precio}
        </div>
        <div>
          <button className="btnCart" onClick={handleCartProductDecrease}>
            -
          </button>
        </div>
        <div>{cartProduct.Product.quantity}</div>
        <div>
          <button className="btnCart" onClick={handleCartProductIncrease}>
            +
          </button>
        </div>

        <div> S/. {cartProduct.Product.TotalProductPrice}</div>
        <button className="btnCart" onClick={handleCartProductDelete}>
          Eliminar
        </button>
      </div>
    </React.Fragment>
  );
};
