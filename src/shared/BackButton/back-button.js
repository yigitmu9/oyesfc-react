import React from 'react';
import classes from './back-button.module.css';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {BottomNavigation} from "@mui/material";
import Box from "@mui/material/Box";

const BackButton = ({title, handleBackButton, bgColor}) => {

    return (
        <Box sx={{position: 'fixed', left: 0, top: -1, width: '100%', display: {xs: 'flex', md: 'none'},
            zIndex: 100}}>
            <BottomNavigation
                sx={{width: '100%', paddingBottom: '16px', height: '50px', paddingTop: '16px', bgcolor: 'transparent'}}
                showLabels
            >
                <div className={classes.divStyle} style={{backgroundColor: bgColor ? bgColor : 'black'}} onClick={() => handleBackButton(true)}>
                    <ArrowBackIosNewIcon className={classes.iconStyle} sx={{color: '#007AFF'}}>
                    </ArrowBackIosNewIcon>
                    <span className={classes.spanStyle}>{title ? title : 'Back'}</span>
                </div>
            </BottomNavigation>
        </Box>
    );
};

export default BackButton;
