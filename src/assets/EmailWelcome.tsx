import React, { useState, useEffect } from "react";
import "../styles/EmailWelcome.css";

function EmailWelcome() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    //Her kan vi kalde eventet fx som API hvis vi vil have brugerens svar :D
    setShow(false);
  };

  return (
    <>
      {show && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">
                Subscribe to our newsletter and recieve a 10% OFF coupon code!
              </h3>
            </div>
            <div className="modal-body">
              <p>
                Thanks for visiting our website! If you want to subscribe to our
                newsletter and get the latest updates, please enter your email
                address below.
              </p>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
                <button type="submit">Yes, I would like discount</button>
              </form>
              <button className="close-btn" onClick={() => setShow(false)}>
                No, I dont want discount
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EmailWelcome;
