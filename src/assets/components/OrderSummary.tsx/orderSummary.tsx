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
            <img src={item.image} className="imagepadding" />
            {item.quantity} x {item.name}
          </li>
        ))}
      </div>
    </div>
  );
}

export default OrderSummary;
