import React, {useEffect, useRef} from 'react';
import classes from "./add-to-calendar-modal.module.css";
import {AddToCalendarButton} from "add-to-calendar-button-react";
import signInClasses from "../SignIn/sign-in.module.css";

const AddToCalendarModal = ({onClose, matchDetailsData}) => {

    const popupRef = useRef(null);

    const handleOutsideClicked = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            document.body.style.overflow = 'visible';
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClicked);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClicked);
        };
    });

    const handleClose = () => {
        document.body.style.overflow = 'visible';
        onClose();
    }

    function formatDate(dateString) {
        const [day, month, year] = dateString.split('-');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    function getStartTime(timeString) {
        return timeString.split('-')[0];
    }

    function getEndTime(timeString) {
        return timeString.split('-')[1];
    }

    const formattedDate = formatDate(matchDetailsData.day);
    const rival = 'Rakip: ' + matchDetailsData.rival.name;
    const startTime = getStartTime(matchDetailsData.time);
    const endTime = getEndTime(matchDetailsData.time) === '00:00' ? '23:59' : getEndTime(matchDetailsData.time);

    return (
        <div className={classes.overlay}>
            <div className={classes.generalStyle} ref={popupRef}>
                <h2 className={classes.title}>Add Match to Calendar</h2>
                <AddToCalendarButton
                    name="Halısaha"
                    description={rival}
                    startDate={formattedDate}
                    startTime={startTime}
                    endTime={endTime}
                    timeZone="Europe/Istanbul"
                    location={matchDetailsData.place}
                    options="'Apple','Google','Outlook.com','Yahoo','Microsoft365','MicrosoftTeams','iCal'"
                    listStyle="overlay"
                    availability="busy"
                    buttonStyle="round"
                    trigger="click"
                    hideIconButton
                    buttonsList
                    hideBackground
                    hideCheckmark
                    size="4"
                    lightMode="dark"
                ></AddToCalendarButton>
                <div className={classes.buttonDivStyle}>
                    <button className={signInClasses.buttonStyle} onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default AddToCalendarModal;
