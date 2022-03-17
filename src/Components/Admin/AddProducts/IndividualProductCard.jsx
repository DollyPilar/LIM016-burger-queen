import React from "react";
import "./IndividualProductCard.css"
import { FaTrash } from "react-icons/fa";

export const IndividualProductCard = ({product, deleteProduct})=>{
    // console.log(product)
    const handleDeleteProduct = ()=>{
        deleteProduct(product)
    }
    return (
        <React.Fragment>
            <div className="individualProductCard">
                        
               <div className="cardImg">
                   <img src={product.Img} className ="imgProduct" alt="productImg"/>
               </div>
               <h3 className="productInfoCardName">{product.Nombre}</h3>
               <h3 className="productInfoCard">S./{product.Precio}</h3>
               <FaTrash className="productInfoCard" onClick={handleDeleteProduct}/>
               
            </div>
        </React.Fragment>
    )
}