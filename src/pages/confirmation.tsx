import React from "react";
import ".././styles/shop.css";

type ConfirmationProps = {
  navigate: (page: string) => void;
};

function Confirmation(props: ConfirmationProps) {
  return (
    <>
      <div
        className="layoutMaster container"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <h1 style={{ padding: "0.5rem" }}>CONFIRMATION</h1>
        <div>
          <h1>Thank you for your order!</h1>
          <p>Your order number is: #DK411</p>
        </div>
        <span>A confirmation email has been sent to your mail</span>
      </div>
    </>
  );
}
export default Confirmation;
