import React from "react";
import { BackButton, NextButton } from "../assets/buttons/custombutton";
import StepProgress from "../Progressbar/progressbar";

const Confirmation = () => {
  return (
    <>
      <StepProgress />

      <h1>Confirmation</h1>
      <div>
        <BackButton disabled={false} />
        <NextButton disabled={false} />
      </div>
    </>
  );
};
export default Confirmation;
