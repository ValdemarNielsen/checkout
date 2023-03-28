import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface CustomButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

const CustomButton = ({ label, disabled, onClick }: CustomButtonProps) => {
  return (
    <button disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};

export const NextButton = ({ disabled }: { disabled: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOnClick = () => {
    if (!disabled) {
      switch (location.pathname) {
        case "/":
          navigate("/checkout");
          break;
        case "/checkout":
          navigate("/payment");
          break;
        case "/payment":
          navigate("/confirmation");
          break;
        default:
          break;
      }
    }
  };

  return (
    <CustomButton
      label="Continue"
      disabled={disabled}
      onClick={handleOnClick}
    />
  );
};

export const BackButton = ({ disabled }: { disabled: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOnClick = () => {
    if (!disabled) {
      switch (location.pathname) {
        case "/checkout":
          navigate("/");
          break;
        case "/payment":
          navigate("/checkout");
          break;
        case "/confirmation":
          navigate("/payment");
          break;
        default:
          break;
      }
    }
  };

  return (
    <CustomButton label="Back" disabled={disabled} onClick={handleOnClick} />
  );
};
