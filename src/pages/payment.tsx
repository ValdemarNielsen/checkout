import React, {useContext, useState} from "react";
import "../styles/shop.css";
import "../styles/payment.css";
import {BasketContext, PriceContext, PersDataContext} from "../App";
import {NavigationActions} from "react-navigation";
import navigate = NavigationActions.navigate;


type PaymentProps = {
  navigate: (newPage: string) => void;
}

function MobilepayNumber() {}


function Payment(props: PaymentProps) {
    const {
      email,
      firstName,
      lastName,
      phone,
      address1,
      address2,
      zip,
      country,
      companyName,
      vatNumber
    } = useContext(PersDataContext)

  const {
    totalPrice,
    setTotalPrice,
    discountAmount,
    setDiscountAmount,
    totalPriceWRebate,
  } = useContext(PriceContext);

    const pushData = () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    let persData: any[] = [
      email,
      firstName,
      lastName,
      phone,
      address1,
      address2,
      zip,
      country,
      companyName,
      vatNumber,
      basket
    ];

    const data: RequestInit = {
      method: "POST",
      headers,
      mode: "cors",
      body: JSON.stringify(persData),
    };
    fetch("https://eowi4vrof5hf7m0.m.pipedream.net", data);
  };

  const [phonee, setPhone] = useState("");
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
              <label htmlFor="phonee">Phone number </label>
              <input
                type="text"
                name="phone"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                className={"left" && isPhoneValid || phonee == "" ? "" : "invalid-field"}
              />
            </div>
            <div className="col-1">
              <p>Total payment amount = {totalPriceWRebate(basket,discountAmount)} DKK</p>

              <div>
                Optional order comment:
                <input type="text" />
                <button
                    type="submit"
                    onClick={() =>
                      props.navigate("confirmation")
                    }
                >
                  Submit{" "}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
