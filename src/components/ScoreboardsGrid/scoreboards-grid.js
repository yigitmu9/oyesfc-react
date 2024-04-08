import classes from "./scoreboards-grid.module.css";
import Scoreboard from "../Scoreboard/scoreboard";
import React, {useState} from "react";
import {MatchDetails} from "../MatchDetails/match-details";
import FilterButtons from "../FilterButtons/filter-buttons";

const ScoreboardsGrid = ({databaseData, isEdit, sendMatchDetailsData}) => {

    const today = new Date();
    const [matchDetailsFilteredData, setMatchDetailsFilteredData] = useState(Object.values(databaseData));
    const [fixtureType, setFixtureType] = useState(null);
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
    const previousMatchesData = sortedData.filter(item => {
        const [day, month, year] = item.day.split('-').map(Number);
        const endTime = item.time.split('-')[1];
        const [hour, minute] = endTime.split(':').map(Number);

        const eventDateTime = new Date(year, month - 1, day, hour, minute);

        return eventDateTime <= today;
    });
    const upcomingMatchesData = sortedData.filter(item => {
        const [day, month, year] = item.day.split('-').map(Number);
        const [startTime] = item.time.split('-');
        const [hour, minute] = startTime.split(':').map(Number);

        const eventDateTime = new Date(year, month - 1, day, hour, minute);

        return eventDateTime > today;
    });
    const liveMatchData = sortedData.filter(item => {
        const [day, month, year] = item.day.split('-').map(Number);
        const [startTime, endTime] = item.time.split('-');
        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);

        const startDateTime = new Date(year, month - 1, day, startHour, startMinute);
        const endDateTime = new Date(year, month - 1, day, endHour, endMinute);

        return endDateTime > today && today >= startDateTime;
    });
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [matchDetailsData, setMatchDetailsData] = useState(null);
    const windowHeight = window.innerWidth > 768 ? (window.innerHeight - 320) + 'px' : (window.innerHeight - 350) + 'px';

    const openPopup = (x, fixture) => {
        document.body.style.overflow = 'hidden';
        isEdit ? sendMatchDetailsData(x) : setPopupOpen(true);
        setMatchDetailsData(x);
        setFixtureType(fixture)
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
            {matchDetailsFilteredData.length > 0 ?
                <div style={{minHeight: windowHeight}}>
                    {liveMatchData.length > 0 ?
                        <>
                            <h1 className={classes.matchTitle}>Live Match</h1>
                            <div className={classes.grid}>
                                {liveMatchData?.map((x, y) => (
                                    <Scoreboard
                                        key={y}
                                        value={x}
                                        openPopup={() => openPopup(x, 'live')}
                                        matchDetailsData={(matchDetailsData) => handleXClick(matchDetailsData)}
                                        fixture={'live'}/>))}
                            </div>
                        </>
                        :
                        null}
                    {upcomingMatchesData.length > 0 ?
                        <>
                            <h1 className={classes.matchTitle}>Upcoming Matches</h1>
                            <div className={classes.grid}>
                                {upcomingMatchesData?.map((x, y) => (
                                    <Scoreboard
                                        key={y}
                                        value={x}
                                        openPopup={() => openPopup(x, 'upcoming')}
                                        matchDetailsData={(matchDetailsData) => handleXClick(matchDetailsData)}
                                        fixture={'upcoming'}/>))}
                            </div>
                        </>
                        :
                        null}
                    {previousMatchesData.length > 0 ?
                        <>
                            <h1 className={classes.matchTitle}>Previous Matches</h1>
                            <div className={classes.grid}>
                                {previousMatchesData?.map((x, y) => (
                                    <Scoreboard
                                        key={y}
                                        value={x}
                                        openPopup={() => openPopup(x, 'previous')}
                                        matchDetailsData={(matchDetailsData) => handleXClick(matchDetailsData)}
                                        fixture={'previous'}/>))}
                            </div>
                        </>
                        :
                        null}
                    {isPopupOpen &&
                        <MatchDetails matchDetailsData={matchDetailsData}
                                      onClose={() => setPopupOpen(false)}
                                      fixture={fixtureType}
                        />}
                </div>

                :
                <h1 className={classes.title}>No Match found</h1>
            }
        </>
    );
};

export default ScoreboardsGrid;