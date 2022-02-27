import React from 'react';

export const IndividualFilteredProduct = ({individualFilteredProduct, addToCart}) => {

    const handleAddToCart=()=>{
        addToCart(individualFilteredProduct);
    }

    return (
        <React.Fragment> 
        <div className='product'>
            {/* <div className='product-img'>
                <img src={individualFilteredProduct.Imagen} alt="product-img"/>
            </div> */}
            <div >{individualFilteredProduct.Nombre}</div>
            <div >{individualFilteredProduct.Cantidad}</div>
            <div> $ {individualFilteredProduct.Precio}</div>
            <button onClick={handleAddToCart}>Añadir al carrito</button>
        </div> 
        </React.Fragment>
    )
}