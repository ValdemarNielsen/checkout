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
      <p>You have {basket.length} in your basket:</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {basket.map((item) => (
          <li key={item.id}>
            <img src={item.image} className="imagepadding" />
            {item.quantity} x {item.name}
          </li>
        ))}
        {totalPriceWRebate(basket, discountAmount)}
      </div>
    </div>
  );
}

export default OrderSummary;
