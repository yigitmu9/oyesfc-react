import classes from "./scoreboards-grid.module.css";
import Scoreboard from "../Scoreboard/scoreboard";
import React, {useState} from "react";
import {MatchDetails} from "../MatchDetails/match-details";
import FilterButtons from "../FilterButtons/filter-buttons";

const ScoreboardsGrid = ({databaseData}) => {

    const [matchDetailsFilteredData, setMatchDetailsFilteredData] = useState(Object.values(databaseData));
    const sortedData = matchDetailsFilteredData?.slice().sort((a, b) => {
        if (a.day && b.day) {
            const [dayA, monthA, yearA] = a.day.split('-').map(Number);
            const [dayB, monthB, yearB] = b.day.split('-').map(Number);
            if (yearA !== yearB) {
                return yearB - yearA;
            }
            if (monthA !== monthB) {
                return monthB - monthA;
            }
            return dayB - dayA;
        } else {
            return null
        }
    });
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [matchDetailsData, setMatchDetailsData] = useState(null);
    const windowHeight = window.innerWidth > 768 ? (window.innerHeight - 330) + 'px' : (window.innerHeight - 370) + 'px';

    const openPopup = ({x}) => {
        document.body.style.overflow = 'hidden';
        setPopupOpen(true);
        setMatchDetailsData(x);
    };

    const handleXClick = (matchDetailsData) => {
        setMatchDetailsData(matchDetailsData);
    };

    const setAdvancedFilters = (filteredData) => {
        setMatchDetailsFilteredData(filteredData);
    };

    return (
        <>
            <FilterButtons databaseData={databaseData} setAdvancedFilters={setAdvancedFilters}></FilterButtons>
            <div className={classes.grid} style={{minHeight: windowHeight}}>
                {matchDetailsFilteredData.length > 0 ?
                    sortedData?.map((x, y) => (
                        <Scoreboard
                            key={y}
                            value={x}
                            openPopup={() => openPopup(x)}
                            matchDetailsData={(matchDetailsData) => handleXClick(matchDetailsData)}/>))
                :
                <h1 className={classes.title}>No Match found</h1>}
                {isPopupOpen && <MatchDetails matchDetailsData={matchDetailsData} onClose={() => setPopupOpen(false)} />}
            </div>
        </>
    );

};

export default ScoreboardsGrid;