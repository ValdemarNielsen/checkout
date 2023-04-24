import React from "react";

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
    </>
  );
};
export default Confirmation;
