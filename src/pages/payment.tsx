import React, {useContext, useState} from "react";
import "../styles/shop.css";
import "../styles/payment.css";
import {BasketContext, PriceContext, PersDataContext} from "../App";


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
      <div className="layoutMaster container row container">

        <div style={{ alignItems: "center" }} className="paymentStyle">
          <div className="row">
            <div className="form">
              <h1 className="left payment">Payment:</h1>

              <div className="col left">
              <h3> Chose a payment method below</h3>
              <div className="inputbox">
                <span className="row">Cards accepted :</span>
                <img className="creditCard" src="../../public/creditcard.jpg"/>
              </div>
              <div className="inputbox">
                <span className="left">Name on card :</span>
                <input type="text" placeholder="mr. frank borck"/>
              </div>
              <div className="inputbox">
                <span className="left">Credit card number :</span>
                <input type="number" placeholder="1111-2222-3333-4444"/>
              </div>
              <div className="flex">
                <div className="inputbox">
                  <span className="left">Exp date :</span>
                  <input type="month" placeholder="january"/>
                </div>
              </div>
              <div className="inputbox">
                <span className="left">CVV :</span>
                <input type="number" placeholder="1234"/>
              </div>


            </div>
          </div>
            <div className="form col-3">
              <h3 className="">Total payment amount = {totalPriceWRebate(basket,discountAmount)} DKK</h3>

              <div className="left">
                Optional order comment:
                <textarea placeholder="type your message" maxLength="180" cols="25" rows="6" wrap="hard">
                </textarea>
              </div>

              <button
                  type="submit"
                  onClick={() =>{
                    pushData()
                  }}
              >
                Place Order{" "}
              </button>
            </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
