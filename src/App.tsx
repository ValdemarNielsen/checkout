import { createContext, FormEvent, useState, useEffect } from "react";

import reactLogo from "./assets/react.svg";
import "./styles/App.css";
import Shop from "./pages/shop";
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

  const [page, setPage] = useState("shop");

  useEffect(() => {
    function popstateHandler() {
      const url = new URLSearchParams(window.location.search);
      const urlPage = url.get("page");
      console.log("popstate", { urlPage });
      setPage(urlPage || "shop");
    }
    addEventListener("popstate", popstateHandler);
    popstateHandler();
    return () => {
      removeEventListener("popstate", popstateHandler);
    };
  }, []);

  function navigate(ev: React.MouseEvent<HTMLAnchorElement>, newPage: string) {
    ev.preventDefault();
    history.pushState({}, "", `?page=${newPage}`);
    dispatchEvent(new PopStateEvent("popstate"));
  }

  let content = null;
  switch (page) {
    case "shop":
      content = <Shop />;
      break;
    case "checkout":
      content = <Checkout />;
      break;
    case "payment":
      content = <Payment />;
      break;
    case "confirmation":
      content = <Confirmation />;
      break;
    default:
      content = <Shop />;
  }

  return (
    <html lang="en">
      <link href="shop.css" rel="stylesheet" />
      <div className="App">
        <BasketContext.Provider value={{ basket, setBasket }}>
          <nav>
            <a href="?page=shop" onClick={(ev) => navigate(ev, "shop")}>
              Shop
            </a>
            <a href="?page=checkout" onClick={(ev) => navigate(ev, "checkout")}>
              Checkout
            </a>
            <a href="?page=payment" onClick={(ev) => navigate(ev, "payment")}>
              Payment
            </a>
            <a
              href="?page=confirmation"
              onClick={(ev) => navigate(ev, "confirmation")}
            >
              Confirmation
            </a>
          </nav>
          {content}
        </BasketContext.Provider>
      </div>
    </html>
  );
}

export default App;
