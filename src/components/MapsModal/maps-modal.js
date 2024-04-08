import React, {useEffect, useRef} from 'react';
import classes from "./maps-modal.module.css";
import calendarClasses from "../AddToCalendarModal/add-to-calendar-modal.module.css";
import signInClasses from "../SignIn/sign-in.module.css";
import AppleMaps from "../../images/apple-maps-logo.png";
import GoogleMaps from "../../images/google-maps-logo.png";
import {Facilities} from "../../constants/constants";

const MapsModal = ({onClose, place}) => {

    const popupRef = useRef(null);

    const handleOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            document.body.style.overflow = 'visible';
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutside);
        return () => {
            document.removeEventListener('mousedown', handleOutside);
        };
    });

    const handleClose = () => {
        document.body.style.overflow = 'visible';
        onClose();
    }

    const redirectToAppleMaps = () => {
        const url = Facilities.find(x => x?.name === place)?.appleUrl
        if (url) window.open(url, "_blank");
        handleClose()
    };

    const redirectToGoogleMaps = () => {
        const url = Facilities.find(x => x?.name === place)?.googleUrl
        if (url) window.open(url, "_blank");
        handleClose()
    };

    return (
        <div className={calendarClasses.overlay}>
            <div className={calendarClasses.generalStyle} ref={popupRef}>
                <h2 className={classes.title}>Select Maps App</h2>
                <div className={classes.divStyle}>
                    <img className={classes.imgStyle} src={AppleMaps} alt={'1'} onClick={redirectToAppleMaps}/>
                    <img className={classes.imgStyle} src={GoogleMaps} alt={'1'} onClick={redirectToGoogleMaps}/>
                </div>
                <div className={classes.buttonDivStyle}>
                    <button className={signInClasses.buttonStyle} onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default MapsModal;
