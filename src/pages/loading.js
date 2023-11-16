import React from 'react';

const Loading = () => {
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
            <img style={{ width: "200px", height: "200px", background: "#121212", marginBottom: "20px"}} src={require('../images/oyesfc.PNG')}/>
            <h1>Loading...</h1>
        </div>
    );
};

export default Loading;