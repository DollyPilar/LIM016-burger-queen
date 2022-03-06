import React, { useState, useEffect } from "react";
import { auth, db } from "../../../firebase/firebase-config.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { CartProducts } from "./CartProducts.jsx";
import { ButtonCancel } from "./Buttons/ButtonCancel.jsx";
import { NavBar } from "../../HomePage/NavBar/NavBar.jsx";
import "./Cart.css";
import {
  doc,
  getDoc,
  collection,
  onSnapshot,
  updateDoc,
  setDoc,
} from "firebase/firestore";

export const Cart = () => {
  // función que trae el nombre del usuario que está logueado
  const GetCurrentUser = () => {
    const [user, setUser] = useState(null);
    useEffect(() => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          try {
            const docSnap = await getDoc(docRef);
            //console.log (docSnap.doc.data())
            const userInfo = docSnap.data();
            setUser(userInfo.name);
          } catch (e) {
            console.log(e);
          }
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  };
  const user = GetCurrentUser();

  // el estado de los carritos
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          onSnapshot(collection(db, "Cart" + user.uid), (snapshot) => {
            const newCartProduct = snapshot.docs.map((doc) => ({
              ID: doc.id,
              ...doc.data(),
            }));
            setCartProducts(newCartProduct);
          });
        }
      }),
    []
  );
  // console.log(cartProducts)

  // obteniendo la cantidad de CartProducts en un array separado
  const quantityArr = cartProducts.map((carProduct) => {
    return carProduct.Product.quantity;
  });
  // console.log(quantityArr)

  // reduciendo el valor del número total de productos en un valor único
  let totalQty = quantityArr.reduce((acc, cur) => acc + cur, 0);
  //console.log(totalQty)

  // obteniendo el Precio final de CartProducts en un array separado
  const totalPriceArr = cartProducts.map((carProduct) => {
    return carProduct.Product.TotalProductPrice;
  });
  // console.log(quantityArr)

  // reduciendo el valor del Precio final en un valor único
  const totalPrice = totalPriceArr.reduce((acc, cur) => acc + cur, 0);
  //console.log(totalQty)

  //variable global
  let Product;

  const cartProductIncrease = (cartProduct) => {
    Product = cartProduct;
    Product.quantity = Product.quantity + 1;
    Product.TotalProductPrice = Product.quantity * Product.Precio;
    Product.TotalQtyNav = totalQty;
    // actualizando Firebase
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const prodRef = doc(db, "Cart" + user.uid, cartProduct.ID);
        try {
          await updateDoc(prodRef, {
            Product,
          });
        } catch (e) {
          console.log(e);
        }
      }
    });
  }; // termina product increase

  const cartProductDecrease = (cartProduct) => {
    Product = cartProduct;
    if (Product.quantity > 1) {
      // puedes seguir quitando
      Product.quantity = Product.quantity - 1;
      Product.TotalProductPrice = Product.quantity * Product.Precio;
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const prodRef = doc(db, "Cart" + user.uid, cartProduct.ID);
          try {
            await updateDoc(prodRef, {
              Product,
            });
          } catch (e) {
            console.log(e);
          }
        }
      });
    }
  };

  // const handleDeleteColl = () => {
  //   console.log("debes eliminarte");
  //   //const prodRef = doc(db, "Cart" + user.uid, cartProduct.ID);
  // };

  const createShoppingColl = async () => {
    const clientId = auth.currentUser.uid;
    try {
      await setDoc(doc(db, "compras", clientId), {
        nombre: user,
        hora: Date.now(),
        cantidad: totalQty,
        productos: cartProducts,
        estado: "Pedido realizado",
        compraId: clientId,
        precioFinal: totalPrice,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <NavBar />
      {!user && <div>No hay productos por mostrar</div>}
      {user && (
        <>
          <>
            {cartProducts.length > 0 && (
              <div>
                <div>
                  <CartProducts
                    cartProducts={cartProducts}
                    cartProductIncrease={cartProductIncrease}
                    cartProductDecrease={cartProductDecrease}
                  />
                </div>
              </div>
            )}
            {cartProducts.length < 1 && <div>No hay productos</div>}
            <div className="cartSummary">
              <div className="title">
                <h3>Resumen de compra</h3>
              </div>
              <div className="name">
                <p>Nombre: {user}</p>
              </div>
              <div className="cartInfo">
                <p>Número total de productos:</p>
                <p>{totalQty}</p>
              </div>
              <div className="cartInfo">
                <p> Precio a pagar:</p>
                <p>S/.{totalPrice}</p>
              </div>
              <div className="buttonsContainer">
                <ButtonCancel />
                <button className="btnBuy" onClick={createShoppingColl}>
                  Comprar
                </button>
              </div>
            </div>
          </>
        </>
      )}
    </React.Fragment>
  );
};
