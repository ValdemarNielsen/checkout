import {useContext, useState} from "react";
import "../styles/shop.css";
import "../styles/payment.css";
import { BasketContext, } from "../App";
import {rebateAmount} from "./shop"



function MobilepayNumber() {}

type PaymentProps = {
  navigate: (page: string) => void;
};

function Payment(props: PaymentProps) {
  const [phone, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const { basket, setBasket } = useContext(BasketContext);

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
      <div className="layoutMaster container row col-1">
        <h2 className="title">Payment</h2>
        <div style={{ alignItems: "center" }} className="paymentStyle">
          <div className="row">
            <div className="col-1">
              <p> Chose a payment method below</p>
              <div className="left">
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
                className={"left" && isPhoneValid || phone == "" ? "" : "invalid-field"}
              />
            </div>
            <div className="col-1">
              <p>You have saved = {rebateAmount(basket)} DKK</p>
              <p>Total payment amount = {} DKK</p>

              <div>
                Optional order comment:
                <input type="text" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
