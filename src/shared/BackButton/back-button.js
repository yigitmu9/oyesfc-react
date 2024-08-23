import React from 'react';
import classes from './back-button.module.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Box from "@mui/material/Box";

const BackButton = ({title, handleBackButton}) => {

    const handleBack = () => {
        handleBackButton(true)
    }

    return (
        <Box sx={{
            position: 'fixed', left: 0, top: -1, width: '100%', display: {xs: 'flex', md: 'none'},
            zIndex: 100
        }}>
            <div className={classes.divStyle} onClick={handleBack}>
                <ArrowBackIosNewIcon sx={{color: '#007AFF'}}>
                </ArrowBackIosNewIcon>
                <span className={classes.spanStyle}>{title ? title : 'Back'}</span>
            </div>
        </Box>
    );
};

export default BackButton;
