import React, { useState, useEffect } from "react";
import "../styles/EmailWelcome.css";
function EmailWelcome() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const hasTakenAction = localStorage.getItem("hasTakenAction");
    if (!hasTakenAction) {
      const timer = setTimeout(() => setShow(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    // Here can we call the action if needed ;))
    localStorage.setItem("hasTakenAction", true.toString());
    setShow(false);
  };

  const handleNoThanks = () => {
    localStorage.setItem("hasTakenAction", true.toString());
    setShow(false);
  };

  return (
    <>
      {show && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">
                Subscribe to our newsletter and recieve 10% COUPON CODE!
              </h3>
            </div>
            <div className="modal-body">
              <p>
                Be the first to know about our latest products, exclusive offers
                and much more!
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <button type="submit">Sign me up!</button>
              </form>
              <button className="close-btn" onClick={handleNoThanks}>
                No thanks
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EmailWelcome;
