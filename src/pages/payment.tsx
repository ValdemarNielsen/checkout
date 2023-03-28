import StepProgress from "../Progressbar/progressbar";
import React, { useEffect } from "react";
import products, { BasketItems, itemDict } from "../assets/products";
import { useState } from "react";
import "../styles/shop.css";
import { Link, Navigate, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProgressBarOnly from "../Progressbar/progressbaronly";
import StepButtons from "../Progressbar/progressbutton";
import {
  BackButton,
  NextButton,
  SubmitButton,
  ConfirmButton,
} from "../assets/buttons/custombutton";
import DeleteButton from "../assets/buttons/DeleteButton";
import Shop from "../pages/shop";

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
    <div style={{ alignItems: "center" }} className="shopstyle">
      <h1 className="title">Payment</h1>
      <StepProgress />
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
  );
}
