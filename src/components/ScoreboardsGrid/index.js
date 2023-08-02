import classes from "./scoreboards-grid.module.css";
import Scoreboard from "../Scoreboard";
import {databaseData} from "../../firebase";
import React, {useState} from "react";
import {MatchDetails} from "../MatchDetails";

const ScoreboardsGrid = () => {
    let dataFound = databaseData && Object.values(databaseData || {})?.some(x => x.oyesfc && x.rival)
    const sortedData = Object.values(databaseData || {})?.slice().sort((a, b) => {
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

    const openPopup = () => {
        setPopupOpen(true);
    };

    return (
        <>
            <>
                {dataFound ?
                    <div className={classes.grid}>
                        {sortedData?.map((x, y) => (
                            <Scoreboard
                                key={y}
                                value={x}
                                openPopup={openPopup} />))}
                        {isPopupOpen && <MatchDetails onClose={() => setPopupOpen(false)} />}
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