import React, { useState, useEffect } from 'react';

const LoadingPopup = () => {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000); // simulate a 3 second loading time
    }, []);

    return (
        <>
            {loading && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 9999 }}>
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#fff', padding: '20px', borderRadius: '10px' }}>
                        <h2>Loading...</h2>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoadingPopup;