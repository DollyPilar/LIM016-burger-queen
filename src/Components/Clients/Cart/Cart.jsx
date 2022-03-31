import React, { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase-config.jsx";

import { IndividualCartProduct } from "./IndividualCartProduct.jsx";
import { ButtonCancelShop } from "./Buttons/ButtonCancel.jsx";
import { ButtonShop } from "./Buttons/ButtonShop.jsx";
import { useAuth } from "../../Route/AuthContext.jsx";
import "./Cart.css";
import {
  doc,
  getDoc,
  collection,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

export const Cart = () => {
  // función que trae el nombre del usuario que está logueado
  const [userName, setUserName] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    // let userName = [];
    let isMounted = true;
    if (user) {
      const docRef = doc(db, "users", user.uid);

      const docSnap = getDoc(docRef);
      docSnap.then((doc) => {
        const snap = doc.data();
        if (isMounted) {
          setUserName(snap.name);
        }
      });
    }
    return () => {
      isMounted = false;
    };
  }, [user]);

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    // onAuthStateChanged(auth, (user) => {
    if (user) {
      onSnapshot(collection(db, "cart" + user.uid), (snapshot) => {
        const newCartProduct = snapshot.docs.map((doc) => doc.data());
        if (isMounted) {
          setCartProducts(newCartProduct);
        }
      });
    }
    // });
    return () => {
      isMounted = false;
    };
  }, [user]);

  // obteniendo la cantidad de CartProducts en un array separado
  const quantityArr = cartProducts.map((carProduct) => {
    return carProduct.quantity;
  });

  // reduciendo el valor del número total de productos en un valor único
  let totalQty = quantityArr.reduce((acc, cur) => acc + cur, 0);

  // obteniendo el Precio final de CartProducts en un array separado
  const totalPriceArr = cartProducts.map((carProduct) => {
    return carProduct.TotalProductPrice;
  });

  // reduciendo el valor del Precio final en un valor único
  const totalPrice = totalPriceArr.reduce((acc, cur) => acc + cur, 0);

  const cartProductIncrease = async (cartProduct) => {
    const quantityProduct = cartProduct.quantity + 1;
    const totalProductPrice = quantityProduct * cartProduct.Precio;
    // actualizando Firebase
    // onAuthStateChanged(auth, async (user) => {
    if (user) {
      const prodRef = doc(db, "cart" + user.uid, cartProduct.ID);
      try {
        await updateDoc(prodRef, {
          quantity: quantityProduct,
          TotalProductPrice: totalProductPrice,
        });
      } catch (e) {
        console.log(e.message);
      }
    }
    // });
  }; // termina product increase

  const cartProductDecrease = async (cartProduct) => {
    // Product = cartProduct;
    if (cartProduct.quantity > 1) {
      // puedes seguir quitando
      const quantityProduct = cartProduct.quantity - 1;
      const totalProductPrice = quantityProduct * cartProduct.Precio;
      // onAuthStateChanged(auth, async (user) => {
      if (user) {
        const prodRef = doc(db, "cart" + user.uid, cartProduct.ID);
        try {
          await updateDoc(prodRef, {
            quantity: quantityProduct,
            TotalProductPrice: totalProductPrice,
          });
        } catch (e) {
          console.log(e.message);
        }
      }
      // });
    }
  };

  return (
    <React.Fragment>
      {!user && <div className="emptyCart">No hay productos</div>}
      {user && (
        <>
          <>
            {cartProducts.length > 0 && (
              <div className="cartContainer">
                <div className="cartProducts">
                  {cartProducts.map((cartProduct) => (
                    <IndividualCartProduct
                      key={cartProduct.ID}
                      cartProduct={cartProduct}
                      cartProductIncrease={cartProductIncrease}
                      cartProductDecrease={cartProductDecrease}
                    />
                  ))}
                </div>

                <div className="cartSummaryContainer">
                  <div className="cartInfo">
                    <h3>Resumen de compra</h3>
                  </div>
                  <div className="cartInfo">
                    {/* <p>Nombre: pru</p> */}
                    <p>Nombre: {userName}</p>
                  </div>
                  <div className="cartInfo">
                    <p>Total de productos:</p>
                    <p>{totalQty}</p>
                  </div>
                  <div className="cartInfo">
                    <p> Precio a pagar:</p>
                    <p>S/.{totalPrice}</p>
                  </div>
                  <div className="buttonsContainer">
                    <ButtonCancelShop />
                    <ButtonShop
                      cartProducts={cartProducts}
                      userName={userName}
                      totalQty={totalQty}
                      totalPrice={totalPrice}
                    />
                  </div>
                </div>
              </div>
            )}
            {cartProducts.length < 1 && (
              <div className="emptyCart">No hay productos</div>
            )}
          </>
        </>
      )}
    </React.Fragment>
  );
};
