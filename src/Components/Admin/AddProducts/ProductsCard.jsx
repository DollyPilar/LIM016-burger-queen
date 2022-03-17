import React from "react";
import {IndividualProductCard} from "./IndividualProductCard.jsx";

export const ProductsCard = ({products, deleteProduct})=>{
  
    return(
        <React.Fragment>
        {products.length > 0 &&
        
          products.map((product) => (
            <IndividualProductCard
              key={product.ID}
              product={product}
              deleteProduct={deleteProduct}
            />
          ))}
      </React.Fragment>
    )
}