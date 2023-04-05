import React from "react";
import { useNavigate } from "react-router-dom";

interface CustomButtonProps {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}
const CustomButton = ({ label, disabled, onClick }: CustomButtonProps) => {
  return (
    <button className="buttoncontinue" disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};

export const DecrementButton = ({ onClick }: { onClick: () => void }) => {
  return <button className="buttondecrement" onClick={onClick}>-</button>;
}

export const IncrementButton = ({ onClick }: { onClick: () => void }) => {
  return <button className="buttonincrement" onClick={onClick}>+</button>;
}

export const SubmitButton = ({ disabled }: { disabled: boolean }) => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (!disabled) {
      navigate("/payment");
    }
  };

  return (
    <CustomButton label="Submit" disabled={disabled} onClick={handleOnClick} />
  );
};
export const ConfirmButton = ({ disabled }: { disabled: boolean }) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    if (!disabled) {
      navigate("/confirmation");
    }
  };

  return (
    <CustomButton label="Confirm" disabled={disabled} onClick={handleOnClick} />
  );
};

export const NextButton = ({ disabled }: { disabled: boolean }) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    if (!disabled) {
      navigate("/checkout");
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
