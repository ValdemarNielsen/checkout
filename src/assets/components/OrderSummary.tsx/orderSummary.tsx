import React, { useContext } from "react";
import { BasketContext, PriceContext } from "../../../App";

function OrderSummary() {
  const { basket, setBasket } = useContext(BasketContext);
  const {
    totalPrice,
    setTotalPrice,
    totalPriceWRebate,
    discountAmount,
    setDiscountAmount,
  } = useContext(PriceContext);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>Order Summary</h2>
      <p>You have {basket.length} items in your basket:</p>

        <div className="basketContainer">
      <div style={{ display: "flex", flexDirection: "column", whiteSpace: "nowrap", paddingBlockStart: "1rem", paddingBlockEnd: "1rem"}}>
        {basket.map((item) => (
          <li key={item.id}>
            <img src={item.image} className="imagepadding" />
            {item.quantity} x {item.name}
          </li>
        ))}
      </div>
      </div>

        <div>
          <p >Total price: {totalPriceWRebate(basket, discountAmount)} kr,-</p>
    </div>


    </div>
  );
}

export default OrderSummary;
