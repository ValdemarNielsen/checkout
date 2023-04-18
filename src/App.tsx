import { useState, useEffect, ReactNode } from "react";
import Shop from "./pages/shop";
import Checkout from "./pages/checkout";
import Confirmation from "./pages/confirmation";
import Payment from "./pages/payment";
import Banner from "./assets/components/Banner/Banner";
import SitemapFooter from "./assets/components/Footer/SitemapFooter";
import NavbarComponent from "./assets/components/NavbarComponent/NavbarComponent";
import React from "react";

//Context Provider
// Define the BasketItems type
type BasketItems = {
  quantity: number;
  id: string;
  name: string;
  price: number;
  currency: string;
  rebateQuantity: number;
  rebatePercent: number;
  upsellProductId: string | null;
  image: string;
  giftWrap: boolean;
};

// Define the initial basket items
const initialBasketItems: BasketItems[] = [
  {
    id: "clear-whey-100",
    name: "Clear Whey 100, 1 kg",
    price: 150,
    currency: "DKK",
    rebateQuantity: 3,
    rebatePercent: 10,
    upsellProductId: null,
    image: "/clear_whey.png",
    quantity: 1,
    giftWrap: false,
  },
  {
    id: "valle-protion-whey-100-vanilla",
    name: "Whey-100 Vanilla, 1 kg",
    price: 170,
    currency: "DKK",
    rebateQuantity: 2,
    rebatePercent: 25,
    upsellProductId: "vitamin-c-depot-500-250",
    image: "/vanilla_whey.png",
    quantity: 1,
    giftWrap: false,
  },
  {
    id: "valle-protein-whey-100-chocolate",
    name: "Whey-100 Chocolate, 1 kg",
    price: 170,
    currency: "DKK",
    rebateQuantity: 3,
    rebatePercent: 10,
    upsellProductId: null,
    image: "/chocolate_whey.png",
    quantity: 1,
    giftWrap: false,
  },
  {
    id: "fish-oil-1000-120",
    name: "Omega 3 fish oil, 1000mg, 120 PCS",
    price: 69,
    currency: "DKK",
    rebateQuantity: 5,
    rebatePercent: 10,
    upsellProductId: null,
    image: "/fiske_olie.png",
    quantity: 1,
    giftWrap: false,
  },
];

// Create a context
export const BasketContext = React.createContext<BasketContextType>({
  basket: [],
  setBasket: () => {},
});

// Define the context type
type BasketContextType = {
  basket: BasketItems[];
  setBasket: React.Dispatch<React.SetStateAction<BasketItems[]>>;
};

function App() {
  const [page, setPage] = useState("shop");
  const [basket, setBasket] = useState<BasketItems[]>(initialBasketItems);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page");
    setPage(pageParam || "shop");
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

  useEffect(() => {
    window.history.pushState(null, "", `?page=${page}`);
  }, [page]);

  function navigate(newPage: string, updateUrl = true) {
    setPage(newPage);
    if (updateUrl) {
      window.history.pushState(null, "", `?page=${newPage}`);
    }
  }

  function handlePopState() {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get("page");
    setPage(pageParam || "shop");
  }

  useEffect(() => {
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  let pageContent;
  switch (page) {
    case "shop":
      pageContent = <Shop navigate={navigate} />;
      break;
    case "checkout":
      pageContent = <Checkout navigate={navigate} />;
      break;
    case "payment":
      pageContent = <Payment navigate={navigate} />;
      break;
    case "confirmation":
      pageContent = <Confirmation navigate={navigate} />;
      break;
    default:
      pageContent = <Shop navigate={navigate} />;
  }

  return (
    <div>
      <BasketContext.Provider value={{ basket, setBasket }}>
        <NavbarComponent />
        <Banner />
        <main>{pageContent}</main>
        <SitemapFooter />
      </BasketContext.Provider>
    </div>
  );
}

export default App;
