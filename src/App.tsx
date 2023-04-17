import { useState, useEffect } from "react";
import Shop from "./pages/shop";
import Checkout from "./pages/checkout";
import Confirmation from "./pages/confirmation";
import Payment from "./pages/payment";
import Banner from "./assets/components/Banner/Banner";
import SitemapFooter from "./assets/components/Footer/SitemapFooter";
import NavbarComponent from "./assets/components/NavbarComponent/NavbarComponent";

function App() {
  const [page, setPage] = useState("shop");

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

  const progressPoints = [
    { id: 0, label: "Shopping", path: "/" },
    { id: 1, label: "Checkout", path: "/checkout" },
    { id: 2, label: "Payment", path: "/payment" },
    { id: 3, label: "Confirmation", path: "/confirmation" },
  ];

  return (
    <div>
      <NavbarComponent />
      <Banner />
      <main>{pageContent}</main>
      <SitemapFooter />
    </div>
  );
}

export default App;
