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
            {/* Two buttons that have a increment a decrement as a onClick function for the specific product item and then change the value of the products quantity*/}
            <button
              onClick={() => {
                if (product.quantity >= 1) {
                  product.quantity--;
                }
                else {
                    product.quantity = 0;
                }
              }}
            >
              -
            </button>
            <button
              onClick={() => {
                product.quantity++;
              }}
            >
              +
            </button>
            <p>Quantity = {product.quantity}</p>
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
      total +=
        products[i].price *
        (100 - products[i].rebatePercent / 100) *
        products[i].quantity;
    } else {
      total += products[i].price * products[i].quantity;
    }
  }
  return total;
}
