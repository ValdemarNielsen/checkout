//Description: This is the checkout page, where the user corrects/verifies chosen items and proceeds to checkout.
import React, {useContext, useState} from "react";
import "../styles/shop.css";
import "../styles/checkout.css";
import OrderSummary from "../assets/components/OrderSummary.tsx/orderSummary";
import {a} from "vitest/dist/types-fafda418";



type CheckoutProps = {
  navigate: (newPage: string) => void;
};

function Checkout(props: CheckoutProps) {
  const [country, setCountry] = useState("Denmark");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [vatNumber, setVatNumber] = useState("");
  const [isValidZip, setIsValidZip] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isCompany, setIsCompany] = useState(false);
  const [isValidVatNumber, setIsValidVatNumber] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [billingaddress, setBillingAddress] = useState("");
  const [terms, setTerms] = useState(false);




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
      vatNumber
    ];

    const data: RequestInit = {
      method: "POST",
      headers,
      mode: "cors",
      body: JSON.stringify(persData),
    };
    fetch("https://eowi4vrof5hf7m0.m.pipedream.net", data);
  };

  const validSubmit = () => {
    if (
      isValidZip &&
      isValidEmail &&
      (companyName.length == 0 || isValidVatNumber) &&
      firstName.length != 0 &&
      lastName.length != 0 &&
      isPhoneValid &&
      terms
    ) {
      pushData();
      return true;
    } else {
      return false;
    }
  };

  const handleZipChange = (e: { target: { value: any } }) => {
    const newZip = e.target.value;
    setZip(newZip);

    if (country === "Denmark" && newZip.length === 4) {
      fetch(`https://api.dataforsyningen.dk/postnumre/${newZip}`)
        .then((response) => response.json())
        .then((data) => {
          setCity(data.navn);
          setIsValidZip(true);
        })
        .catch((error) => {
          //   setCity("");
          setIsValidZip(false);
        });
    } else {
      //   setCity("");
      setIsValidZip(false);
    }
  };

  const handleEmailChange = (e: { target: { value: any } }) => {
    const newEmail = e.target.value;
    setEmail(newEmail);

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      setIsValidEmail(true);
    } else {
      setIsValidEmail(false);
    }
  };

  const handlePhoneChange = (e: { target: { value: any } }) => {
    const newPhone = e.target.value;
    setPhone(newPhone);

    if (/^\d{8}$/.test(newPhone)) {
      setIsPhoneValid(true);
    } else {
      setIsPhoneValid(false);
    }
  };

  const handleVatNumberChange = (e: { target: { value: any } }) => {
    const newVatNumber = e.target.value;
    setVatNumber(newVatNumber);
    if (
      (country == "Denmark" && newVatNumber.length == 8) ||
      companyName.length == 0
    ) {
      setIsValidVatNumber(true);
    }
  };

  const handleTerms = () => {
    const checkbox = document.getElementById(
      "terms"
    ) as HTMLInputElement | null;

    if (checkbox?.checked) {
      setTerms(true);
    } else {
      setTerms(false);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Submitted - console.log");
  };

  return (
    <>
      <div className="layoutMaster">
        <div className="container">
          <div className="row">
            <div className="columnleft">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <form
                  onSubmit={handleSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "350px",
                  }}
                >
                  <h2>Contact information</h2>
                  <label htmlFor="email"></label>
                  <input
                    type="text"
                    name="email"
                    placeholder="Email *"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={`shippingDetails ${
                      isValidEmail || email == "" ? "" : "invalid-field"
                    }`}
                  />
                  <label htmlFor="phone"></label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number *"
                    id="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                    className={`shippingDetails ${
                      isPhoneValid || phone == "" ? "" : "invalid-field"
                    }`}
                  />
                  <div className="tacbox">
                    <input
                      className="tacinput"
                      id="notification"
                      type="checkbox"
                    />
                    <label htmlFor="checkbox" className="tacboxtext">
                      {" "}
                      Keep me up to date on news and exclusive offers
                    </label>
                  </div>
                  <div></div>
                  <h2>Shipping details</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name"></label>
                      <input
                        type="text"
                        name="firstName"
                        id="name"
                        placeholder="First Name *"
                        value={firstName}
                        className="shippingDetails"
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name"></label>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name *"
                        id="name"
                        value={lastName}
                        className="shippingDetails"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>

                  {country !== "Denmark" && <p>Phone number is optional</p>}
                  <label htmlFor="companyName"></label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    placeholder="Company Name"
                    value={companyName}
                    className="shippingDetails"
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                  <label htmlFor="vatNumber"></label>
                  <input
                    type="text"
                    name="vatNumber"
                    id="vatNumber"
                    placeholder="VAT Number"
                    value={vatNumber}
                    onChange={handleVatNumberChange}
                    className={`shippingDetails ${
                      isValidVatNumber || companyName.length == 0
                        ? ""
                        : "invalid-field"
                    }`}
                  />
                  {country !== "Denmark" && <p>VAT number is optional</p>}
                  <label htmlFor="country"></label>
                  <select
                    name="country"
                    id="country"
                    placeholder="Country"
                    value={country}
                    className="shippingDetails"
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option value="Denmark">Denmark</option>
                    {/*
    <option value="Russia">Sweden</option>
    <option value="Ukraine">Norway</option>
    <option value="Poladn">Finland</option>
    */}
                  </select>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="zip"></label>
                      <input
                        type="text"
                        name="zip"
                        placeholder="Zip Code *"
                        id="zip"
                        value={zip}
                        onChange={handleZipChange}
                        className={`shippingDetails ${
                          isValidZip || zip == "" ? "" : "invalid-field"
                        }`}
                      />
                    </div>
                    {country !== "Denmark" && <p>Zip code is optional</p>}
                    <div className="form-group">
                      <label htmlFor="city"></label>
                      <input
                        type="text"
                        name="city"
                        id="city"
                        placeholder="City *"
                        value={city}
                        className="shippingDetails"
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>
                  <label htmlFor="address1"></label>
                  <input
                    type="text"
                    name="address1"
                    id="address1"
                    placeholder="Address 1 *"
                    value={address1}
                    className="shippingDetails"
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                  <label htmlFor="address2"></label>
                  <input
                    type="text"
                    name="address2"
                    id="address2"
                    placeholder="Address 2"
                    value={address2}
                    className="shippingDetails"
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                  <label htmlFor="billingAddress"></label>
                  <input
                    type="text"
                    name="billingAddress"
                    id="billingAddress"
                    placeholder="Billing Address"
                    value={billingaddress}
                    className="shippingDetails"
                    onChange={(e) => setBillingAddress(e.target.value)}
                  />
                  <div className="tacbox">
                    <input
                      className="tacinput"
                      id="terms"
                      type="checkbox"
                      onClick={() => handleTerms()}
                    />
                    <label htmlFor="checkbox" className="tacboxtext">
                      {" "}
                      I agree to these <a href="#">Terms and Conditions</a>.
                    </label>
                  </div>

                  {/* If there are any errors/isValid fields that are not true, prompt it to the user */}

                  <button
                    type="submit"
                    onClick={() => {
                      if (!validSubmit()) {
                        var fill = document.getElementById(
                          "fill"
                        ) as HTMLInputElement;
                        fill.innerHTML = "Please fill out all fields ";
                      } else {
                        var fill = document.getElementById(
                          "fill"
                        ) as HTMLInputElement;
                        fill.innerHTML = "";
                        //Insert navigation to next page
                        props.navigate("payment");
                      }
                    }}
                    className="buttoncontinue"
                  >
                    Go to payment
                  </button>
                  <p id="fill"></p>
                </form>
              </div>
              <button
                className="buttoncontinue"
                onClick={() => props.navigate("shop")}
              >
                Go back
              </button>
            </div>

            <div className="columnright">
              {/* Display the basket items */}
              <div>
                <OrderSummary />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Checkout;
