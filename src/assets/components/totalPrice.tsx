import { useEffect, useState } from "react";
import { BasketItems } from "../products";
import { appliedDiscount } from "./discountCodeBox";

interface TotalPriceProps {
  basket: BasketItems[];
  discountCodeValue: string;
}

function TotalPrice(props: TotalPriceProps) {
  const { basket, discountCodeValue } = props;

  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    let calculatedPrice = 0;

    // Calculate total price
    basket.forEach((item) => {
      calculatedPrice += item.price * item.quantity;
      if (item.quantity >= item.rebateQuantity) {
        calculatedPrice -=
          (item.price * item.quantity * item.rebatePercent) / 100;
      }
    });

    // Apply discount code
    if (appliedDiscount === "10PERCENT") {
      calculatedPrice *= 0.9;
    } else if (appliedDiscount === "20PERCENT") {
      calculatedPrice *= 0.8;
    } else if (appliedDiscount === "30PERCENT") {
      calculatedPrice *= 0.7;
    }

    // Apply extra rebate
    if (calculatedPrice >= 300) {
      calculatedPrice *= 0.9;
    }

    setTotalPrice(calculatedPrice);
  }, [basket, discountCodeValue]);

  return <h2>Total Price: ${totalPrice.toFixed(2)}</h2>;
}

export default TotalPrice;
