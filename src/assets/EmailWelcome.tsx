import { SetStateAction, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
function EmailForm() {
  const [showForm, setShowForm] = useState(!localStorage.getItem("email"));
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    localStorage.setItem("email", email);
    setEmail("");
    setShowForm(false);
    setShowModal(false);
  };

  const handleEmailChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
  };

  const handleModalConfirm = () => {
    setShowForm(true);
    setShowModal(false);
  };

  const handleModalCancel = () => {
    setShowForm(false);
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
          onConfirm={handleModalConfirm}
          onCancel={handleModalCancel}
          message="Please enter your email address:"
        />
      )}
    </div>
  );
}

export default EmailForm;
