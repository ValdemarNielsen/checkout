import { useState } from "react";

function DiscountBox() {
  const discountCodes = ["10PERCENT", "20PERCENT", "30PERCENT"];
  const [discountCode, setDiscountCode] = useState<string>("");

  const [appliedDiscount, setAppliedDiscount] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");

  const applyDiscount = () => {
    if (discountCodes.includes(discountCode)) {
      setAppliedDiscount(discountCode);
      setDiscountCode("");
      setErrorMessage("");
    } else {
      setErrorMessage("Invalid discount code");
    }
  };

  return (
    <div>
      <div>
        <p>Discount code</p>
        <input
          className="discountField"
          type="text"
          placeholder="Enter discount code"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
        <button className="applyDiscount" onClick={applyDiscount}>
          Apply discount
        </button>
      </div>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      {appliedDiscount && (
        <p className="appliedDiscount">Applied discount: {appliedDiscount}</p>
      )}
    </div>
  );
}
export const [appliedDiscount, setAppliedDiscount] = useState<string>("");

export default DiscountBox;
