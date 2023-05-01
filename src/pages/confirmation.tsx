import React from "react";

type ConfirmationProps = {
  navigate: (page: string) => void;
};




function Confirmation(props: ConfirmationProps) {
  return (
    <>
      <h1>Confirmation</h1>
        <div>
            <h1>Thank you for your order!</h1>
            <p>Your order number is: #DK411</p>
        </div>
    </>
  );
}
export default Confirmation;
