import classes from "./scoreboards-grid.module.css";
import Scoreboard from "../Scoreboard/scoreboard";
import React, {useState} from "react";
import {MatchDetails} from "../MatchDetails/match-details";

const ScoreboardsGrid = ({databaseData, isEdit, sendMatchDetailsData, reloadData, credentials, allData, playerDetails}) => {

    const today = new Date();
    const matchDetailsFilteredData = Object.values(databaseData);
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
    const sortedAllData = Object.values(allData)?.slice().sort((x, y) => {
        if (x.day && y.day) {
            const [dayA, monthA, yearA] = x.day.split('-').map(Number);
            const [dayB, monthB, yearB] = y.day.split('-').map(Number);
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
        const [hour, minute] = endTime === '00:00' ? [23, 59] : endTime.split(':').map(Number);

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
    const windowHeight = window.innerWidth > 768 ? (window.innerHeight - 200) + 'px' : (window.innerHeight - 230) + 'px';

    const openPopup = (x, fixture) => {
        document.body.style.overflow = 'hidden';
        isEdit ? sendMatchDetailsData(x) : setPopupOpen(true);
        setMatchDetailsData(x);
        setFixtureType(fixture)
    };

    const handleXClick = (matchDetailsData) => {
        setMatchDetailsData(matchDetailsData);
    };

    const handleReload = (data) => {
        reloadData(data)
    }

    return (
        <>
            {matchDetailsFilteredData.length > 0 ?
                <div style={{minHeight: windowHeight}}>
                    {liveMatchData.length > 0 ?
                        <>
                        {!playerDetails && <h1 className={classes.matchTitle}>Live Match</h1>}
                            <div className={classes.grid}>
                                {liveMatchData?.map((x, y) => (
                                    <Scoreboard
                                        key={y}
                                        value={x}
                                        openPopup={() => openPopup(x, 'live')}
                                        matchDetailsData={(matchDetailsData) => handleXClick(matchDetailsData)}
                                        fixture={'live'} playerDetails={playerDetails}/>))}
                            </div>
                        </>
                        :
                        null}
                    {upcomingMatchesData.length > 0 ?
                        <>
                        {!playerDetails && <h1 className={classes.matchTitle}>Upcoming Matches</h1>}
                            <div className={classes.grid}>
                                {upcomingMatchesData?.map((x, y) => (
                                    <Scoreboard
                                        key={y}
                                        value={x}
                                        openPopup={() => openPopup(x, 'upcoming')}
                                        matchDetailsData={(matchDetailsData) => handleXClick(matchDetailsData)}
                                        fixture={'upcoming'} playerDetails={playerDetails}/>))}
                            </div>
                        </>
                        :
                        null}
                    {previousMatchesData.length > 0 ?
                        <>
                        {!playerDetails && <h1 className={classes.matchTitle}>Previous Matches</h1>}
                            <div className={classes.grid}>
                                {previousMatchesData?.map((x, y) => (
                                    <Scoreboard
                                        key={y}
                                        value={x}
                                        openPopup={() => openPopup(x, 'previous')}
                                        matchDetailsData={(matchDetailsData) => handleXClick(matchDetailsData)}
                                        fixture={'previous'} playerDetails={playerDetails}/>))}
                            </div>
                        </>
                        :
                        null}
                    {isPopupOpen &&
                        <MatchDetails matchDetailsData={matchDetailsData}
                                      onClose={() => setPopupOpen(false)}
                                      fixture={fixtureType} data={previousMatchesData} reloadData={handleReload}
                                      credentials={credentials} allData={sortedAllData}/>}
                </div>
                :
                <div style={{minHeight: windowHeight, textAlign: 'center', alignItems: 'center', display: 'flex', justifyContent: 'center'}}>
                    <h1 className={classes.title}>No Match found</h1>
                </div>
            }
        </>
    );
};

export default ScoreboardsGrid;