//Description: This is the checkout page, where the user corrects/verifies chosen items and proceeds to checkout.
import React, { useState } from "react";
import "../styles/shop.css";
import "../styles/checkout.css";
import StepProgress from "../Progressbar/progressbar";
import { BackButton, NextButton, SubmitButton } from "../assets/buttons/custombutton";

export default function Checkout() {
  const [country, setCountry] = useState("Denmark");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [name, setName] = useState("");
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


  const validSubmit = () => {
    if (
      isValidZip &&
        isValidEmail &&
        isValidVatNumber &&
        name.length != 0 &&
        isPhoneValid &&
        terms
    ) {
      return true;
    }else{
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
    if (companyName.length == 0 || country == "Denmark" && /^\d{8}$/.test(newVatNumber))
    {
      setIsValidVatNumber(true);
    } else {
      setIsValidVatNumber(false);
    }
  };



  const handleTerms = () => {
    const checkbox = document.getElementById(
        "terms",
    ) as HTMLInputElement | null

    if(checkbox?.checked){
      setTerms(true)
    }else {
      setTerms(false)
    }
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Submitted - console.log");
  };

  return (
      <><StepProgress/>
        <div
            style={{display: "flex", flexDirection: "column", alignItems: "center"}}
            className="shopstyle"
        >
          <h1>Checkout page</h1>

          <form
              onSubmit={handleSubmit}
              style={{display: "flex", flexDirection: "column", width: "300px"}}
          >
            <h2>Shipping details</h2>

            <label htmlFor="name">Name    *</label>
            <input
                type="text"
                name="name"
                id="name"
                value={name}
                className="shippingDetails"
                onChange={(e) => setName(e.target.value)}/>

            {country !== "Denmark" && <p>Phone number is optional</p>}
            <label htmlFor="email">Email    *</label>
            <input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
                className={
                  `shippingDetails ${isValidEmail || email == "" ? "" : "invalid-field"}`}
/>

            <label htmlFor="phone">Phone number    *</label>
            <input
                type="text"
                name="phone"
                id="phone"
                value={phone}
                onChange={handlePhoneChange}
                className={
                  `shippingDetails ${isPhoneValid || phone == "" ? "" : "invalid-field"}`}/>

            <label htmlFor="companyName">Company name</label>
            <input
                type="text"
                name="companyName"
                id="companyName"
                value={companyName}
                className="shippingDetails"
                onChange={(e) => setCompanyName(e.target.value)}/>
            <label htmlFor="vatNumber">VAT number</label>
            <input
                type="text"
                name="vatNumber"
                id="vatNumber"
                value={vatNumber}
                onChange={handleVatNumberChange}
                className={
                  `shippingDetails ${isValidVatNumber || companyName.length == 0 ? "" : "invalid-field"}`
                }/>
            {country !== "Denmark" && <p>VAT number is optional</p>}
            <label htmlFor="country">Country    *</label>
            <select
                name="country"
                id="country"
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
            <label htmlFor="zip">Zip code    *</label>
            <input
                type="text"
                name="zip"
                id="zip"
                value={zip}
                onChange={handleZipChange}
                className={`shippingDetails ${isValidZip || zip == "" ? "" : "invalid-field"}`}/>
            {country !== "Denmark" && <p>Zip code is optional</p>}
            <label htmlFor="city">City    *</label>
            <input
                type="text"
                name="city"
                id="city"
                value={city}
                className="shippingDetails"
                onChange={(e) => setCity(e.target.value)}/>
            <label htmlFor="address1">Address 1    *</label>
            <input
                type="text"
                name="address1"
                id="address1"
                value={address1}
                className="shippingDetails"
                onChange={(e) => setAddress1(e.target.value)}/>
            <label htmlFor="address2">Address 2</label>
            <input
                type="text"
                name="address2"
                id="address2"
                value={address2}
                className="shippingDetails"
                onChange={(e) => setAddress2(e.target.value)}/>
            <label htmlFor="billingAddress">Billing address</label>
            <input
                type="text"
                name="billingAddress"
                id="billingAddress"
                value={billingaddress}
                className="shippingDetails"
                onChange={(e) => setBillingAddress(e.target.value)}/>
            <div className="tacbox">
              <input className="tacinput" id="terms" type="checkbox" onClick={() => handleTerms()}/>
              <label htmlFor="checkbox" className="tacboxtext"> I agree to these <a href="#">Terms and
                Conditions</a>.</label>
            </div>
            <div className="tacbox" >
              <input className="tacinput" id="notification" type="checkbox" />
              <label htmlFor="checkbox" className="tacboxtext"> I want to receive Emails about great deals and news
                about House of Protein</label>
            </div>

            {/* If there are any errors/isValid fields that are not true, prompt it to the user */}

            <button type="submit" onClick={() =>{
              if(!validSubmit()){
                var fill = document.getElementById("fill") as HTMLInputElement
                fill.innerHTML = "Please fill out all fields"
              }else{
                var fill = document.getElementById("fill") as HTMLInputElement
                fill.innerHTML = ""
              }

            }}>Submit</button>

            <p id="fill"></p>
          </form>
        </div>
      </>
  );
}
