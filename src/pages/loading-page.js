import React from 'react';
import {ScaleLoader} from "react-spinners";
import OYesFCLogo from '../images/oyesfc.PNG'

const LoadingPage = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '90vh',
                color: 'lightgray'
            }}
        >
            <img style={{ width: "200px", height: "200px", background: "transparent", marginBottom: "20px"}} src={OYesFCLogo} alt={'1'}/>
            <ScaleLoader color="red" speedMultiplier={0.7} />
        </div>
    );
};

export default LoadingPage;