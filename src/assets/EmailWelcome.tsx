import { SetStateAction, useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal";

function EmailForm() {
  const [showForm, setShowForm] = useState(!localStorage.getItem("email"));
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    localStorage.setItem("email", email);
    setEmail("");
    setShowForm(false);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleModalConfirm = () => {
    setShowModal(false);
    localStorage.setItem("email", email);
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  return (
    <div>
      {showForm ? (
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={handleEmailChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <ConfirmationModal
          show={showModal}
          message="Please enter your email address:"
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
        >
          <p>Please enter your email address:</p>
        </ConfirmationModal>
      )}
    </div>
  );
}

export default EmailForm;
