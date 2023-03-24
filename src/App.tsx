// Link to webpage: https://checkoutgrp10.netlify.app/

import { FormEvent, useState } from "react";

// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import "./styles/App.css";
import Shop from "./pages/shop";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Checkout from "./pages/checkout";
import Confirmation from "./pages/confirmation";
import Payment from "./pages/payment";

function App() {
  const [count, setCount] = useState(0);

  return (
    <html lang="en">
      <link href="shop.css" rel="stylesheet" />
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/confirmation" element={<Confirmation />} />
          </Routes>
        </BrowserRouter>
      </div>
    </html>
  );
}

export default App;
