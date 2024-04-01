import React from 'react';
import GhostLogo from '../images/ghost.png'

const ErrorPage = () => {
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
            <img style={{ width: "200px", height: "200px", background: "#121212", marginBottom: "20px"}} src={GhostLogo} alt={'1'}/>
            <span style={{ background: "#121212", fontSize: "20px"}}>Whoops! Something went wrong.</span>
        </div>
    );
};

export default ErrorPage;