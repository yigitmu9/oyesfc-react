import React from 'react';
import classes from "../MatchDetails/match-details.module.css";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {TeamMembers, TeamNames} from "../../constants/constants";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import InfoIcon from "@mui/icons-material/Info";
import {Divider} from "@mui/material";
import LabelIcon from "@mui/icons-material/Label";

const PreviewTab = ({matchDetailsData, allData, matchIndex, bestOfMatch ,redirectToTab, weatherIcons}) => {

    const isMobile = window.innerWidth <= 768;
    const lastFiveGames = Object.values(allData).filter((x, y) => x && (y === matchIndex + 1 || y === matchIndex + 2 || y === matchIndex + 3 || y === matchIndex + 4 || y === matchIndex + 5));
    const matchInformation = createMatchInfos();

    const redirectToUrlTab = () => {
        redirectToTab(4)
    }

    const redirectToKitsTab = () => {
        redirectToTab(2)
    }

    function createMatchInfos() {
        let infosForMatch = [];
        const lastThreeGames = Object.values(allData)?.filter((x, y) => x && (y === matchIndex + 1 || y === matchIndex + 2 || y === matchIndex + 3));
        const lastTwoGamesInFacility = Object.values(allData)?.filter((x, y) => x?.place === matchDetailsData?.place && y > matchIndex)?.filter((a, b) => a && b < 2);
        const lastThreeGamesWithRival = Object.values(allData)?.filter((x, y) => x?.rival?.name === matchDetailsData?.rival?.name && y > matchIndex)?.filter((a, b) => a && b < 3);
        if (lastThreeGames?.length > 2 && lastThreeGames?.every(x => x?.oyesfc?.goal > x?.rival?.goal)) {
            let consecutiveHigherGoals = 0;
            for (let i = matchIndex + 1; i < Object.values(allData)?.length; i++) {
                const match = Object.values(allData)[i];
                const oyesfcGoals = match?.oyesfc?.goal;
                const rivalGoals = match?.rival?.goal;

                if (oyesfcGoals > rivalGoals) {
                    consecutiveHigherGoals++;
                } else {
                    break;
                }
            }
            const no1 = `O Yes FC won in last ${consecutiveHigherGoals} matches.`
            infosForMatch.push(no1)
        }
        if (lastThreeGames?.length > 2 && lastThreeGames?.every(x => x?.oyesfc?.goal <= x?.rival?.goal)) {
            let consecutiveLessGoals = 0;
            for (let i = matchIndex + 1; i < Object.values(allData)?.length; i++) {
                const match = Object.values(allData)[i];
                const oyesfcGoals = match?.oyesfc?.goal;
                const rivalGoals = match?.rival?.goal;

                if (oyesfcGoals <= rivalGoals) {
                    consecutiveLessGoals++;
                } else {
                    break;
                }
            }
            const no1 = `O Yes FC hasn't won in last ${consecutiveLessGoals} matches.`
            infosForMatch.push(no1)
        }
        if (lastThreeGames?.length > 2 && lastThreeGames?.every(x => x?.oyesfc?.goal > 7)) {
            let minScoredGoalVal = 0;
            lastThreeGames.forEach(x => {
                if (!minScoredGoalVal || minScoredGoalVal > x?.oyesfc?.goal) minScoredGoalVal = x?.oyesfc?.goal
            })
            const no2 = `O Yes FC has scored at least ${minScoredGoalVal} goals in each of its last 3 matches.`
            infosForMatch.push(no2)
        }
        if (lastThreeGames?.length > 2 && lastThreeGames?.every(x => x?.rival?.goal > 7)) {
            let minConcededGoalVal = 0;
            lastThreeGames.forEach(x => {
                if (!minConcededGoalVal || minConcededGoalVal > x?.rival?.goal) minConcededGoalVal = x?.rival?.goal
            })
            const no3 = `O Yes FC has conceded at least ${minConcededGoalVal} goals in each of its last 3 matches.`
            infosForMatch.push(no3)
        }
        if (lastTwoGamesInFacility?.length > 1 && lastTwoGamesInFacility?.every(x => x?.oyesfc?.goal >= x?.rival?.goal)) {
            const no4 = `O Yes FC did not lose the last 2 matches played in ${matchDetailsData?.place}.`
            infosForMatch.push(no4)
        }
        if (lastThreeGamesWithRival?.length > 2 && lastThreeGamesWithRival?.every(x => x?.oyesfc?.goal >= x?.rival?.goal)) {
            const no5 = `O yes FC has never lost to the ${matchDetailsData?.rival?.name} in the last 3 matches.`
            infosForMatch.push(no5)
        }
        if (lastTwoGamesInFacility?.length > 1 && lastTwoGamesInFacility?.every(x => x?.oyesfc?.goal < x?.rival?.goal)) {
            const no4 = `O Yes FC lost the last 2 matches played in ${matchDetailsData?.place}.`
            infosForMatch.push(no4)
        }
        if (lastThreeGamesWithRival?.length > 2 && lastThreeGamesWithRival?.every(x => x?.oyesfc?.goal < x?.rival?.goal)) {
            const no5 = `O yes FC has lost to the ${matchDetailsData?.rival?.name} in the last 3 matches.`
            infosForMatch.push(no5)
        }
        let topScorerPlayers = {};
        lastThreeGames.forEach(match => {
            const squad = match.oyesfc.squad;
            Object.keys(squad).forEach(player => {
                const goals = squad[player].goal;
                topScorerPlayers[player] = (topScorerPlayers[player] || 0) + goals;
            });
        });
        Object.keys(topScorerPlayers).forEach(player => {
            if (topScorerPlayers[player] >= 9) {
                if (Object.values(TeamMembers).map(x => x.name).includes(player)) {
                    const no6 = `${player} scored ${topScorerPlayers[player]} goals in the last 3 matches.`
                    infosForMatch.push(no6)
                }
            }
        });
        if (infosForMatch?.length > 0) {
            let playerGoals = {};
            Object.values(allData).filter(x => x?.rival?.name === matchDetailsData?.rival?.name).forEach(match => {
                const squad = match.oyesfc.squad;
                Object.keys(squad).forEach(player => {
                    const goals = squad[player].goal;
                    playerGoals[player] = (playerGoals[player] || 0) + goals;
                });
            });
            let topScorer = '';
            let maxGoals = 0;
            Object.keys(playerGoals).forEach(player => {
                if (playerGoals[player] > maxGoals) {
                    topScorer = player;
                    maxGoals = playerGoals[player];
                }
            });
            if (lastThreeGamesWithRival?.length > 0 && maxGoals > 0) {
                if (Object.values(TeamMembers).map(x => x.name).includes(topScorer)) {
                    const no7 = `${topScorer} is the player who scored the most goals against ${matchDetailsData?.rival?.name} with ${maxGoals} goals.`
                    infosForMatch.push(no7)
                }
            }
        }
        return infosForMatch
    }

    return (
        <div className={classes.generalTabDiv}>
            {
                bestOfMatch &&
                <section className={classes.momSection}>
                    <>
                        <StarIcon fontSize={isMobile ? 'medium' : 'large'} className={classes.starIcon}>
                        </StarIcon>
                    </>
                    <div className={classes.momDetailsDiv}>
                                    <span className={classes.momNameSpan}>
                                        {bestOfMatch?.name}
                                    </span>
                        <span className={classes.momSmallSpan}>
                                        Man of the Match
                                    </span>
                    </div>
                </section>
            }
            <section className={classes.generalTabSection}>
                <div className={classes.generalInfoDiv}>
                    <LocationOnIcon fontSize={isMobile ? 'medium' : 'large'}
                                    className={classes.generalInfoIcon}>
                    </LocationOnIcon>
                    <span className={classes.generalInfoSpan} onClick={redirectToUrlTab}>
                                        {matchDetailsData.place}
                                    </span>
                </div>
                <div className={classes.generalInfoDiv}>
                    <CalendarMonthIcon fontSize={isMobile ? 'medium' : 'large'}
                                       className={classes.generalInfoIcon}>
                    </CalendarMonthIcon>
                    <span className={classes.generalInfoSpan} onClick={redirectToUrlTab}>
                                        {matchDetailsData.day.replace(/-/g, '/')}
                                    </span>
                </div>
                <div className={classes.generalInfoDiv}>
                    <AccessTimeIcon fontSize={isMobile ? 'medium' : 'large'}
                                    className={classes.generalInfoIcon}>
                    </AccessTimeIcon>
                    <span className={classes.generalInfoSpan} onClick={redirectToUrlTab}>
                                        {matchDetailsData.time}
                                    </span>
                </div>
                {matchDetailsData?.weather && matchDetailsData?.oyesfc?.jersey ?
                    <>
                        <div className={classes.generalInfoDiv}>
                            {weatherIcons}
                            <span className={classes.generalInfoSpan} onClick={redirectToUrlTab}>
                                                {matchDetailsData?.weather?.sky}
                                            </span>
                        </div>
                        <div className={classes.generalInfoDiv}>
                            <ThermostatIcon fontSize={isMobile ? 'medium' : 'large'}
                                            className={classes.generalInfoIcon}>
                            </ThermostatIcon>
                            <span className={classes.generalInfoSpan} onClick={redirectToUrlTab}>
                                                {matchDetailsData?.weather?.temperature}&#176;
                                            </span>
                        </div>
                        <div className={classes.generalInfoDiv}>
                            <CheckroomIcon fontSize={isMobile ? 'medium' : 'large'}
                                           className={classes.generalInfoIcon}>
                            </CheckroomIcon>
                            <span className={classes.generalInfoSpan} onClick={redirectToKitsTab}>
                                                {matchDetailsData?.oyesfc?.jersey}
                                            </span>
                        </div>
                    </>
                    :
                    null
                }
            </section>
            {
                lastFiveGames.length > 0 &&
                <section className={classes.teamFormSection}>
                    <div className={classes.formTitleDiv}>
                        <span className={classes.formTitleSpan}>{TeamNames.oYesFc + ' Form'}</span>
                    </div>
                    <div className={classes.formScoresDiv}>
                        {
                            lastFiveGames.map((x, y) => (
                                <div className={classes.lastGamesDiv}>
                                                <span className={
                                                    x.oyesfc.goal > x.rival.goal ?
                                                        classes.formScoresWinSpan
                                                        : x.oyesfc.goal === x.rival.goal ?
                                                            classes.formScoresDrawSpan
                                                            : classes.formScoresLoseSpan
                                                } key={y}>
                                                    {x.oyesfc.goal + ' - ' + x.rival.goal}
                                                </span>
                                    {
                                        y === 0 &&
                                        <div className={
                                            x.oyesfc.goal > x.rival.goal ?
                                                classes.lastWinMatch
                                                : x.oyesfc.goal === x.rival.goal ?
                                                    classes.lastDrawMatch
                                                    : classes.lastLostMatch
                                        }></div>
                                    }
                                </div>

                            ))
                        }
                    </div>
                </section>
            }
            {
                matchInformation?.length > 1 &&
                <section className={classes.generalTabSection}>
                    <div className={classes.generalInfoDiv}>
                        <InfoIcon fontSize={isMobile ? 'medium' : 'large'} className={classes.generalInfoIcon}>
                        </InfoIcon>
                        <span className={classes.generalInfoSpan}>
                                    Information
                                </span>
                    </div>
                    <Divider sx={{bgcolor: 'gray', margin: '10px'}}/>
                    {
                        matchInformation?.map((x, y) => (
                            <div key={y} className={classes.generalInfoDiv}>
                                <LabelIcon fontSize={isMobile ? 'medium' : 'large'} className={classes.generalInfoIcon}>
                                </LabelIcon>
                                <span className={classes.generalInfoSpan}>
                                            {x}
                                        </span>
                            </div>
                        ))
                    }
                </section>
            }
        </div>
    );
};

export default PreviewTab;