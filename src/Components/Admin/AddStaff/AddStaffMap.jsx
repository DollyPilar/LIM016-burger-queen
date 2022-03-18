import React from "react";
import { IndividualStaffCard } from "./IndividualStaffCard.jsx";
export const AddStaffMap = ({staff})=>{
    return(
        <React.Fragment>
        {staff.length > 0 &&
        
          staff.map((product) => (
            <IndividualStaffCard
              key={product.ID}
              product={product}
            />
          ))}
      </React.Fragment>
    )
}