import React from "react";
import { BackButton, NextButton } from "../assets/buttons/custombutton";
import StepProgress from "../Progressbar/progressbar";

const Payment = () => {
  return (
    <>
      <h1>Payment</h1>
      <StepProgress />

      <div>
        <BackButton disabled={false} />
        <NextButton disabled={false} />
      </div>
    </>
  );
};

export default Payment;
