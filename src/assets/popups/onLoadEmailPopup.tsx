import React, {useState, useEffect} from 'react';
import {Modal, Box} from "@mui/material";
import "../../Styles/shop.css";

const LoadingPopup = () => {

    const [email, setEmail] = useState("");
    const [isValidEmail, setIsValidEmail] = useState(false);
    const handleEmailChange = (e: { target: { value: any } }) => {
        const newEmail = e.target.value;
        setEmail(newEmail);

        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
        }
    };
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const data = window.localStorage.getItem("My_APP_STAGE");
        if (data !== null) setLoading(JSON.parse(data));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('MY_APP_STATE', JSON.stringify(loading));
    }, [loading]);

    return (
        <>
            {loading && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 9999
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '10px'
                    }}>

                        <h2>Sign up for our newsletter to recieve a 5% rebate code! </h2>
                        <input type="text" placeholder="Enter email here"
                               name="email"
                               id="email"
                               value={email}
                               onChange={handleEmailChange}
                               className={isValidEmail || email == "" ? "" : "invalid-field"}
                        />
                        <button className="incrementButton" onClick={() => setLoading(false)}>
                            Submit
                        </button>
                        <p></p>
                        <button className="incrementButton" onClick={() => setLoading(false)}>
                            No thanks
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoadingPopup;