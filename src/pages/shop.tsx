//Description: This is the shop page, where the user chooses which items they want to proceed to checkout with.
import React from "react";
import products from "../assets/products";
export default function Shop() {
  return (

    <div>
      <h1>Welcome To The Shop</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.name}</h2>
            <p>
              {product.price} {product.currency}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}



