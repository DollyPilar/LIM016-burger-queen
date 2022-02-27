import React from 'react'

export const IndividualProduct = ({individualProduct, addToCart}) => {
    // console.log(individualProduct);
    const handleAddToCart = () =>{
        addToCart(individualProduct)
    }
    return (
        <React.Fragment>
        <div className='product'>
            {/* <div >
                <img src={individualProduct.Imagen} alt="product-img"/>
            </div> */}
            <div>{individualProduct.Nombre}</div>
            <div>{individualProduct.Cantidad}</div>
            <div>S/.{individualProduct.Precio}</div>
            <button onClick={handleAddToCart}>Añade a tu carrito</button>
        </div> 
        </React.Fragment>
    )
}