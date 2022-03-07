import React, {useState} from "react";
import { IndividualStoreProducts } from "./IndividualStoreProducts";


export const StoreProducts = ({compras})=>{
    // console.log("do",compras)
    // const[comprasReales, setComprasReales] = useState("")
    return compras>0&& compras.map((individualStoreProducts)=>(
            <IndividualStoreProducts key={individualStoreProducts.ID}
            individualStoreProducts={individualStoreProducts} />
            ))
    

    // return compras.for

    
    
   

    //  return <div>productoo</div>



}