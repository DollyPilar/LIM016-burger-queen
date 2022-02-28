import React from 'react';
import { IndividualProduct } from './IndividualProduct.jsx';

export const Products = ({ products, addToCart }) => {
  // console.log(products);

  return products.map((individualProduct) => (
    <IndividualProduct
      key={individualProduct.ID}
      individualProduct={individualProduct}
      addToCart={addToCart}
    />
  ));
  // return (
  //     <div>un producto</div>
  // )
};
