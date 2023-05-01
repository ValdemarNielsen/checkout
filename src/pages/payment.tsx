import React, {useContext, useState} from "react";
import "../styles/shop.css";
import "../styles/payment.css";
import {BasketContext, PriceContext, PersDataContext} from "../App";
import {NavigationActions} from "react-navigation";


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
      basket,
      "Potential Comment: "+comment
    ];

    const data: RequestInit = {
      method: "POST",
      headers,
      mode: "cors",
      body: JSON.stringify(persData),
    };
      if(isCreditValid &&
          isCvvValid &&
          isNameValid &&
          isExpDateValid
      ){
        fetch("https://eowi4vrof5hf7m0.m.pipedream.net", data);
        props.navigate("confirmation")
      }
  };

  const [phonee, setPhone] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const { basket, setBasket } = useContext(BasketContext);
  const [isCreditValid, setIsCreditValid] = useState(false)
  const [creditCard, setCreditCard] = useState("")
  const [isNameValid, setIsNameValid] = useState(false)
  const [name, setName] = useState("")
  const [isExpDateValid, setIsExpDateValid] = useState(false)
  const [expDate, setExpDate] = useState()
  const [isCvvValid, setIsCvvValid] = useState(false)
  const [Cvv, setCvv] = useState(0)
  const [comment, setComment] = useState("")


  const handleCreditChange = (e: { target: { value: any } }) => {
    const newCard = e.target.value;
    setCreditCard(newCard);
    if (/^\d{16}$/.test(newCard)) {
      setIsCreditValid(true);
    } else {
      setIsCreditValid(false);
    }
  };

  const handleCVVChange = (e: { target: { value: any } }) => {
    const newCVV = e.target.value;
    setCvv(newCVV);
    if (/^\d{3}$/.test(newCVV)) {
      setIsCvvValid(true);
    } else {
      setIsCvvValid(false);
    }
  };

  const handleNameChange = (e: { target: { value: any } }) => {
    const newName = e.target.value;
    setName(newName);
    if (name.length > 0) {
      setIsNameValid(true);
    } else {
      setIsNameValid(false);
    }
  };

  const handleDateChange = (e: { target: { value: any } }) => {
    const newDate = e.target.value;
    setCvv(newDate);
    if (newDate.toString() != "") {
      setIsExpDateValid(true);
    } else {
      setIsExpDateValid(false);
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
                <input type="text" placeholder="mr. frank borck" onChange={handleNameChange}/>
              </div>
              <div className="inputbox">
                <span className="left">Credit card number :</span>
                <input type="number" placeholder="1111-2222-3333-4444" onChange={handleCreditChange}/>
              </div>
              <div className="flex">
                <div className="inputbox">
                  <span className="left">Exp date :</span>
                  <input type="month" placeholder="january" onChange={handleDateChange}/>
                </div>
              </div>
              <div className="inputbox">
                <span className="left">CVV :</span>
                <input type="number" placeholder="123" onChange={handleCVVChange}/>
              </div>


            </div>
          </div>
            <div className="form col-3">
              <h3 className="">Total payment amount = {totalPriceWRebate(basket,discountAmount)} DKK</h3>

              <div className="left">
                Optional order comment:
                <textarea placeholder="type your message" maxLength={180} cols={25} rows={6} wrap="hard" onChange={(e) => setComment(e.target.value)}>
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
