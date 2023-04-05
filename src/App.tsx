import { useState, useEffect } from "react";
import Shop from "./pages/shop";
import Checkout from "./pages/checkout";
import Confirmation from "./pages/confirmation";
import Payment from "./pages/payment";

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
  if (page === "checkout") {
    pageContent = <Checkout navigate={navigate} />;
  } else if (page === "payment") {
    pageContent = <Payment navigate={navigate} />;
  } else if (page === "confirmation") {
    pageContent = <Confirmation navigate={navigate} />;
  } else {
    pageContent = <Shop navigate={navigate} />;
  }

  return (
    <div className="App">
      <main>{pageContent}</main>
    </div>
  );
}

export default App;
