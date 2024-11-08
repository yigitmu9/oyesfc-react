import React from 'react';
import classes from './back-button.module.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Box from "@mui/material/Box";

const BackButton = ({generalTitle, handleBackButton, backButtonTitle}) => {

    const handleBack = () => {
        handleBackButton(true)
    }

    return (
        <>
            <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                <Box sx={{
                    position: 'fixed', left: 0, top: -1, width: '100%', display: {xs: 'flex', md: 'none'},
                    zIndex: 100, bgcolor: 'black', paddingBottom: '10px'}}>
                    <div className={classes.mobileStyle}>
                        <div className={classes.divStyle} onClick={handleBack}>
                            <ArrowBackIosNewIcon sx={{color: '#007AFF'}}>
                            </ArrowBackIosNewIcon>
                            <span className={classes.spanStyle}>{backButtonTitle ? backButtonTitle : 'Back'}</span>
                        </div>
                        <div  className={classes.divStyle}>
                            <span className={classes.desktopSpanStyle}>{generalTitle ? generalTitle : 'Back'}</span>
                        </div>
                        <div className={classes.divStyle} onClick={handleBack}>
                            <ArrowBackIosNewIcon sx={{color: 'black'}}>
                            </ArrowBackIosNewIcon>
                            <span className={classes.spanStyle} style={{color: 'black'}}>{backButtonTitle ? backButtonTitle : 'Back'}</span>
                        </div>
                    </div>


                </Box>
            </Box>
            <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                <div className={classes.morePageBox}>
                    <div className={classes.desktopStyle}>
                        <ArrowBackIosNewIcon sx={{color: 'lightgrey', height: '30px', width: '30px', cursor: 'pointer'}}
                                             onClick={handleBack}>
                        </ArrowBackIosNewIcon>
                        <span className={classes.desktopSpanStyle}>{generalTitle ? generalTitle : 'Back'}</span>
                        <ArrowBackIosNewIcon sx={{color: '#1C1C1E', height: '30px', width: '30px'}}>
                        </ArrowBackIosNewIcon>
                    </div>
                </div>
            </Box>
        </>
    );
};

export default BackButton;
