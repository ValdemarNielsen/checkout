//Description: This is the checkout page, where the user corrects/verifies chosen items and proceeds to checkout.
import React, { useState } from "react";
import "../styles/shop.css";

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
  const [isValidVatNumber, setIsValidVatNumber] = useState(false);
  const [isPhoneValid, setIsPhoneValid] = useState(false);

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
          setCity("");
          setIsValidZip(false);
        });
    } else {
      setCity("");
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

    if (country === "Denmark" && /^\d{8}$/.test(newVatNumber)) {
      setIsValidVatNumber(true);
    } else {
      setIsValidVatNumber(false);
    }
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Submitted - console.log");
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      className="shopstyle"
    >
      <h1>Checkout page</h1>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <h2>Shipping details</h2>

        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {country !== "Denmark" && <p>Phone number is optional</p>}
        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className={isValidEmail || email == "" ? "" : "invalid-field"}
        />

        <label htmlFor="phone">Phone number</label>
        <input
          type="text"
          name="phone"
          id="phone"
          value={phone}
          onChange={handlePhoneChange}
          className={isPhoneValid || phone == "" ? "" : "invalid-field"}
        />

        <label htmlFor="companyName">Company name</label>
        <input
          type="text"
          name="companyName"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <label htmlFor="vatNumber">VAT number</label>
        <input
          type="text"
          name="vatNumber"
          id="vatNumber"
          value={vatNumber}
          onChange={handleVatNumberChange}
        />
        {country === "Denmark" && !isValidVatNumber && (
          <p>Please enter a valid Danish VAT number with 8 digits</p>
        )}
        {country !== "Denmark" && <p>VAT number is optional</p>}
        <label htmlFor="country">Country</label>
        <select
          name="country"
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="Denmark">Denmark</option>
          {/* 
          <option value="Russia">Sweden</option>
          <option value="Ukraine">Norway</option>
          <option value="Poladn">Finland</option> 
          */}
        </select>
        <label htmlFor="zip">Zip code</label>
        <input
          type="text"
          name="zip"
          id="zip"
          value={zip}
          onChange={handleZipChange}
        />
        {country === "Denmark" && !isValidZip && <p>Husk at angive zip-code</p>}
        {country !== "Denmark" && <p>Zip code is optional</p>}
        <label htmlFor="city">City</label>
        <input
          type="text"
          name="city"
          id="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <label htmlFor="address1">Address 1</label>
        <input
          type="text"
          name="address1"
          id="address1"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
        />
        <label htmlFor="address2">Address 2</label>
        <input
          type="text"
          name="address2"
          id="address2"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
        />

        {/* If there are any errors/isValid fields that are not true, prompt it to the user */}
        {isValidEmail && isPhoneValid && isValidVatNumber && isValidZip ? (
          <button type="submit">Submit</button>
        ) : (
          <p>Please fill out all fields</p>
        )}
      </form>
    </div>
  );
}
