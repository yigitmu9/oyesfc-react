import classes from "./scoreboards-grid.module.css";
import Scoreboard from "../Scoreboard/scoreboard";
import React from "react";
import MainTitle from "../../shared/MainTitle/main-title";
import {useSelector} from "react-redux";
import {sortData} from "../../utils/utils";
import {useNavigate} from "react-router-dom";

const ScoreboardsGrid = ({playerDetails, filteredWithPlayerData}) => {

    const { filteredData } = useSelector((state) => state.databaseData);
    const sortedFilteredData = sortData(playerDetails ? filteredWithPlayerData : filteredData);
    const navigate = useNavigate()
    const windowHeight = window.innerWidth > 768 ? (window.innerHeight - 200) + 'px' : (window.innerHeight - 230) + 'px';

    const openMatchDetails = (matchDay) => {
        if (!playerDetails) {
            navigate('/oyesfc-react/match-details', {state: {day: matchDay?.day, cameFrom: 'matches'}})
        }
    };

    return (
        <>
            { !playerDetails && <MainTitle title={'Matches'}/>}
            {Object.values(filteredData)?.length > 0 ?
                <div style={{minHeight: playerDetails ? '' : windowHeight}}>
                    <div className={classes.grid}>
                        {sortedFilteredData?.map((x, y) => (
                            <Scoreboard
                                key={y}
                                value={x}
                                openPopup={() => openMatchDetails(x)}
                                playerDetails={playerDetails}/>))}
                    </div>
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
