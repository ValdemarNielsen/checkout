import StepProgress from "../Progressbar/progressbar";
import { useState } from "react";
import "../styles/shop.css";

import {
  BackButton,
  NextButton,
  SubmitButton,
  ConfirmButton,
} from "../assets/buttons/custombutton";

function MobilepayNumber() {}

export default function Payment() {
  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);

  const handlePhoneChange = (e: { target: { value: any } }) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    if (/^\d{8}$/.test(newPhone)) {
      setIsPhoneValid(true);
    } else {
      setIsPhoneValid(false);
    }
  };

  return (
    <>
      <div>
        <StepProgress />
        <h2 className="title">Payment</h2>
        <div style={{ alignItems: "center" }} className="shopstyle">
          <div className="row">
            <div className="col-1">
              <p> Chose a payment method below</p>
              <div>
                Mobilepay
                <input type="checkbox" className="checkboxSize" />
              </div>
              <p></p>
              <label htmlFor="phone">Phone number </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                className={isPhoneValid || phone == "" ? "" : "invalid-field"}
              />
            </div>
            <div className="col-2">
              <p>You have saved = 0 DKK</p>
              <p>Total payment amount = 0 DKK</p>

              <div>
                Optional order comment:
                <input type="text" />
              </div>
              <ConfirmButton disabled={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
