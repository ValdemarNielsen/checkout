//Description: This is the shop page, where the user chooses which items they want to proceed to checkout with.
import React from "react";
import products, { BasketItems, itemDict } from "../assets/products";
import { useState } from "react";
import "../styles/shop.css";
import { Navigate } from "react-router-dom";

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
    {
      ...itemDict["fish-oil-1000-120"],
      quantity: 1,
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
                if (item.quantity >= 2) {
                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                }
            }
            return item;
        });
        setBasket(newBasket);
    };

    const removeItem = (id: string) => {
        const delBasket = basket.map((item) => {
            let j = 0

            for (let i = 0; i < basket.length; i++) {
                if (basket[i].id == id){
                    j = i
                    break
                }
            }
            delete delBasket[j]
        })

        return delBasket
    }

  return (
    <div>
      <h1 className="shopstyle">Welcome to the House of Protein</h1>
      <h3 className="secondTitle">Choose your gains wheysely</h3>
      <div>
        {basket.map((product) => (
          <div key={product.id} className="basketbox itempadding">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <img src={product.image} className="imagepadding" />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div className="font-link-title">{product.name}</div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <div className="smallpadding font-link-quantity">
                      <p>Quantity : </p>
                    </div>
                    <DecrementButton
                      onClick={() => decrementBasketItem(product.id)}
                    />
                    <p>{product.quantity}</p>
                    <IncrementButton
                      onClick={() => incrementBasketItem(product.id)}
                    />
                      <DeleteButton
                          onClick={() => removeItem(product.id)}
                      />
                  </div>
                </div>
              </div>
            </div>
            <div></div>
            {product.price} {product.currency}
          </div>
        ))}

        <div>{discountBox()}</div>
        <p>You save = {rebateAmount(basket)},- DKK</p>
        <p>Total amount = {totalPriceWRebate(basket)},- DKK</p>
      </div>
      {/* //Navigate to checkoyt.tsx when the user clicks the checkout button. */}
      <div>
        {/* useNavigate or Navigate to, to navigate */}
        <button onClick={() => {}}>Gå til betaling</button>
      </div>
    </div>
  );
}

//Use useState to update the quantity of the products when using decrement and increment buttons.
function DecrementButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="buttondecrement">
      -
    </button>
  );
}

function IncrementButton({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick} className="buttonincrement">
      +
    </button>
  );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
    return (
        <button onClick={onClick} className="buttondelete">
            x
        </button>
    );
}

//Make the totalPriceWRebate function which calculates the total price of the basket and check the quantity of each product to see if the rebate applies.

function totalPriceWRebate(basket: BasketItems[]) {
  let rabatGiven = 0;
  let totalPrice = 0;
  basket.forEach((item) => {
    totalPrice += item.price * item.quantity;
    if (item.quantity >= item.rebateQuantity) {
      totalPrice -= (item.price * item.quantity * item.rebatePercent) / 100;
    }
  });
  if (totalPrice >= 300 && rabatGiven == 0) {
    totalPrice = totalPrice * 0.9;
    rabatGiven = 1;
  }
  // return totalPrice;
  return (Math.round(totalPrice * 100) / 100).toFixed(2);
}

/*
// function to change go from "shop" to "checkout"
function changeSite() {
const [screen, setScreen] = useState(0);
    if (useState == 1) {
        site = "Checkout";
        state == 0;
    }
    if (state == 0) {
        site = "Shop";
        state == 1;
    }
}
*/


//Function that calculates the amount of rebate the user gets.
function rebateAmount(basket: BasketItems[]) {
  let rebate = 0;
  let totalPrice = 0;
  let rabat = 0;
  let extrarabate = 0;
  basket.forEach((item) => {
    if (item.quantity >= item.rebateQuantity) {
      rebate += (item.price * item.quantity * item.rebatePercent) / 100;
    }
  });

  basket.forEach((item) => {
    totalPrice += item.price * item.quantity;
    if (item.quantity >= item.rebateQuantity) {
      totalPrice -= (item.price * item.quantity * item.rebatePercent) / 100;
    }
  });

  if (totalPrice >= 300 && rabat == 0) {
    extrarabate = totalPrice - totalPrice * 0.9;
    rabat = 1;
  }
  // return rebate + extrarabate;
  return (Math.round(rebate + extrarabate * 100) / 100).toFixed(2);
}

//Function discountBox, shows a box with a button to apply a discount code from one of the different codes in the discountCodes array.
function discountBox() {
  const discountCodes = ["10PERCENT", "20PERCENT", "30PERCENT"];
  const [discountCode, setDiscountCode] = useState<string>("20");

  const applyDiscount = (discountCode: string) => {
    setDiscountCode(discountCode);
  };

  return (
    //If discountCodes then apply the discount code, else show the discount box.
    <div>
      {discountCodes.length > 0 ? (
        <div>
          <div className="discountbox">
            <p>Discount code</p>
            <input
              type="text"
              placeholder="Enter discount code"
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <button onClick={() => applyDiscount(discountCode)}>
              Apply discount
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p>Discount code applied</p>
        </div>
      )}
    </div>
  );
}
