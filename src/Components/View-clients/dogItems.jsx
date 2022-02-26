import React from 'react';

const ProductItem = ({data, addToCart}) =>{
    let {id, name, price} = data;

    return(

        <React.Fragment>
        <h4>{name}</h4>
       <h5> ${price}.00</h5>
       <button onClick={() => addToCart(id)}>Agregar</button>

        </React.Fragment>
    )
 
}

export default ProductItem;