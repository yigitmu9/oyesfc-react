import classes from "./scoreboards-grid.module.css";
import Scoreboard from "../Scoreboard/scoreboard";
import React, {useState} from "react";
import {MatchDetails} from "../MatchDetails/match-details";
import MainTitle from "../../shared/MainTitle/main-title";
import {useSelector} from "react-redux";
import {sortData} from "../../utils/utils";

const ScoreboardsGrid = ({playerDetails, filteredWithPlayerData}) => {

    const { filteredData } = useSelector((state) => state.databaseData);
    const sortedFilteredData = sortData(playerDetails ? filteredWithPlayerData : filteredData);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [matchDate, setMatchDate] = useState(null);
    const windowHeight = window.innerWidth > 768 ? (window.innerHeight - 200) + 'px' : (window.innerHeight - 230) + 'px';

    const openPopup = (matchDay) => {
        if (!playerDetails) {
            setPopupOpen(true);
            setMatchDate(matchDay?.day);
        }
    };

    return (
        <>
            { !playerDetails && <MainTitle title={'Matches'}/>}
            {Object.values(filteredData)?.length > 0 ?
                <div style={{minHeight: windowHeight}}>
                    <div className={classes.grid}>
                        {sortedFilteredData?.map((x, y) => (
                            <Scoreboard
                                key={y}
                                value={x}
                                openPopup={() => openPopup(x)}
                                playerDetails={playerDetails}/>))}
                    </div>
                    {isPopupOpen &&
                        <MatchDetails matchDate={matchDate}
                                      onClose={() => setPopupOpen(false)}/>}
                </div>
                :
                <div style={{minHeight: windowHeight}} className={classes.titleDiv}>
                    <h1 className={classes.title}>No Match found</h1>
                </div>
            }
        </>
    );
};

export default ScoreboardsGrid;
