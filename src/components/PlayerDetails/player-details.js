import React, {useEffect, useRef} from 'react';
import matchDetailsClasses from "../MatchDetails/match-details.module.css";
import PlayerCards from "../PlayerCards/player-cards";

const PlayerDetails = ({data, onClose, player, credentials, allData, reloadData}) => {

    const popupRef = useRef(null);
    document.body.style.overflow = 'hidden';

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
        onClose()
    };

    const handleReload = (data) => {
        reloadData(data)
    }

    return (
        <div className={matchDetailsClasses.overlay}>
            <div className={matchDetailsClasses.popupContainer} ref={popupRef}>
                <PlayerCards
                    playerName={player}
                    data={data} close={handleClose}
                    credentials={credentials} allData={allData} reloadData={handleReload}/>
            </div>
        </div>
    );
};

export default PlayerDetails;