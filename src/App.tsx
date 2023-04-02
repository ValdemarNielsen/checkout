// Link to webpage: https://checkoutgrp10.netlify.app/

import { createContext, FormEvent, useState } from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import "./styles/App.css";
import Shop from "./pages/shop";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Checkout from "./pages/checkout";
import Confirmation from "./pages/confirmation";
import Payment from "./pages/payment";
import { BasketItems, itemDict } from "./assets/products";

function divide(a: number, b: number): number {
  if (b === 0) {
    throw new Error("You can't divide by zero.");
  }
  return Math.round(a / b);
}

export const BasketContext = createContext<{
  basket: BasketItems[];
  setBasket: (items: BasketItems[]) => void;
}>({
  basket: [],
  setBasket: () => {},
});

function App() {
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

  return (
    <html lang="en">
      <link href="shop.css" rel="stylesheet" />
      <div className="App">
        <BasketContext.Provider value={{ basket, setBasket }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Shop />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/confirmation" element={<Confirmation />} />
            </Routes>
          </BrowserRouter>
        </BasketContext.Provider>
      </div>
    </html>
  );
}

export default App;
