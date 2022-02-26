import React, {useReducer} from 'react';
import CartItem from './cartItem.jsx';
import ProductItem from './dogItems.jsx';
import {shoppingInitialSate, shoppingReducer} from './dogReducer.js';
import {Types} from './dogAction.js'


function DogProducts(){

    const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialSate);
    const {products, cart} = state;

    const addToCart = (id) => {
        dispatch({type: Types.AddToCart, payload: id})
    }

    const delFromCart = (id, all = false) => {
       // console.log(all)
    if(all){
        dispatch({type: Types.RemoveAllFromCart, payload:id});
    } else {
        dispatch({type: Types.RemoveOneFromCart, payload:id});
    }

    }

    const clearCart = () => {
dispatch({type: Types.ClearCart})
    }

    return(
        <React.Fragment>
            <div>Lista productos de perros</div>
            {products.map((product) =>
             <ProductItem key= {product.id} data={product} addToCart={addToCart}/>)}
        
        <h2>carrito de compras</h2>
        <button onClick={clearCart}>limpiar carrito</button>

        {cart.map((item, index) => (
           <CartItem key={index} data={item} delFromcart={delFromCart}/> 
        ))} 
        
        </React.Fragment>

    )
}

export default DogProducts