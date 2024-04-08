import React, {useEffect, useRef, useState} from 'react';
import classes from "./select-edit-match-modal.module.css";
import ScoreboardsGrid from "../ScoreboardsGrid/scoreboards-grid";
import signInClasses from "../SignIn/sign-in.module.css"
import AddMatchComponent from "../AddMatch/add-match";
import Message from "../Message/message";

const SelectEditMatchModal = ({onClose, databaseData}) => {

    const popupRef = useRef(null);
    const [messageData2, setMessageData] = useState(null);
    const [isMessagePopupOpen, setMessagePopupOpen] = useState(false);
    const [isAddMatchPopupOpen, setAddMatchPopupOpen] = useState(false);
    const [matchDetailsData, setMatchDetailsData] = useState(false);

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            document.body.style.overflow = 'visible';
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    });

    const handleClose = () => {
        document.body.style.overflow = 'visible';
        onClose();
    }

    const handleMessageClick = (messageData) => {
        setMessageData(messageData);
    };

    const handleData = (data) => {
        console.log(data)
        setMatchDetailsData(data)
        setAddMatchPopupOpen(true)
    }

    return (
        <div className={classes.overlay}>
            {!isAddMatchPopupOpen && !isMessagePopupOpen && <div className={classes.generalStyle} ref={popupRef}>
                <ScoreboardsGrid databaseData={databaseData} isEdit={true} sendMatchDetailsData={handleData}/>
                <div className={classes.buttonDivStyle}>
                    <button className={signInClasses.buttonStyle} onClick={handleClose}>Close</button>
                </div>
            </div>}
            {isAddMatchPopupOpen && <AddMatchComponent openMessage={() => setMessagePopupOpen(true)}
                                                       onClose={() => setAddMatchPopupOpen(false)}
                                                       messageData={(messageData) => handleMessageClick(messageData)}
                                                       databaseData={databaseData} selectedMatchData={matchDetailsData}/>}
            {isMessagePopupOpen && <Message messageData={messageData2} onClose={() => setMessagePopupOpen(false)}/>}
        </div>
    );
};

export default SelectEditMatchModal;
