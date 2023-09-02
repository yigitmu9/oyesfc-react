import classes from "./scoreboards-grid.module.css";
import Scoreboard from "../Scoreboard";
import {databaseData} from "../../firebase";
import React, {useState} from "react";
import {MatchDetails} from "../MatchDetails";
import FilterButtons from "../FilterButtons";

const ScoreboardsGrid = () => {
    const buttons = ['All', 'Rakipbul', 'Normal'];
    const [matchDetailsfilteredData, setMatchDetailsfilteredData] = useState(Object.values(databaseData));

    const applyFilter = (selectedButton) => {
        if (selectedButton === 'All') {
            setMatchDetailsfilteredData(Object.values(databaseData))
        } else if (selectedButton === 'Rakipbul') {
            setMatchDetailsfilteredData(Object.values(databaseData).filter(x => x.rakipbul === true))
        } else if (selectedButton === 'Normal') {
            setMatchDetailsfilteredData(Object.values(databaseData).filter(x => x.rakipbul === false))
        }
    };

    let dataFound = databaseData && Object.values(databaseData || {})?.some(x => x.oyesfc && x.rival)
    const sortedData = matchDetailsfilteredData?.slice().sort((a, b) => {
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

    const openPopup = ({x}) => {
        setPopupOpen(true);
        setMatchDetailsData(x);
    };

    const handleXClick = (matchDetailsData) => {
        setMatchDetailsData(matchDetailsData);
    };

    return (
        <>
            <div className={classes.filterButtons}>
                <FilterButtons data={buttons} applyFilter={applyFilter} />
            </div>
            <>
                {dataFound ?
                    <div className={classes.grid}>
                        {sortedData?.map((x, y) => (
                            <Scoreboard
                                key={y}
                                value={x}
                                openPopup={() => openPopup(x)}
                                matchDetailsData={(matchDetailsData) => handleXClick(matchDetailsData)}/>))}
                        {isPopupOpen && <MatchDetails matchDetailsData={matchDetailsData} onClose={() => setPopupOpen(false)} />}
                    </div>
                    :
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '90vh',
                            color: 'lightgray'
                        }}
                    >
                        <h1>No match found</h1>
                    </div>
                }

            </>
        </>
    );

};

export default ScoreboardsGrid;