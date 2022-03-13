import React, { useState, useEffect } from "react";
import { auth, db } from "../../../firebase/firebase-config.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { CartProducts } from "./CartProducts.jsx";
import { ButtonCancel } from "./Buttons/ButtonCancel.jsx";
import { NavBar } from "../../HomePage/NavBar/NavBar.jsx";
import catCart from "../../../assets/cartCart.png";
import "./Cart.css";
import Swal from "sweetalert2";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const Cart = () => {
  // función que trae el nombre del usuario que está logueado
  const [user, setUser] = useState(null);
  const GetCurrentUser = () => {
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
    //return user
  };
  useEffect(() => {
    GetCurrentUser();
  }, []);

  // el estado de los carritos
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          onSnapshot(collection(db, "cart" + user.uid), (snapshot) => {
            const newCartProduct = snapshot.docs.map((doc) => doc.data());
            setCartProducts(newCartProduct);
          });
        }
      }),
    []
  );
  // const [cartStore, setCartStore] = useState([])
  // cartProducts.map((cartProduct)=>{
  //   setCartStore(cartProduct);
  // })

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
  //console.log(totalQty)

  //variable global
  //let Product;
  //console.log(cartProducts);

  const cartProductIncrease = (cartProduct) => {
    // console.log(cartProduct, "funciona");
    // Product = cartProduct;
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

  // const handleDeleteColl = () => {
  //   console.log("debes eliminarte");
  //   //const prodRef = doc(db, "Cart" + user.uid, cartProduct.ID);
  // };
  // //let arrayProduct = cartProducts;
  // const productss = cartProducts.map((cartprofuct) => {
  //   return `${cartprofuct.quantity}    ${cartprofuct.Nombre}   ${cartprofuct.TotalProductPrice}`;
  // });
  // console.log(Array.isArray(productss));
  const createShoppingColl = async () => {
    const clientId = auth.currentUser.uid;
    const buyerName = user;
    // let data = doc.data();
    // data.ID = doc.id;
    //cartProducts["finalProducts"] = clientId;

    const finalProducts = {
      buyerID: clientId,
      buyerName: buyerName,
      dateOfShopping: Date.now(),
      finalQuantity: totalQty,
      finalPrice: totalPrice,
      productsInformation: cartProducts.map((cartprofuct) => {
        return `${cartprofuct.quantity}    ${cartprofuct.Nombre}   ${cartprofuct.TotalProductPrice}`;
      }),

      // productName: cartProducts.map((cartprofuct) => cartprofuct.Nombre),

      // productQuantity: cartProducts.map(
      //   (cartprofuct) => cartprofuct.quantity
      // ),
      // productPrice: cartProducts.map((cartprofuct) => cartprofuct.Precio),
    };

    try {
      await addDoc(collection(db, "compras"), {
        // cartProducts,
        finalProducts,
      });
      Swal.fire({
        position: "top-center",
        icon: "success",
        iconColor: "#ce73ff",
        toast: true,
        title: "Compra realizada",
        width: "23rem",
        showConfirmButton: false,
        timer: 2500,
      });
      const q = collection(db, "cart" + clientId);

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((docc) => {
        const docId = docc.id;
        const prodRef = doc(db, "cart" + clientId, docId);
        deleteDoc(prodRef);
      });
    } catch (e) {
      console.log(e);
    }
  };
  const navigate = useNavigate();

  const goToLogIn = () => {
    navigate("/LogIn");
  };

  return (
    <React.Fragment>
      <NavBar />
      {!user && (
        <div className="noProductsToShow">
          <div className="noProductsInfo">
            <h3>No hay productos por mostrar, inicia sesión</h3>
            <button onClick={goToLogIn}>Inicia sesión</button>
          </div>
          <div className="imgCart">
            <img src={catCart} alt="catCart" />
          </div>
        </div>
      )}
      {user && (
        <>
          <>
            {cartProducts.length > 0 && (
              <div className="classProductsContainer">
                <div className="positionFixedCart">
                  <CartProducts
                    cartProducts={cartProducts}
                    cartProductIncrease={cartProductIncrease}
                    cartProductDecrease={cartProductDecrease}
                  />

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
