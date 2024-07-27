import React from 'react';
import {PuffLoader} from "react-spinners";
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
            {Loading()}
        </div>
    );
};

export default LoadingPage;

export function Loading() {
    return (
        <div style={{display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            position: 'relative'}}>
            <img style={{width: "200px", height: "200px", background: "transparent", borderRadius: '50%'}}
                 src={OYesFCLogo}
                 alt={'1'}/>
            <div style={{position: 'absolute'}}>
                <PuffLoader color="red" speedMultiplier={0.7} size={350}/>
            </div>
        </div>
    )
}