import React, { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import "../styles/progressbar.css";

const StepProgress = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const steps = [
    { label: "Basket", path: "/" },
    { label: "Delivery", path: "/checkout" },
    { label: "Payment", path: "/payment" },
    { label: "Confirmation", path: "/confirmation" },
  ];

  const currentStep = steps.findIndex(
    (step) => step.path === location.pathname
  );

  const handleBack = () => {
    const prevStep = steps[currentStep - 1];
    if (prevStep) {
      navigate(prevStep.path);
    }
  };

  const handleNext = () => {
    const nextStep = steps[currentStep + 1];
    if (nextStep) {
      navigate(nextStep.path);
    }
  };

  return (
    <div className="step-progress">
      <div className="progress-bar">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`step ${index <= currentStep ? "active" : ""}`}
            onClick={() => navigate(step.path)}
          >
            <div className={`circle ${index === currentStep ? "active" : ""}`}>
              {index + 1}
            </div>
            <div className="label">{step.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepProgress;
