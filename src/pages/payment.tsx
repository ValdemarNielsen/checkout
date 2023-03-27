import StepProgress from "../Progressbar/progressbar";
import React, {useEffect} from "react";
import products, {BasketItems, itemDict} from "../assets/products";
import {useState} from "react";
import "../styles/shop.css";
import {Link, Navigate, Routes} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import ProgressBarOnly from "../Progressbar/progressbaronly";
import StepButtons from "../Progressbar/progressbutton";
import {BackButton, NextButton} from "../assets/buttons/custombutton";
import DeleteButton from "../assets/buttons/DeleteButton";
import LoadingPopup from "../assets/popups/onLoadEmailPopup";
import Shop from "../pages/shop";


function MobilepayNumber () {

}

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
            <div
                style={{alignItems: "center"}}
                className="shopstyle"
            >
            <h1 className="title" >Payment</h1>
            <StepProgress/>
            <div className="row">
                <div className="col-1">
                    <button>
                        <p> Chose payment method below</p>
                        <label htmlFor="phone">Phone number </label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={phone}
                            onChange={handlePhoneChange}
                            className={isPhoneValid || phone == "" ? "" : "invalid-field"}
                        />
                    </button>

                </div>
                <div className="col-2">
                    <button>
                        <p>You have saved = 0 DKK</p>
                        <p>Total payment amount = 0 DKK</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

