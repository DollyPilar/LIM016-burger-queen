import React, { useState, useEffect } from "react";
import { auth, db } from "../../../firebase/firebase-config.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { IndividualCartProduct } from "./IndividualCartProduct.jsx";
import { ButtonCancelShop } from "./Buttons/ButtonCancel.jsx";
import { ButtonShop } from "./Buttons/ButtonShop.jsx";
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
  const [user, setUser] = useState(null);

  useEffect(() => {
    // let userName = [];
    let isMounted = true;
    onAuthStateChanged(auth, async (userr) => {
      if (userr) {
        const docRef = doc(db, "users", userr.uid);
        try {
          const docSnap = await getDoc(docRef);
          const snap = docSnap.data();
          if (isMounted) {
            setUser(snap.name);
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        console.log("no hay usuario");
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(collection(db, "cart" + user.uid), (snapshot) => {
          const newCartProduct = snapshot.docs.map((doc) => doc.data());
          if (isMounted) {
            setCartProducts(newCartProduct);
          }
        });
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // obteniendo la cantidad de CartProducts en un array separado
  const quantityArr = cartProducts.map((carProduct) => {
    return carProduct.quantity;
  });
  // console.log(quantityArr)

  // reduciendo el valor del número total de productos en un valor único
  let totalQty = quantityArr.reduce((acc, cur) => acc + cur, 0);
  //console.log(totalQty)

  // obteniendo el Precio final de CartProducts en un array separado
  const totalPriceArr = cartProducts.map((carProduct) => {
    return carProduct.TotalProductPrice;
  });
  // console.log(quantityArr)

  // reduciendo el valor del Precio final en un valor único
  const totalPrice = totalPriceArr.reduce((acc, cur) => acc + cur, 0);

  const cartProductIncrease = (cartProduct) => {
    // console.log(cartProduct, "funciona");

    const quantityProduct = cartProduct.quantity + 1;
    const totalProductPrice = quantityProduct * cartProduct.Precio;
    // actualizando Firebase
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const prodRef = doc(db, "cart" + user.uid, cartProduct.ID);
        try {
          await updateDoc(prodRef, {
            quantity: quantityProduct,
            TotalProductPrice: totalProductPrice,
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
  }; // termina product increase

  const cartProductDecrease = (cartProduct) => {
    // Product = cartProduct;
    if (cartProduct.quantity > 1) {
      // puedes seguir quitando
      const quantityProduct = cartProduct.quantity - 1;
      const totalProductPrice = quantityProduct * cartProduct.Precio;
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const prodRef = doc(db, "cart" + user.uid, cartProduct.ID);
          try {
            await updateDoc(prodRef, {
              quantity: quantityProduct,
              TotalProductPrice: totalProductPrice,
            });
          } catch (e) {
            console.log(e);
          }
        }
      });
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
                    // console.log(cartProduct)
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
                    <p>Nombre: {user}</p>
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
                      user={user}
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
