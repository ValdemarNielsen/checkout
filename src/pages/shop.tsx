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
              stk. pris = {product.price} {product.currency}
            </p>
          </div>
        ))}
        <p> Total pris = {totalPriceRebate(products)} </p>
      </div>
    </div>
  );
}

function totalPriceRebate(product: any) {
  let total = 0;
  for (let i = 0; i < products.length; i++) {
    if (products[i].quantity >= products[i].rebateQuantity) {
      total += products[i].price * (1 - products[i].rebatePercent / 100);
    } else {
      total += products[i].price;
    }
  }
  return total;
}
