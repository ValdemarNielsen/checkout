import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

  return (
    <div className="progress-bar">
      <div
        className="progress"
        style={{ width: `${(currentStep + 1) * 25}%` }}
      />
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step ${index === currentStep ? "active" : ""} ${
            index < currentStep ? "completed" : ""
          }`}
          onClick={() => navigate(step.path)}
        >
          {step.label}
        </div>
      ))}
    </div>
  );
};

export default StepProgress;
