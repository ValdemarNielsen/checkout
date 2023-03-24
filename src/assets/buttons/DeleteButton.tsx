import React, { useState } from "react";
import "../../styles/CustomModal.css";

type ConfirmationModalProps = {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
};

function ConfirmationModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
}: ConfirmationModalProps) {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{title}</h2>
            <p>{message}</p>
            <div className="modal-actions">
              <button onClick={onConfirm}>Confirm</button>
              <button onClick={onCancel}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function DeleteButton({ onClick }: { onClick: () => void }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirm = () => {
    setIsModalOpen(false);
    onClick();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button onClick={() => setIsModalOpen(true)}>Remove</button>
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Confirm Deletion"
        message="Are you sure you want to remove this item?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default DeleteButton;
