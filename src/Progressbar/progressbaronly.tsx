import React from "react";
import "../styles/progressbar.css";

interface Step {
  label: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
}

const ProgressBarOnly = ({ steps, currentStep }: ProgressBarProps) => {
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

export default ProgressBarOnly;
