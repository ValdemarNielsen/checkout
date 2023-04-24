//Description: This is the shop page, where the user chooses which items they want to proceed to checkout with.
import { BasketItems, itemDict } from "../assets/products";
import { useContext, useState } from "react";
import "../styles/shop.css";

import DeleteButton from "../assets/buttons/DeleteButton";
import {
  DecrementButton,
  IncrementButton,
} from "../assets/buttons/custombutton";
import EmailWelcome from "../assets/EmailWelcome";
import DiscountBox from "../assets/components/discountCodeBox";
import { BasketContext, PriceContext } from "../App";

type ShopProps = {
  navigate: (newPage: string) => void;
};

const discountCodes = [
  { code: "10PERCENT", amount: 0.9 },
  { code: "20PERCENT", amount: 0.8 },
  { code: "NEWCOMMER", amount: 0.85 },
];

function Shop(props: ShopProps) {
  const { basket, setBasket } = useContext(BasketContext);
  const {
    totalPrice,
    setTotalPrice,
    discountAmount,
    setDiscountAmount,
    totalPriceWRebate,
  } = useContext(PriceContext);

  const rebate = rebateAmount(basket);

  let hol: any[] = [basket, "hello"];

  const incrementBasketItem = (id: String) => {
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

  const decrementBasketItem = (id: String) => {
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

  //Remove a product from the basket
  const removeItem = (id: String) => {
    const newBasket = basket.filter((item) => item.id !== id); //filter out the item with the id
    setBasket(newBasket);
  };

  const pushData = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const options: RequestInit = {
      method: "POST",
      headers,
      mode: "cors",
      body: JSON.stringify(hol),
    };
    fetch("https://eowi4vrof5hf7m0.m.pipedream.net", options);
  };

  function handleApplyDiscount(discountCode: string) {
    const discount = discountCodes.find((code) => code.code === discountCode);
    if (discount) {
      setDiscountAmount(discount.amount);
      return true;
    }
    setDiscountAmount(1);
    return false;
  }

  return (
    <>
      {/*<LoadingPopup /> */}
      <EmailWelcome />
      <div className="layoutMaster">
        <div className="container">
          <div className="row">
            <div className="col-1">
              {basket.map((product) => (
                <div>
                  <div key={product.id} className="basketbox itempadding">
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <img src={product.image} className="imagepadding" />
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          width: "25rem",
                        }}
                      >
                        <div className="font-link-title">{product.name}</div>

                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                          }}
                        >
                          <div className="smallpadding font-link-quantity">
                            <span>QUANTITY: </span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "space-evenly",
                              alignContent: "center",
                            }}
                          >
                            <DecrementButton
                              onClick={() => decrementBasketItem(product.id)}
                            />
                            <span className="quanText">{product.quantity}</span>
                            <IncrementButton
                              onClick={() => incrementBasketItem(product.id)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="priceCol"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyItems: "end",
                      }}
                    >
                      <p
                        className="priceText"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "end",
                        }}
                      >
                        {product.price} {product.currency}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "end",
                        }}
                      >
                        <DeleteButton onClick={() => removeItem(product.id)} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div
              className="col-2"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                {/* Insert rebateText function */}
                <DiscountBox onApply={handleApplyDiscount} />
                <p>You save = {rebateAmount(basket)},- DKK</p>
                <p>
                  Total amount = {totalPriceWRebate(basket, discountAmount)},-
                  DKK
                </p>
              </div>
              <div style={{ justifyContent: "end" }}>
                <button
                  className="buttoncontinue"
                  onClick={() => props.navigate("checkout")}
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

//Function that calculates the amount of rebate the user gets.
export function rebateAmount(basket: BasketItems[]) {
  let rebate = 0;
  let totalPrice = 0;
  let rabat = 0;
  let extrarabate = 0;
  basket.forEach((item) => {
    // Use BasketContext instead of basket
    if (item.quantity >= item.rebateQuantity) {
      rebate += (item.price * item.quantity * item.rebatePercent) / 100;
    }
  });

  basket.forEach((item) => {
    // Use BasketContext instead of basket
    totalPrice += item.price * item.quantity;
    if (item.quantity >= item.rebateQuantity) {
      totalPrice -= (item.price * item.quantity * item.rebatePercent) / 100;
    }
  });

  if (totalPrice >= 300 && rabat == 0) {
    extrarabate = totalPrice - totalPrice * 0.9;
    rabat = 1;
  }
  return (Math.round(rebate + extrarabate * 100) / 100).toFixed(2);
}

export default Shop;
function discountapplied() {
  throw new Error("Function not implemented.");
}
