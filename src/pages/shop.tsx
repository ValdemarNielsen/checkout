//Description: This is the shop page, where the user chooses which items they want to proceed to checkout with.
import React from "react";
import products, { BasketItems, itemDict } from "../assets/products";
import { useState } from "react";
import "../styles/shop.css";

export default function Shop() {
  const [basket, setBasket] = useState<BasketItems[]>([
    {
      ...itemDict["clear-whey-100"],
      quantity: 2,
      giftWrap: false,
    },
    {
      ...itemDict["valle-protion-whey-100-vanilla"],
      quantity: 1,
      giftWrap: true,
    },
    {
      ...itemDict["valle-protein-whey-100-chocolate"],
      quantity: 2,
      giftWrap: false,
    },
  ] as BasketItems[]);

  const incrementBasketItem = (id: string) => {
    const newBasket = basket.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    setBasket(newBasket);
  };

  const decrementBasketItem = (id: string) => {
    const newBasket = basket.map((item) => {
      if (item.id === id) {
        if (item.quantity >=1) {
        return {
            ...item,
            quantity: item.quantity - 1,

        };
      }}
      return item;
    });

    setBasket(newBasket);
  };

  return (
    <div>
      <h1 className="shopstyle">Welcome to the House of Protein</h1>
      <h3>Choose your gains wheysely</h3>
      <div>
        {basket.map((product) => (
          <div
            style={{ display: "flex", flexDirection: "column" }}
            key={product.id}
            className="basketbox"
          >
            <h2>{product.name}</h2>

            <div>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <DecrementButton
                  onClick={() => decrementBasketItem(product.id)}
                />
                <button className="betweenbuttonstyle">
                  {" "}
                  <p>{product.quantity}</p>
                </button>
                <IncrementButton
                  onClick={() => incrementBasketItem(product.id)}
                />
              </div>
              <p>
                Pris: {product.price} {product.currency}
              </p>
            </div>
          </div>
        ))}
        <p>Du sparer = {rebateAmount(basket)},- DKK</p>
        <p>Total beløb = {totalPriceWRebate(basket)},- DKK</p>
      </div>
    </div>
  );
}

//Use useState to update the quantity of the products when using decrement and increment buttons.
function DecrementButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="buttonleft">
      -
    </button>
  );
}

function IncrementButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="buttonright">
      +
    </button>
  );
}

//Make the totalPriceWRebate function which calculates the total price of the basket and check the quantity of each product to see if the rebate applies.

function totalPriceWRebate(basket: BasketItems[]) {
  let totalPrice = 0;
  basket.forEach((item) => {
    totalPrice += item.price * item.quantity;
    if (item.quantity >= item.rebateQuantity) {
      totalPrice -= (item.price * item.quantity * item.rebatePercent) / 100;
    }
  });
  return totalPrice;
}

//Function that calculates the amount of rebate the user gets.
function rebateAmount(basket: BasketItems[]) {
  let rebate = 0;
  basket.forEach((item) => {
    if (item.quantity >= item.rebateQuantity) {
      rebate += (item.price * item.quantity * item.rebatePercent) / 100;
    }
  });
  return rebate;
}
