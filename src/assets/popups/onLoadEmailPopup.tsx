import React, {useState, useEffect} from 'react';
import {Modal, Box} from "@mui/material";
import "../../Styles/shop.css";

const LoadingPopup = () => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
    const data = window.localStorage.getItem("My_APP_STAGE");
    if (data !== null) setLoading(JSON.parse(data));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('MY_APP_STATE', JSON.stringify(loading));
    }, [loading]);


  //  useEffect(() => {
  //      setTimeout(() => {
   //         setLoading(false);
   //     }, 3000); // simulate a 3 second loading time
 //   }, []);


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
                        <h2>Loading...</h2>
                        <button className="incrementButton" onClick={() => setLoading(false)}>
                            Hide
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoadingPopup;