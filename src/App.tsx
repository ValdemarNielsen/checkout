import { useState, useEffect, ReactNode } from "react";
import Shop from "./pages/shop";
import Checkout from "./pages/checkout";
import Confirmation from "./pages/confirmation";
import Payment from "./pages/payment";
import Banner from "./assets/components/Banner/Banner";
import SitemapFooter from "./assets/components/Footer/SitemapFooter";
import NavbarComponent from "./assets/components/NavbarComponent/NavbarComponent";
import React from "react";
import Navbar from "./assets/components/NavbarComponent/NavbarComponent";

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

export const PersDataContext = React.createContext<PersDataType>({
  email: "",
  firstName: "",
  lastName: "",
  phone: 0,
  address1: "",
  address2: "",
  zip: 0,
  country: "",
  companyName: "",
  vatNumber: 0,
  basket: [],
});
type PersDataType = {
  email: string;
  firstName: string;
  lastName: string;
  phone: number;
  address1: string;
  address2: string;
  zip: number;
  country: string;
  companyName: string;
  vatNumber: number;
  basket: BasketItems[];
};

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

export const PriceContext = React.createContext<PriceContextType>({
  totalPrice: 0,
  setTotalPrice: () => {},
  discountAmount: 0,
  setDiscountAmount: () => {},
  totalPriceWRebate: totalPriceWRebate,
});

type PriceContextType = {
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  discountAmount: number;
  setDiscountAmount: React.Dispatch<React.SetStateAction<number>>;
  totalPriceWRebate: (
    BasketContext: BasketItems[],
    discountAmount: number
  ) => string;
};
export function totalPriceWRebate(
  BasketContext: BasketItems[],
  discountAmount: number
) {
  let rabatGiven = 0;
  let totalPrice = 0;
  BasketContext.forEach((item) => {
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

function App() {
  const [page, setPage] = useState("shop");
  const [basket, setBasket] = useState<BasketItems[]>(initialBasketItems);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discountAmount, setDiscountAmount] = useState<number>(1);

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
        <PriceContext.Provider
          value={{
            totalPrice,
            setTotalPrice,
            discountAmount,
            setDiscountAmount,
            totalPriceWRebate,
          }}
        >
          <Navbar />
          <Banner />
          <main>{pageContent}</main>
          <SitemapFooter />
        </PriceContext.Provider>
      </BasketContext.Provider>
    </div>
  );
}

export default App;
