import React, {useState, useEffect} from 'react';
import {auth, db} from '../../firebase/firebase-config.jsx'
import {onAuthStateChanged} from 'firebase/auth';
import { CartProducts } from './CartProducts.jsx';
import {doc, getDoc, collection, onSnapshot, updateDoc, deleteDoc } from 'firebase/firestore';

export const Cart =()=>{

            // función que trae el nombre del usuario que está logueado
            const GetCurrentUser = () =>{
                const [user, setUser]=useState(null);
                useEffect(()=>{
                    onAuthStateChanged(auth, async (user) => {
                        if(user){
                    const docRef = doc(db, "users", user.uid);
                    const docSnap = await getDoc(docRef);
                             //console.log (docSnap.doc.data())
                    const userInfo = docSnap.data();
                    setUser(userInfo.name)
                    
                        }
                        else {
                              setUser(null)
                        }
                    })
                },[])
                return user;
            }
            const user = GetCurrentUser();

    // el estado de los carritos
    const [cartProducts, setCartProducts]=useState([]);

useEffect(
    () =>
    onAuthStateChanged(auth, (user) => {
        if(user){
      onSnapshot(collection(db, 'Cart' + user.uid), (snapshot) =>{

      const newCartProduct =    snapshot.docs.map((doc) => ({
              ID: doc.id,
              ...doc.data(),
          }));
          setCartProducts(newCartProduct);  
      })
    }
    }
    ),
    []
  );
//console.log(cartProducts)

//variable global
let Product;

const cartProductIncrease=(cartProduct)=>{
    Product = cartProduct;
    Product.quantity = Product.quantity +1;
    Product.TotalProductPrice = Product.quantity*Product.Precio
    // actualizando Firebase
    onAuthStateChanged(auth, async (user) => {
        if(user){
            const prodRef = doc(db, 'Cart' + user.uid, cartProduct.ID)
      await updateDoc(prodRef,{
       Product
      })
    }
    })
} // termina product increase

const cartProductDecrease=(cartProduct) =>{
    Product = cartProduct;
    if(Product.quantity >1){
        // puedes seguir quitando
    Product.quantity = Product.quantity -1;
    Product.TotalProductPrice = Product.quantity*Product.Precio
    onAuthStateChanged(auth, async (user) => {
        if(user){
            const prodRef = doc(db, 'Cart' + user.uid, cartProduct.ID)
      await updateDoc(prodRef,{
       Product
      })
    }
    })
    }
}

    return(
        <React.Fragment>
            <div>soy tu carrito</div>
            <div>Hola {user}</div>
            <br/>
            {cartProducts.length > 0 && (
                <div >
                    <h1 >Cart</h1>
                    <div>
                        <CartProducts cartProducts={cartProducts}
                         cartProductIncrease={cartProductIncrease}
                         cartProductDecrease={cartProductDecrease}
                        />
                    </div>
                </div>
            )}
            {cartProducts.length < 1 && (
                <div >No hay productos</div>
            ) }  
        </React.Fragment>
    )
}

