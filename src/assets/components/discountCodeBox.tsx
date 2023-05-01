import { useState } from "react";

function DiscountBox({
  onApply,
}: {
  onApply: (discountCode: string) => boolean;
}) {
  const [discountCode, setDiscountCode] = useState<string>("");

  const [appliedDiscount, setAppliedDiscount] = useState<string>("");

  const [errorMessage, setErrorMessage] = useState<string>("");

  const applyDiscount = () => {
    const result = onApply(discountCode);
    if (result) {
      setAppliedDiscount(discountCode);
      setErrorMessage("");
      return;
    }

    setErrorMessage("Invalid discount code");
    // if (discountCodes.includes(discountCode)) {
    //   setAppliedDiscount(discountCode);
    //   setDiscountCode("");
    //   setErrorMessage("");
    // } else {
    //   setErrorMessage("Invalid discount code");
    // }
  };

  return (
    <div>
      <span className="discount-header">ENTER DISCOUNT </span>

      <div>
        <input
          className="discountField"
          type="text"
          placeholder="DISCOUNT HERE"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
        />
        <button className="applyDiscount" onClick={applyDiscount}>
          APPLY
        </button>
      </div>
      {errorMessage && <p className="errorMessage">{errorMessage}</p>}
      {appliedDiscount && (
        <p className="appliedDiscount">Applied discount: {appliedDiscount}</p>
      )}
    </div>
  );
}
export default DiscountBox;
