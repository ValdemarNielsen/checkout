import React, { useContext } from "react";
import { BasketContext } from "../../../App";

function OrderSummary() {
  const { basket, setBasket } = useContext(BasketContext);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>Order Summary</h2>
      <p>You have {basket.length} in your basket:</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {basket.map((item) => (
          <li key={item.id}>
            {item.name} x {item.quantity}
          </li>
        ))}
      </div>
    </div>
  );
}

export default OrderSummary;
