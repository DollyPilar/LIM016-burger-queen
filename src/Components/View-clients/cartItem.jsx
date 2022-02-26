import React from 'react';

const CartItem = ({data, delFromcart}) => {

    let {id, name, price, quantity} = data;
    return (
        <React.Fragment>
    <h4>{name}</h4>
       <h5> ${price}.00 x {quantity} = ${price*quantity}00</h5>
       <button onClick={() => delFromcart(id)} >Eliminnar uno</button>
      <br/> 
       <button onClick={() => delFromcart(id, true)}>Eliminnar todi</button>

        </React.Fragment>
    )
}
export default CartItem;