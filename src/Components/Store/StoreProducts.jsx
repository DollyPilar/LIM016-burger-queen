import React from "react";
import { IndividualStoreProducts } from "./IndividualStoreProducts";


export const StoreProducts = ({compras})=>{
    console.log("do",compras)
     
    if (compras.lenght>0){
        compras.map((compra)=>{
            console.log("sdf", compra)
        })
    }
     
    // return compras.for

    //  return compras.map((individualStoreProducts)=>(
    //  <IndividualStoreProducts key={individualStoreProducts.ID} 
    //  individualStoreProducts={individualStoreProducts} />
    //  ))

     return <div>productoo</div>


        
}