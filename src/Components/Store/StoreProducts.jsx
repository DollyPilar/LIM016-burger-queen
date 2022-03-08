import React from "react";
import { IndividualStoreProducts } from "./IndividualStoreProducts.jsx";


export const StoreProducts = ({compras})=>{
    // if(compras.length>0){
    // }

    // console.log("do", compras)
    // console.log("do",compras)
    // const[comprasReales, setComprasReales] = useState("")
    return (
        <React.Fragment>
           
           {
            compras.length>0&& (compras.map((compra)=>(
                <div>{compra.nombre} </div>
                ))) 
            }

            {/* {
            compras.length>0&& (compras.map((compra)=>(
                <IndividualStoreProducts key={compra.ID}
                compra={compra} />
                ))) 
            } */}
        </React.Fragment>
    )
    
    
    
    // return compras.for

    
    
   

    //  return <div>productoo</div>



}