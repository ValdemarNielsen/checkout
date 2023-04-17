//Description: This is the shop page, where the user chooses which items they want to proceed to checkout with.
import { BasketItems, itemDict } from "../assets/products";
import { useState } from "react";
import "../styles/shop.css";

import DeleteButton from "../assets/buttons/DeleteButton";
import {
  DecrementButton,
  IncrementButton,
} from "../assets/buttons/custombutton";
import EmailWelcome from "../assets/EmailWelcome";
import DiscountBox from "../assets/components/discountCodeBox";
import TextBanner from "../assets/components/textBannerComponent";
import BannerSlider from "../assets/components/textBannerComponent";
import Banner from "../assets/components/Banner";

type ShopProps = {
  navigate: (newPage: string) => void;
};

const discountCodes = [{ code: "10", amount: 0.9 }];

function Shop(props: ShopProps) {
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

  const [discountAmount, setDiscountAmount] = useState<number>(1);

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
  const progressPoints = [
    { id: 1, label: "Shop", path: "/shop" },
    { id: 2, label: "Checkout", path: "/checkout" },
    { id: 3, label: "Payment", path: "/payment" },
    { id: 4, label: "Confirmation", path: "/confirmation" },
  ];

  function handleApplyDiscount(discountCode: string) {
    const discount = discountCodes.find((code) => code.code === discountCode);
    if (discount) {
      setDiscountAmount(discount.amount);
      return true;
    }
    setDiscountAmount(1);
    return false;
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

    totalPrice = totalPrice * discountAmount;

    return (Math.round(totalPrice * 100) / 100).toFixed(2);
  }

  return (
    <>
      {/*<LoadingPopup /> */}
      <EmailWelcome />
      <div className="layoutMaster container">
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
          <div className="col-2">
            {/* Insert rebateText function */}
            <DiscountBox onApply={handleApplyDiscount} />
            <p>You save = {rebateAmount(basket)},- DKK</p>
            <p>Total amount = {totalPriceWRebate(basket)},- DKK</p>
            <div>
              {/* Use the functions: rebateAmountWDiscount and totalPriceWDiscount */}
            </div>
          </div>
        </div>
      </div>
      <button
        className="buttoncontinue"
        onClick={() => props.navigate("checkout")}
      >
        Checkout
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <button onClick={pushData}>Submit Order</button>
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

export default Shop;
function discountapplied() {
  throw new Error("Function not implemented.");
}
