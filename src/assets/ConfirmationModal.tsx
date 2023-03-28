import React from "react";

export interface ConfirmationModalProps {
  show: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmationModal(props: ConfirmationModalProps) {
  const { show, onConfirm, onCancel, message } = props;

  return (
    <>
      {show && (
        <div className="modal-container">
          <div className="modal">
            <div className="modal-message">{message}</div>
            <div className="modal-buttons">
              <button onClick={onConfirm}>Confirm</button>
              <button onClick={onCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ConfirmationModal;
