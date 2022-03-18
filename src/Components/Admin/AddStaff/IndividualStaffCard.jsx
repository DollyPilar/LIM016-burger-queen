import React from "react";
import "./IndividualStaffCard.css"

export const IndividualStaffCard=({product})=>{
    console.log(product)
  return(
      <React.Fragment>
          
          <div className="IndividualStaffCard">
          <h3 className="staffName">{product.name}</h3> 
          <h3 className="staffEmail">{product.email}</h3>   
          <h3 className="staffRol">{product.rol}</h3>    
          </div>
      </React.Fragment>
  )
}