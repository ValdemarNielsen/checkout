import React from "react";
import { BackButton, NextButton } from "../assets/buttons/custombutton";
import StepProgress from "../Progressbar/progressbar";
type ConfirmationProps = {
  navigate: (page: string) => void;
};

const Confirmation: React.FC<ConfirmationProps> = ({ navigate }) => {
  const handlePaymentClick = () => {
    navigate("payment");
  };
  return (
    <>
      <h1>Confirmation</h1>
      <div>
        <BackButton disabled={false} />
        <NextButton disabled={false} />
      </div>
    </>
  );
};
export default Confirmation;
