import React from "react";
import { IndividualStoreProducts } from "./IndividualStoreProducts.jsx";

export const StoreProducts = ({ orders, updateState, cancelShop }) => {
  return (
    <React.Fragment>
      {orders.length > 0 &&
        orders.map((order) => (
          <IndividualStoreProducts
            key={order.ID}
            order={order}
            updateState={updateState}
            cancelShop={cancelShop}
          />
        ))}
    </React.Fragment>
  );
};
