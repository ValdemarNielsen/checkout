import React, { useState } from "react";
import "../styles/progressbar.css";
interface Step {
  label: string;
}

const steps: Step[] = [
  { label: "Basket" },
  { label: "Delivery" },
  { label: "Payment" },
  { label: "Confirmation" },
];

export const ProgressBar = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="progress-bar">
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${index <= currentStep ? "active" : ""}`}
        >
          <div className={`circle ${index === currentStep ? "active" : ""}`}>
            {index + 1}
          </div>
          <div className="label">{step.label}</div>
        </div>
      ))}
    </div>
  );
};

const StepProgress = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return (
    <div className="step-progress">
      <ProgressBar currentStep={currentStep} />
      <div className="buttons">
        <button onClick={handleBack} disabled={currentStep === 0}>
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={currentStep === steps.length - 1}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default StepProgress;
