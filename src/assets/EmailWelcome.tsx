import React, { useState, useEffect } from "react";
import { BeatLoader } from "react-spinners";
import "../styles/EmailWelcome.css";

function EmailWelcome() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [showText, setShowText] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hasTakenAction = localStorage.getItem("hasTakenAction");
    if (!hasTakenAction) {
      const timer = setTimeout(() => setShow(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (canSubmit) {
      setIsLoading(true);
      setTimeout(() => {
        localStorage.setItem("hasTakenAction", true.toString());
        setIsLoading(false);
        setShowText(true);
        setTextVisible(true);
      }, 2000);
    }
  };

  const handleNoThanks = () => {
    localStorage.setItem("hasTakenAction", true.toString());
    setShow(false);
  };

  const handleClose = () => {
    localStorage.setItem("hasTakenAction", true.toString());
    setShow(false);
  };

  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEmail(event.target.value);
    setCanSubmit(event.target.value !== "");
  };

  return (
    <>
      {show && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">
                Subscribe to our newsletter and receive 10% COUPON CODE!
              </h3>
            </div>
            <div className="modal-body">
              <p>
                Be the first to know about our latest products, exclusive offers
                and much more!
              </p>
              {!showText && (
                <form onSubmit={handleSubmit}>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
                  {isLoading ? (
                    <div className="loading-spinner">
                      <BeatLoader color="#000000" loading={true} size={10} />
                    </div>
                  ) : (
                    <button type="submit" disabled={!canSubmit}>
                      Sign me up!
                    </button>
                  )}
                </form>
              )}
              {showText && (
                <p className="hidden-text">
                  USE CODE: NEWCOMMER to get 10% off your next order!
                </p>
              )}
              {textVisible && (
                <button className="close-btn" onClick={handleClose}>
                  Close
                </button>
              )}
              {!textVisible && (
                <button className="close-btn" onClick={handleNoThanks}>
                  No thanks
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EmailWelcome;
