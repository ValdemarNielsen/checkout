import React from "react";
import { useNavigate } from "react-router-dom";

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

  const handleOnClick = () => {
    if (!disabled) {
      navigate("/payment");
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

  const handleOnClick = () => {
    if (!disabled) {
      navigate("/");
    }
  };

  return (
    <CustomButton label="Back" disabled={disabled} onClick={handleOnClick} />
  );
};
