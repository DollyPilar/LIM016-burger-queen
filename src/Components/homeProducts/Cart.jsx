import React, {useState, useEffect} from 'react';
import {auth, db} from '../../firebase/firebase-config.jsx'
import {onAuthStateChanged} from 'firebase/auth';
import { CartProducts } from './CartProducts.jsx';
import {doc, getDoc, collection, onSnapshot} from 'firebase/firestore';

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

    // // el estado de los carritos
    // const [cartProducts, setCartProducts]=useState([]);

    //   // useEffect(()=>{
    //     onAuthStateChanged(auth, (user) => {
    //         if(user){
    //     // const docRef = collection(db, 'Cart' + user.uid);

    //     })

     
    //     }

    // })
// }, [])
// console.log(cartProducts)
    return(
        <React.Fragment>
            <div>soy tu carrito</div>
            <div>Hola {user}</div>
            <br/>
            {cartProducts.length > 0 && (
                <div >
                    <h1 >Cart</h1>
                    <div>
                        <CartProducts cartProducts={cartProducts}/>
                    </div>
                </div>
            )}
            {cartProducts.length < 1 && (
                <div >No hay productos</div>
            ) }  
        </React.Fragment>
    )
}

