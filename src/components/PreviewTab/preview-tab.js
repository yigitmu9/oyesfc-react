import React, {useEffect, useState} from 'react';
import classes from "../MatchDetails/match-details.module.css";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {Facilities, TeamMembers, TeamNames} from "../../constants/constants";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import InfoIcon from "@mui/icons-material/Info";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Divider
} from "@mui/material";
import LabelIcon from "@mui/icons-material/Label";
import CloudIcon from '@mui/icons-material/Cloud';
import {loadWebsite} from "../../firebase";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import JerseyTab from "../JerseyTab/jersey-tab";
import {getGeoCoordinates, returnAverageData} from "../../utils/utils";
import {useSelector} from "react-redux";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import matchDetailsClasses from "../MatchDetails/match-details.module.css";
import playerCardsClasses from '../PlayerCards/player-cards.module.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import accountClasses from "../AccountGrid/account-grid.module.css";
import navbarClasses from "../Navbar/navbar.module.css";

const DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const PreviewTab = ({matchDetailsData, allData, matchIndex, bestOfMatch, redirectToTab, weatherData}) => {

    const isMobile = window.innerWidth <= 768;
    const { signedIn } = useSelector((state) => state.credentials);
    const lastFiveGames = Object.values(allData).filter((x, y) => x && (y === matchIndex + 1 || y === matchIndex + 2 || y === matchIndex + 3 || y === matchIndex + 4 || y === matchIndex + 5));
    const matchInformation = createMatchInfos();
    const [facilityRatingData, setFacilityRatingData] = useState(null);
    const phone = Facilities.find(x => x.name === matchDetailsData?.place)?.phoneNumber?.replace(/[\s()]/g, '');
    const coordinates = getGeoCoordinates(matchDetailsData?.place)
    const [latitude, longitude] = coordinates.split(',');
    const facilityCoordinates = [Number(latitude), Number(longitude)]

    const redirectToSquadTab = () => {
        redirectToTab(1)
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
                if (Object.values(TeamMembers).map(x => x.name).includes(player) && Object.keys(matchDetailsData?.oyesfc?.squad)?.includes(player)) {
                    const no6 = `${player} scored ${topScorerPlayers[player]} goals in the last 3 matches.`
                    infosForMatch.push(no6)
                }
            }
        });

        let allTimePlayerGoals = {};
        Object.values(allData).filter((x, y) => x && y > matchIndex).forEach(match => {
            const squad = match.oyesfc.squad;
            Object.keys(squad).forEach(player => {
                if (Object.keys(matchDetailsData.oyesfc.squad).includes(player) && Object.values(TeamMembers).map(x => x.name).includes(player)) {
                    const goals = squad[player].goal;
                    allTimePlayerGoals[player] = Number((allTimePlayerGoals[player] || 0) + goals);
                }
            });
        });

        const filteredNames = Object.entries(allTimePlayerGoals).filter(value => {
            const remainder = value[1] < 50 ? 50 - value[1] : 50 - (value[1] % 50);
            return remainder >= 1 && remainder <= 3 && (value[1] + remainder) % 50 === 0;
        }).map(([name, value]) => ({name, remainder: value < 50 ? 50 - value : 50 - (value % 50), goal: value}));

        if (filteredNames?.length > 0) {
            filteredNames?.forEach((person) => {
                const no5 = `There are ${person.remainder} goals left for ${person.name} to reach the ${person.goal + person.remainder}-goal threshold with O Yes FC jersey.`
                infosForMatch.push(no5)
            })
        }

        let allTimeMatchesCount = {};
        Object.values(allData).filter((x, y) => x && y >= matchIndex).forEach(match => {
            const squad = match.oyesfc.squad;
            Object.keys(squad).forEach(player => {
                if (Object.keys(matchDetailsData.oyesfc.squad).includes(player) && Object.values(TeamMembers).map(x => x.name).includes(player)) {
                    const count = squad[player] ? 1 : 0;
                    allTimeMatchesCount[player] = Number((allTimeMatchesCount[player] || 0) + count);
                }
            });
        });

        const filteredNamesOfMatches = Object.entries(allTimeMatchesCount).filter(value => {
            return value[1] % 25 === 0;
        }).map(([name, value]) => ({name, match: value}));

        if (filteredNamesOfMatches?.length > 0) {
            filteredNamesOfMatches?.forEach((person) => {
                const no5 = `${person.name} is playing his ${person.match}th match with the O Yes FC jersey.`
                infosForMatch.push(no5)
            })
        }

        if (Object.values(allData).filter((x, y) => x && y >= matchIndex)?.length % 25 === 0) {
            const no5 = `O Yes FC is playing their ${Object.values(allData).filter((x, y) => x && y >= matchIndex)?.length}th match.`
            infosForMatch.push(no5)
        }

        if (infosForMatch?.length > 0) {
            let playerGoals = {};
            Object.values(allData).filter((x, y) => x && y > matchIndex).filter(x => x?.rival?.name === matchDetailsData?.rival?.name).forEach(match => {
                const squad = match.oyesfc.squad;
                Object.keys(squad).forEach(player => {
                    const goals = squad[player].goal;
                    playerGoals[player] = (playerGoals[player] || 0) + goals;
                });
            });
            let topScorer = '';
            let maxGoals = 0;
            Object.keys(playerGoals).forEach(player => {
                if (playerGoals[player] > maxGoals && Object.keys(matchDetailsData?.oyesfc?.squad)?.includes(player)) {
                    topScorer = player;
                    maxGoals = playerGoals[player];
                }
            });
            if (lastThreeGamesWithRival?.length > 0 && maxGoals > 0) {
                if (Object.values(TeamMembers).map(x => x.name).includes(topScorer)) {
                    const no7 = `${topScorer} is the player who scored the most goals against ${matchDetailsData?.rival?.name} in the match squad with ${maxGoals} goals.`
                    infosForMatch.push(no7)
                }
            }
        }
        return infosForMatch
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await loadWebsite(`facilityRatings/${matchDetailsData?.place}`);
                if (response) calculateFacilityRating(response)
            } catch (error) {
                throw new Error(error?.message);
            }
        }

        fetchData().then(r => r);
    }, [matchDetailsData?.place]);

    const calculateFacilityRating = (data) => {
        const calculatedAverages = returnAverageData(data)
        setFacilityRatingData(calculatedAverages);
    }

    const redirectToAppleMaps = () => {
        const url = Facilities.find(x => x?.name === matchDetailsData.place)?.appleUrl
        if (url) window.open(url, "_blank");
    };

    const redirectToGoogleMaps = () => {
        const url = Facilities.find(x => x?.name === matchDetailsData.place)?.googleUrl
        if (url) window.open(url, "_blank");
    };


    const redirectToCall = () => {
        window.location.href = 'tel://' + phone;
    };


    return (
        <div className={classes.generalTabDiv}>
            {
                bestOfMatch &&
                <>
                    <div style={{height: '20px'}}></div>
                    <section className={classes.momSectionCursor} onClick={redirectToSquadTab}>
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
                </>
            }
            <div style={{height: '20px'}}></div>
            <section className={classes.generalTabSection}>
                <Accordion sx={{
                    bgcolor: '#1C1C1E',
                    color: 'lightgray',
                    width: '100%',
                    border: 0,
                    boxShadow: 0
                }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{color: 'lightgray'}}/>}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        sx={{padding: '0 10px'}}
                    >
                        <div className={classes.generalInfoDivAccordion}>
                            <LocationOnIcon fontSize={isMobile ? 'medium' : 'large'}
                                            className={classes.generalInfoIcon}>
                            </LocationOnIcon>
                            <span className={classes.generalInfoSpan}>
                        {matchDetailsData.place}
                    </span>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        {
                            facilityRatingData ?
                                <>
                                    <section className={matchDetailsClasses.generalTabSection} style={{padding: '0'}}>
                                        <div className={matchDetailsClasses.generalInfoDiv}>
                                            <span className={playerCardsClasses.ratingSpan} style={{
                                                background: (Object.values(facilityRatingData)
                                                    .map(value => parseFloat(value))
                                                    .reduce((acc, value) => acc + value, 0) / Object.values(facilityRatingData).length) >= 7 ? 'darkgreen' :
                                                    (Object.values(facilityRatingData)
                                                        .map(value => parseFloat(value))
                                                        .reduce((acc, value) => acc + value, 0) / Object.values(facilityRatingData).length) < 5 ? 'darkred' : 'darkgoldenrod'
                                            }}>
                                                {(Object.values(facilityRatingData)
                                                    .map(value => parseFloat(value))
                                                    .reduce((acc, value) => acc + value, 0) / Object.values(facilityRatingData).length)?.toFixed(1)}
                                            </span>
                                            <span className={matchDetailsClasses.generalInfoSpan}>
                                                Overall
                                            </span>
                                        </div>
                                        <Divider sx={{bgcolor: 'gray', margin: '10px'}}/>
                                        {
                                            Object.entries(facilityRatingData)?.map((a, b) => (
                                                <div key={b} className={matchDetailsClasses.generalInfoDiv}>
                                                    <span className={playerCardsClasses.ratingSpan} style={{
                                                        background: Number(a[1])?.toFixed(0) >= 7 ? 'darkgreen' :
                                                            Number(a[1])?.toFixed(0) < 5 ? 'darkred' : 'darkgoldenrod'
                                                    }}>
                                                        {Number(a[1])?.toFixed(1)}
                                                    </span>
                                                    <span className={matchDetailsClasses.generalInfoSpan}>
                                                        {a[0]}
                                                    </span>
                                                </div>
                                            ))
                                        }
                                    </section>
                                </> :
                                <span className={classes.generalInfoSpan}>
                                This facility is not rated.
                            </span>
                        }
                        <>
                            <div style={{height: '20px'}}></div>
                            <section className={classes.generalTabSection} style={{padding: '0'}}>
                                <MapContainer center={facilityCoordinates} zoom={13} className={classes.mapClass}>
                                    <TileLayer
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    />
                                    <Marker position={facilityCoordinates}>
                                        <Popup>{matchDetailsData?.place}</Popup>
                                    </Marker>
                                </MapContainer>
                            </section>
                        </>
                        <div style={{height: '20px'}}></div>
                        <div className={accountClasses.morePageBox} onClick={redirectToAppleMaps} style={{background: 'black'}}>
                            <span className={navbarClasses.drawerRoutesSpan} style={{fontSize: isMobile ? '14px' : '18px'}}>View {matchDetailsData?.place} on Apple Maps</span>
                        </div>
                        <div style={{height: '20px'}}></div>
                        <div className={accountClasses.morePageBox} onClick={redirectToGoogleMaps} style={{background: 'black'}}>
                            <span className={navbarClasses.drawerRoutesSpan} style={{fontSize: isMobile ? '14px' : '18px'}}>View {matchDetailsData?.place} on Google Maps</span>
                        </div>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{
                    bgcolor: '#1C1C1E',
                    color: 'lightgray',
                    width: '100%',
                    border: 0,
                    boxShadow: 0
                }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{color: 'lightgray'}}/>}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        sx={{padding: '0 10px'}}
                    >
                        <div className={classes.generalInfoDivAccordion}>
                            <CalendarMonthIcon fontSize={isMobile ? 'medium' : 'large'}
                                               className={classes.generalInfoIcon}>
                            </CalendarMonthIcon>
                            <span className={classes.generalInfoSpanCursor}>
                                {matchDetailsData.day.replace(/-/g, '/')}
                            </span>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <span className={classes.generalInfoSpan}>
                                The date of this match is {matchDetailsData.day.replace(/-/g, '/')}.
                            </span>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{
                    bgcolor: '#1C1C1E',
                    color: 'lightgray',
                    width: '100%',
                    border: 0,
                    boxShadow: 0,
                }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{color: 'lightgray'}}/>}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        sx={{padding: '0 10px'}}
                    >
                        <div className={classes.generalInfoDivAccordion}>
                            <AccessTimeIcon fontSize={isMobile ? 'medium' : 'large'}
                                            className={classes.generalInfoIcon}>
                            </AccessTimeIcon>
                            <span className={classes.generalInfoSpanCursor}>
                                {matchDetailsData.time}
                            </span>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <span className={classes.generalInfoSpan}>
                                The time of this match is {matchDetailsData.time}.
                            </span>
                    </AccordionDetails>
                </Accordion>
                <Accordion sx={{
                    bgcolor: '#1C1C1E',
                    color: 'lightgray',
                    width: '100%',
                    border: 0,
                    boxShadow: 0
                }}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{color: 'lightgray'}}/>}
                        aria-controls="panel3-content"
                        id="panel3-header"
                        sx={{padding: '0 10px'}}
                    >
                        <div className={classes.generalInfoDivAccordion}>
                            <CheckroomIcon fontSize={isMobile ? 'medium' : 'large'}
                                           className={classes.generalInfoIcon}>
                            </CheckroomIcon>
                            <span className={classes.generalInfoSpanCursor}>
                                {matchDetailsData?.oyesfc?.jersey}
                            </span>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <JerseyTab matchDetailsData={matchDetailsData}/>
                    </AccordionDetails>
                </Accordion>
                {
                    signedIn &&
                    <Accordion sx={{
                        bgcolor: '#1C1C1E',
                        color: 'lightgray',
                        width: '100%',
                        border: 0,
                        boxShadow: 0
                    }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{color: 'lightgray'}}/>}
                            aria-controls="panel3-content"
                            id="panel3-header"
                            sx={{padding: '0 10px'}}
                        >
                            <div className={classes.generalInfoDivAccordion}>
                                <LocalPhoneIcon fontSize={isMobile ? 'medium' : 'large'}
                                               className={classes.generalInfoIcon}>
                                </LocalPhoneIcon>
                                <span className={classes.generalInfoSpanCursor}>
                                {phone}
                            </span>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails>
                            <span className={classes.generalInfoSpan}>
                                The telephone number of {matchDetailsData?.place} is {phone}. Click the button to call.
                            </span>
                            <div style={{height: '20px'}}></div>
                            <div className={accountClasses.morePageBox} onClick={redirectToCall}
                                 style={{background: 'black'}}>
                                <span className={navbarClasses.drawerRoutesSpan} style={{fontSize: isMobile ? '14px' : '18px'}}>Call {matchDetailsData?.place}</span>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                }
            </section>
            {
                lastFiveGames.length > 0 &&
                <>
                <div style={{height: '20px'}}></div>
                    <section className={classes.teamFormSection}>
                        <div className={classes.formTitleDiv}>
                            <span className={classes.formTitleSpan}>{TeamNames.oYesFc + ' Form'}</span>
                        </div>
                        <div className={classes.formScoresDiv}>
                            {
                                lastFiveGames.map((x, y) => (
                                    <div key={y} className={classes.lastGamesDiv}>
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
                </>

            }
            {
                matchInformation?.length > 1 &&
                <>
                    <div style={{height: '20px'}}></div>
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
                                    <LabelIcon fontSize={isMobile ? 'medium' : 'large'}
                                               className={classes.generalInfoIcon}>
                                    </LabelIcon>
                                    <span className={classes.generalInfoSpan}>
                                            {x}
                                        </span>
                                </div>
                            ))
                        }
                    </section>
                </>

            }
            {((matchDetailsData?.weather?.sky && matchDetailsData?.weather?.sky !== '') || (weatherData?.sky)) &&
                <>
                    <div style={{height: '20px'}}></div>
                    <section className={classes.generalTabSection}>
                        <div className={classes.generalInfoDiv}>
                            <CloudIcon fontSize={isMobile ? 'medium' : 'large'} className={classes.generalInfoIcon}>
                            </CloudIcon>
                            <span className={classes.generalInfoSpan}>
                            Weather
                        </span>
                        </div>
                        <Divider sx={{bgcolor: 'gray', margin: '10px'}}/>
                        <div className={classes.generalInfoDiv}>
                        <span className={classes.generalInfoSpan}>
                            Weather:
                        </span>
                            <span className={classes.generalInfoSpan}>
                            {weatherData ? weatherData?.weather : (matchDetailsData?.weather?.weather && matchDetailsData?.weather?.weather !== '' ? matchDetailsData?.weather?.weather : matchDetailsData?.weather?.sky)}
                        </span>
                        </div>
                        {
                            ((matchDetailsData?.weather?.weather && matchDetailsData?.weather?.weather !== '') || (weatherData?.weather)) &&
                            <>
                                <div className={classes.generalInfoDiv}>
                        <span className={classes.generalInfoSpan}>
                            Description:
                        </span>
                                    <span className={classes.generalInfoSpan}>
                            {weatherData ? weatherData?.description : matchDetailsData?.weather?.description}
                        </span>
                                </div>
                                <div className={classes.generalInfoDiv}>
                        <span className={classes.generalInfoSpan}>
                            Part of the Day:
                        </span>
                                    <span className={classes.generalInfoSpan}>
                            {weatherData ? weatherData?.sky : matchDetailsData?.weather?.sky}
                        </span>
                                </div>
                            </>
                        }
                        <div className={classes.generalInfoDiv}>
                        <span className={classes.generalInfoSpan}>
                            Temperature:
                        </span>
                            <span className={classes.generalInfoSpan}>
                            {weatherData ? weatherData?.temperature : matchDetailsData?.weather?.temperature}&#176;
                        </span>
                        </div>
                        {
                            ((matchDetailsData?.weather?.weather && matchDetailsData?.weather?.weather !== '') || (weatherData?.weather)) &&
                            <>
                                <div className={classes.generalInfoDiv}>
                        <span className={classes.generalInfoSpan}>
                            Feels Like:
                        </span>
                                    <span className={classes.generalInfoSpan}>
                            {weatherData ? weatherData?.feels_like : matchDetailsData?.weather?.feels_like}&#176;
                        </span>
                                </div>
                                <div className={classes.generalInfoDiv}>
                        <span className={classes.generalInfoSpan}>
                            Humidity:
                        </span>
                                    <span className={classes.generalInfoSpan}>
                            {weatherData ? weatherData?.humidity : matchDetailsData?.weather?.humidity}%
                        </span>
                                </div>
                                <div className={classes.generalInfoDiv}>
                        <span className={classes.generalInfoSpan}>
                            Wind Speed:
                        </span>
                                    <span className={classes.generalInfoSpan}>
                            {weatherData ? weatherData?.windSpeed : matchDetailsData?.weather?.windSpeed} km/h
                        </span>
                                </div>
                                <div className={classes.generalInfoDiv}>
                        <span className={classes.generalInfoSpan}>
                            Clouds:
                        </span>
                                    <span className={classes.generalInfoSpan}>
                            {weatherData ? weatherData?.clouds : matchDetailsData?.weather?.clouds}%
                        </span>
                                </div>
                                <div className={classes.generalInfoDiv}>
                        <span className={classes.generalInfoSpan}>
                            Sea Level Pressure:
                        </span>
                                    <span className={classes.generalInfoSpan}>
                            {weatherData ? weatherData?.sea_level : matchDetailsData?.weather?.sea_level} hPa
                        </span>
                                </div>
                                <div className={classes.generalInfoDiv}>
                        <span className={classes.generalInfoSpan}>
                            Ground Level Pressure:
                        </span>
                                    <span className={classes.generalInfoSpan}>
                            {weatherData ? weatherData?.grnd_level : matchDetailsData?.weather?.grnd_level} hPa
                        </span>
                                </div>
                            </>
                        }
                    </section>
                </>
            }
        </div>
    );
};

export default PreviewTab;
