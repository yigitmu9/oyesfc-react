import React, {useEffect, useRef} from 'react';
import matchDetailsClasses from "../MatchDetails/match-details.module.css";
import PlayerCards from "../PlayerCards/player-cards";

const PlayerDetails = ({onClose, player}) => {

    const popupRef = useRef(null);

    const handleOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
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
        onClose()
    };

    return (
        <div className={matchDetailsClasses.overlay}>
            <div className={matchDetailsClasses.popupContainer} ref={popupRef}>
                <PlayerCards
                    playerName={player}
                    close={handleClose}/>
            </div>
        </div>
    );
};

export default PlayerDetails;
