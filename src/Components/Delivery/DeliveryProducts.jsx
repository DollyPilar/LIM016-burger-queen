import React from "react";
import { IndividualDeliveryProducts } from "./IndividualDeliveryProducts.jsx";

export const DeliveryProducts = ({ deliveries, deliverProduct }) => {
  //    if (deliveries.length>0){
  //        console.log(deliveries)
  //    }

  return (
    <React.Fragment>
      {deliveries.length > 0 &&
        deliveries.map((delivery) => (
          <IndividualDeliveryProducts
            key={delivery.ID}
            delivery={delivery}
            deliverProduct={deliverProduct}
          />
        ))}
    </React.Fragment>
  );
};
