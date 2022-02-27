import React from 'react'
import {auth, db} from '../../firebase/firebase-config.jsx';
import { doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
export const IndividualCartProduct = ({cartProduct, cartProductIncrease, cartProductDecrease}) => {
    //console.log(cartProduct.Product)
    const handleCartProductIncrease=()=>{
        cartProductIncrease(cartProduct.Product);
    }
    const handleCartProductDecrease = () =>{
        cartProductDecrease(cartProduct.Product)

    }
    const handleCartProductDelete = () => {
        onAuthStateChanged(auth, async (user) => {
            if(user){
                const prodRef = doc(db, 'Cart' + user.uid, cartProduct.Product.ID)
          await deleteDoc(prodRef)
        }
        })
    }
    return (
        <div className='product'>
            {/* <div >
                <img src={cartProduct.Product.Imagen} alt="product-img"/>
            </div> */}
            <div >{cartProduct.Product.Nombre}</div>
            <div >{cartProduct.Product.Cantidad}</div>
            <div >Precio unitarios:S/.
                 {cartProduct.Product.Precio}</div>
            <span>Quantity</span>
            <div >
                <div >
                <button onClick={handleCartProductDecrease}>-</button>
                </div>                
                <div>{cartProduct.Product.quantity}</div>               
                <div >
                    <button onClick={handleCartProductIncrease}>+</button>
                </div>
            </div>
            <div> Precio final:S/. {cartProduct.Product.TotalProductPrice}</div>
            <button onClick={handleCartProductDelete}>DELETE</button>            
        </div>
    )
}