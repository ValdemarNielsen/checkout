//Description: This is the shop page, where the user chooses which items they want to proceed to checkout with.
import React, { useContext, useEffect } from "react";
import products, { BasketItems, itemDict } from "../assets/products";
import { useState } from "react";
import "../styles/shop.css";
import { Link, Navigate, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProgressBarOnly from "../Progressbar/progressbaronly";
import StepButtons from "../Progressbar/progressbutton";
import StepProgress from "../Progressbar/progressbar";
import {BackButton, DecrementButton, IncrementButton, NextButton} from "../assets/buttons/custombutton";
import DeleteButton from "../assets/buttons/DeleteButton";
import EmailForm from "../assets/EmailWelcome";
import { BasketContext } from "../App";

export default function Shop() {
  const { basket, setBasket } = useContext(BasketContext);

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

  //Remove a product from the basket
  const removeItem = (id: string) => {
    const newBasket = basket.filter((item) => item.id !== id); //filter out the item with the id
    setBasket(newBasket);
  };

  const navigate = useNavigate();
  const handleOnClick = () => {
    if (isNotEmpty()) {
      navigate("/checkout");
    }
  };

  const isNotEmpty = () => {
    if (basket.length == 0) {
      return false;
    }
    return true;
  };

  const pushData = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const options: RequestInit = {
      method: "POST",
      headers,
      mode: "cors",
      body: JSON.stringify(basket),
    };
    fetch("https://eowi4vrof5hf7m0.m.pipedream.net", options);
  };

  return (
    <div>
      {/*<LoadingPopup /> */}
      <h1 className="shopstyle">Welcome to the House of Protein</h1>
      <h3 className="secondTitle">Choose your gains wheysely</h3>
      <StepProgress />
      <EmailForm />

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
                    }} className=""
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
                    justifyItems: "end"
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
        <div className="col-2">
          <div>{discountBox()}</div>
          {/* Insert rebateText function */}
          <p>You save = {rebateAmount(basket)},- DKK</p>
          <p>Total amount = {totalPriceWRebate(basket)},- DKK</p>
          <NextButton disabled={false} />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <button onClick={pushData}>Submit Order</button>
      </div>
    </div>
  );
}

//Use useState to update the quantity of the products when using decrement and increment buttons.





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

//Function which displays only text based the amount of product quantity the user has left to get the rebate.
function rebateText(basket: BasketItems[]) {
  basket.forEach((item) => {
    if (item.quantity >= item.rebateQuantity) {
      return (
        <div>
          <p>You have reached the rebate quantity</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>
            You need to buy {item.rebateQuantity - item.quantity} more of this
            product to get the rebate
          </p>
        </div>
      );
    }
  }, []);
}
