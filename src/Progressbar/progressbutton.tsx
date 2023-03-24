import React from "react";
import "../styles/progressbar.css";

interface StepButtonsProps {
  handleBack: () => void;
  handleNext: () => void;
  currentStep: number;
  totalSteps: number;
}

const StepButtons = ({
  handleBack,
  handleNext,
  currentStep,
  totalSteps,
}: StepButtonsProps) => {
  return (
    <div className="step-buttons">
      <button onClick={handleBack} disabled={currentStep === 0}>
        Back
      </button>
      <button onClick={handleNext} disabled={currentStep === totalSteps - 1}>
        Continue
      </button>
    </div>
  );
};

export default StepButtons;
