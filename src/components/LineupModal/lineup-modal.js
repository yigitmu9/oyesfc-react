import React, {useEffect, useRef} from 'react';
import classes from "./lineup-modal.module.css";
import SoccerLineUp from 'react-soccer-lineup'
import signInClasses from "../SignIn/sign-in.module.css";
import {Jerseys} from "../../constants/constants";
import calendarClasses from "../AddToCalendarModal/add-to-calendar-modal.module.css";

const LineupModal = ({onClose, oyesfc}) => {

    const popupRef = useRef(null);

    const handleOutsideClicked = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            document.body.style.overflow = 'visible';
            onClose();
        }
    };

    let playerColor;
    let playerNumberColor;
    let gkColor;
    let gkNumberColor;

    if (oyesfc?.jersey === Jerseys[4]) {
        playerColor = 'dodgerblue';
        playerNumberColor = 'white';
        gkColor = 'royalblue';
        gkNumberColor = 'black';
    } else if (oyesfc?.jersey === Jerseys[3]) {
        playerColor = 'black';
        playerNumberColor = 'dodgerblue';
        gkColor = 'yellow';
        gkNumberColor = 'black';
    } else if (oyesfc?.jersey === Jerseys[2]) {
        playerColor = 'darkslateblue';
        playerNumberColor = 'white';
        gkColor = 'yellow';
        gkNumberColor = 'black';
    } else if (oyesfc?.jersey === Jerseys[1]) {
        playerColor = 'red';
        playerNumberColor = 'white';
        gkColor = 'dodgerblue';
        gkNumberColor = 'white';
    } else {
        playerColor = 'black';
        playerNumberColor = 'gold';
        gkColor = 'red';
        gkNumberColor = 'black';
    }

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

    const oyesfcSquad = {
        squad: {
            gk: {
                name: 'Can',
                number: 1,
                color: 'royalblue',
                numberColor: 'black'
            },
            df: [
                {
                    name: 'Atakan',
                    number: 2,
                },
                {
                    name: 'Berk',
                    number: 5,
                },
                {
                    name: 'Oğulcan',
                    number: 10,
                },
            ],
            fw: [
                {
                    name: 'Mert',
                    number: 16,
                },
                {
                    name: 'Yiğit',
                    number: 7,
                },
                {
                    name: 'Berent',
                    number: 99,
                },
            ],
        },
        style: {
            color: playerColor,
            numberColor: playerNumberColor,
            nameColor: 'black',
        }
    }

    return (
        <div className={calendarClasses.overlay}>
            <div className={classes.generalStyle} ref={popupRef}>
                <div className={classes.pitchStyle}>
                    <SoccerLineUp
                        size={"responsive"}
                        homeTeam={oyesfcSquad}
                    />
                </div>
                <div className={classes.buttonDivStyle}>
                    <button className={signInClasses.buttonStyle} onClick={handleClose}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default LineupModal;
