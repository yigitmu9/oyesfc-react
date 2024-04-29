import React, {useEffect, useRef, useState} from 'react';
import classes from "./match-details.module.css"
import TeamView from "../TeamView/team-view";
import Result from "../Result/result";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FootballLogo from '../../images/football.png';
import GameStatus from "../GameStatus/game-status";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import {Facilities, FootballRoles, Jerseys, TeamMembers, TeamNames, WeatherSky} from "../../constants/constants";
import Kit1 from '../../images/kit1.PNG';
import Kit2 from '../../images/kit2.PNG';
import Kit3 from '../../images/kit3.PNG';
import Kit4 from '../../images/kit4.PNG';
import Kit5 from '../../images/kit5.PNG';
import Box from "@mui/material/Box";
import {Divider, Tab, Tabs, Typography} from "@mui/material";
import PropTypes from "prop-types";
import SoccerLineUp from "react-soccer-lineup";
import RivalComparison from "../RivalComparison/rival-comparison";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import {AddToCalendarButton} from "add-to-calendar-button-react";
import EditIcon from '@mui/icons-material/Edit';
import AddMatchComponent from "../AddMatch/add-match";
import Message from "../Message/message";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {ref, set} from "firebase/database";
import {dataBase, loadWebsite} from "../../firebase";
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import GroupsIcon from '@mui/icons-material/Groups';
import InfoIcon from '@mui/icons-material/Info';
import LabelIcon from '@mui/icons-material/Label';

function CustomTabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export const MatchDetails = ({onClose, matchDetailsData, fixture, data, reloadData, credentials, allData}) => {

    document.body.style.overflow = 'hidden';
    const initialOYesFCStarFormData = {};
    const [ratesData, setRatesData] = useState(null);
    const isMobile = window.innerWidth <= 768;
    const buttonBgColor = '#323232'
    const matchDetails = Object.entries(matchDetailsData.oyesfc.squad).filter(x => x[1].goal > 0)
    const formattedDateForCalendar = formatDate(matchDetailsData.day);
    const rivalForCalendar = 'Rakip: ' + matchDetailsData.rival.name;
    const startTimeForCalendar = getStartTime(matchDetailsData.time);
    const endTimeForCalendar = getEndTime(matchDetailsData.time) === '00:00' ? '23:59' : getEndTime(matchDetailsData.time);
    const popupRef = useRef(null);
    const [tabValue, setTabValue] = React.useState(0);
    const matchIndex = Object.values(allData).findIndex(x => x === matchDetailsData)
    const lastFiveGames = Object.values(allData).filter((x, y) => x && (y === matchIndex + 1 || y === matchIndex + 2 || y === matchIndex + 3 || y === matchIndex + 4 || y === matchIndex + 5));
    const [oYesFCStarFormData, setOYesFCStarFormData] = useState(initialOYesFCStarFormData);
    const totalStars = 10;
    const [messageData, setMessageData] = useState(null);
    const [isMessagePopupOpen, setMessagePopupOpen] = useState(false);
    const [isAddMatchPopupOpen, setAddMatchPopupOpen] = useState(false);
    const [starsErrorMessage, setStarsErrorMessage] = useState(null);
    const [notesErrorMessage, setNotesErrorMessage] = useState(null);
    const [starsSubmitButton, setStarsSubmitButton] = useState('Submit');
    const [notesSubmitButton, setNotesSubmitButton] = useState('Submit');
    const [matchNotes, setMatchNotes] = useState(null);
    const [noteFormData, setNoteFormData] = useState({});
    const [squadRatings, setSquadRatings] = useState(null);
    const [bestOfMatch, setBestOfMatch] = useState(null);
    const matchInformations = createMatchInfos();
    let jerseyImage;
    let jerseyName;
    let oyesfcSquad;

    const handleTabChange = (event, newTabValue) => {
        setTabValue(newTabValue);
    };

    const handleOutsideClick = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            document.body.style.overflow = 'visible';
            onClose();
        }
    };

    const handleClose = () => {
        document.body.style.overflow = 'visible';
        onClose();
    };

    useEffect(() => {
        if (!ratesData) {
            fetchRatesData().then(r => r)
        }
        if (!matchNotes) {
            fetchNotesData().then(r => r)
        }
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    });

    let playerColor;
    let playerNumberColor;
    let gkColor;
    let gkNumberColor;

    if (matchDetailsData.oyesfc?.jersey === Jerseys[0]) {
        jerseyName = Jerseys[0];
        jerseyImage = Kit1;
        playerColor = 'dodgerblue';
        playerNumberColor = 'white';
        gkColor = 'royalblue';
        gkNumberColor = 'black';
    } else if (matchDetailsData.oyesfc?.jersey === Jerseys[1]) {
        jerseyName = Jerseys[1];
        jerseyImage = Kit2;
        playerColor = 'black';
        playerNumberColor = 'dodgerblue';
        gkColor = 'yellow';
        gkNumberColor = 'black';
    } else if (matchDetailsData.oyesfc?.jersey === Jerseys[2]) {
        jerseyName = Jerseys[2];
        jerseyImage = Kit3;
        playerColor = 'darkslateblue';
        playerNumberColor = 'white';
        gkColor = 'yellow';
        gkNumberColor = 'black';
    } else if (matchDetailsData.oyesfc?.jersey === Jerseys[3]) {
        jerseyName = Jerseys[3];
        jerseyImage = Kit4;
        playerColor = 'red';
        playerNumberColor = 'black';
        gkColor = 'dodgerblue';
        gkNumberColor = 'white';
    } else if (matchDetailsData.oyesfc?.jersey === Jerseys[4]) {
        jerseyName = Jerseys[4];
        jerseyImage = Kit5;
        playerColor = 'black';
        playerNumberColor = 'gold';
        gkColor = 'darkred';
        gkNumberColor = 'black';
    } else {
        const inputDateParts = matchDetailsData.day.split('-');
        const inputDateObject = new Date(Number(inputDateParts[2]), Number(inputDateParts[1]) - 1, Number(inputDateParts[0]));
        const redKitReleaseDate = new Date(2019, 4, 13);
        const tenthYearKitReleaseDate = new Date(2023, 7, 14);
        if (inputDateObject < redKitReleaseDate) {
            jerseyName = Jerseys[1];
            jerseyImage = Kit2;
            playerColor = 'black';
            playerNumberColor = 'dodgerblue';
            gkColor = 'yellow';
            gkNumberColor = 'black';
        } else if (inputDateObject > redKitReleaseDate && inputDateObject < tenthYearKitReleaseDate) {
            jerseyName = Jerseys[3];
            jerseyImage = Kit4;
            playerColor = 'red';
            playerNumberColor = 'black';
            gkColor = 'dodgerblue';
            gkNumberColor = 'white';
        } else if (inputDateObject > tenthYearKitReleaseDate) {
            jerseyName = Jerseys[4];
            jerseyImage = Kit5;
            playerColor = 'black';
            playerNumberColor = 'gold';
            gkColor = 'darkred';
            gkNumberColor = 'black';
        }
    }

    oyesfcSquad = {
        squad: {
            gk: {},
            df: [],
            cm: [],
            fw: [],
        },
        style: {
            color: playerColor,
            numberColor: playerNumberColor,
            nameColor: 'black',
        }
    }

    if (Object.values(matchDetailsData.oyesfc.squad).every(x => x?.hasOwnProperty('role'))) {
        Object.entries(matchDetailsData.oyesfc.squad)?.forEach(x => {
            let player;
            if (x[1]?.role !== FootballRoles[0]) {
                player = {
                    name: Object.values(TeamMembers)?.some(item => item?.name === x[0]) ? x[0]?.split(' ')[0] : x[0],
                    number: Object.values(TeamMembers)?.find(y => y?.name === x[0])?.number
                }
            } else {
                player = {
                    name: Object.values(TeamMembers)?.some(item => item?.name === x[0]) ? x[0]?.split(' ')[0] : x[0],
                    number: Object.values(TeamMembers)?.find(y => y?.name === x[0])?.number,
                    color: gkColor,
                    numberColor: gkNumberColor
                }
            }

            if (x[1]?.role === FootballRoles[0]) {
                oyesfcSquad.squad.gk = player
            } else if (x[1]?.role === FootballRoles[1]) {
                oyesfcSquad.squad.df.push(player)
            } else if (x[1]?.role === FootballRoles[2]) {
                oyesfcSquad.squad.cm.push(player)
            } else if (x[1]?.role === FootballRoles[3]) {
                oyesfcSquad.squad.fw.push(player)
            }
        })
    } else {
        Object.entries(matchDetailsData.oyesfc.squad)?.forEach(x => {
            let player;
            if (Object.values(TeamMembers)?.find(member => member?.name === x[0])?.role !== FootballRoles[0]) {
                player = {
                    name: Object.values(TeamMembers)?.some(item => item?.name === x[0]) ? x[0]?.split(' ')[0] : x[0],
                    number: Object.values(TeamMembers)?.find(y => y?.name === x[0])?.number ?
                        Object.values(TeamMembers)?.find(y => y?.name === x[0])?.number :
                        Math.floor(Math.random() * (98 - 19 + 1)) + 19
                }
            } else {
                player = {
                    name: Object.values(TeamMembers)?.some(item => item?.name === x[0]) ? x[0]?.split(' ')[0] : x[0],
                    number: Object.values(TeamMembers)?.find(y => y?.name === x[0])?.number,
                    numberColor: gkNumberColor,
                    color: gkColor,
                }
            }

            if (Object.values(TeamMembers).find(member => member?.name === x[0])?.role === FootballRoles[0]) {
                oyesfcSquad.squad.gk = player
            } else if (Object.values(TeamMembers).find(member => member?.name === x[0])?.role === FootballRoles[2]) {
                oyesfcSquad.squad.cm.push(player)
            } else if (Object.values(TeamMembers).find(member => member?.name === x[0])?.role === FootballRoles[3]) {
                oyesfcSquad.squad.fw.push(player)
            } else {
                oyesfcSquad.squad.df.push(player)
            }
        })
    }


    if (oyesfcSquad.squad.gk === {} || !oyesfcSquad?.squad?.gk?.name) {
        oyesfcSquad.squad.gk = null
    }
    if (oyesfcSquad.squad.df.length === 0) {
        oyesfcSquad.squad.df = null
    }
    if (oyesfcSquad.squad.cm.length === 0) {
        oyesfcSquad.squad.cm = null
    }
    if (oyesfcSquad.squad.fw.length === 0) {
        oyesfcSquad.squad.fw = null
    }

    function formatDate(dateString) {
        const [day, month, year] = dateString.split('-');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }

    function getStartTime(timeString) {
        return timeString.split('-')[0];
    }

    function getEndTime(timeString) {
        return timeString.split('-')[1];
    }

    const redirectToUrlTab = () => {
        setTabValue(4)
    }

    const redirectToKitsTab = () => {
        setTabValue(2)
    }

    const redirectToAppleMaps = () => {
        const url = Facilities.find(x => x?.name === matchDetailsData.place)?.appleUrl
        if (url) window.open(url, "_blank");
    };

    const redirectToGoogleMaps = () => {
        const url = Facilities.find(x => x?.name === matchDetailsData.place)?.googleUrl
        if (url) window.open(url, "_blank");
    };

    const redirectToWeatherApp = () => {
        window.location.href = "weather://";
    };

    const redirectToTimeAndDateWeather = () => {
        const matchDate = matchDetailsData.day.split('-');
        const url = `https://www.timeanddate.com/weather/@7732336/historic?month=${matchDate[1]}&year=${matchDate[2]}`;
        if (url && matchDate) window.open(url, "_blank");
    };

    const handleStarChange = (player, rating) => {
        if (starsSubmitButton !== 'Submitted') {
            setOYesFCStarFormData((prevData) => ({
                ...prevData,
                [player]: parseInt(rating)
            }));
        }
    };

    const handleMessageClick = (messageData) => {
        setMessageData(messageData);
    };

    const handleReload = (data) => {
        reloadData(data)
        handleClose()
    }

    const editMatch = () => {
        setAddMatchPopupOpen(true)
    }

    const submitStars = async () => {
        if (Object.keys(oYesFCStarFormData).length === (Object.entries(matchDetailsData.oyesfc.squad).length - 1)) {
            if (starsErrorMessage) setStarsErrorMessage(null)
            try {
                await set(ref(dataBase, `rates/${matchDetailsData?.day}/rates/${credentials?.id}`), oYesFCStarFormData);
                setStarsSubmitButton('Submitted')
            } catch (error) {
                console.log(error)
                setStarsErrorMessage(error?.message)
            }
        } else {
            setStarsErrorMessage('Rate everyone!')
        }
    };

    const fetchRatesData = async () => {
        try {
            const response = await loadWebsite(`rates/${matchDetailsData?.day}`);
            //const notesResponse = await loadWebsite(`notes/${matchDetailsData?.day}`);
            setRatesData(response)
            if (response?.rates) {
                if (Object.entries(response?.rates).some(x => x[0] === credentials?.id)) {
                    const form = Object.entries(response?.rates).find(x => x[0] === credentials?.id)[1]
                    setOYesFCStarFormData(form)
                    setStarsSubmitButton('Submitted')
                }
                if (Object.entries(response?.rates)?.length > 3) {
                    calculatePlayerRatings(response?.rates);
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    const fetchNotesData = async () => {
        try {
            const response = await loadWebsite(`notes/${matchDetailsData?.day}`);
            if (response?.notes) {
                const notesArray = Object.entries(response?.notes)
                setMatchNotes(notesArray)
                if (Object.entries(response?.notes).some(x => x[0] === credentials?.userName)) {
                    setNotesSubmitButton('Submitted')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleNoteInputChange = (event) => {
        const value = event.target.value;
        setNoteFormData((prevData) => ({
            ...prevData,
            note: value,
        }));
    };

    const calculatePlayerRatings = (ratingResponse) => {
        let ratingsArray = [];
        let bestPlayer;
        Object.entries(matchDetailsData.oyesfc.squad).forEach(playerName => {
            let points = 0;
            Object.values(ratingResponse).forEach((value) => {
                points += value[playerName[0]]
            })
            const averageRating = points / Object.entries(ratingResponse)?.length
            const ratingOfPlayer = {
                name: playerName[0],
                rating: averageRating,
                goal: playerName[1].goal,
            }
            if (!bestPlayer || bestPlayer?.rating < averageRating) {
                bestPlayer = ratingOfPlayer;
            } else if (bestPlayer?.rating === averageRating) {
                if (playerName[1].goal > bestPlayer.goal) {
                    bestPlayer = ratingOfPlayer;
                }
            }
            ratingsArray.push(ratingOfPlayer)
        })
        setSquadRatings(ratingsArray)
        setBestOfMatch(bestPlayer)
    }


    const submitNote = async () => {
        if (noteFormData['note']?.length > 0) {
            if (notesErrorMessage) setNotesErrorMessage(null)
            try {
                await set(ref(dataBase, `notes/${matchDetailsData?.day}/notes/${credentials?.userName}`), noteFormData);
                setNotesSubmitButton('Submitted')
                const newNote = [
                    credentials?.userName,
                    noteFormData
                ]
                setMatchNotes((prevData) => ([
                    ...prevData,
                    newNote
                ]));
            } catch (error) {
                console.log(error)
                setStarsErrorMessage(error?.message)
            }
        } else {
            setNotesErrorMessage('Add a note!')
        }
    };

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

    const closeButton = (
        <div className={classes.buttonBorderStyle}>
            <button className={classes.mapsButtons} onClick={handleClose}>Close</button>
        </div>
    )

    return (
        <div className={classes.overlay}>
            {!isAddMatchPopupOpen && !isMessagePopupOpen && <div className={classes.popupContainer} ref={popupRef}>
            <section className={classes.scoreboard} style={{background: buttonBgColor}}>
                    <div className={classes.scoreboardInsideDiv}>
                        <TeamView teamData={matchDetailsData?.oyesfc} rakipbul={matchDetailsData?.rakipbul}
                                  bgColor={buttonBgColor} isDetails={true}/>
                        <main className={classes.score} style={{background: buttonBgColor}}>
                            <Result homeTeamScore={matchDetailsData?.oyesfc?.goal}
                                    awayTeamScore={matchDetailsData?.rival?.goal}
                                    bgColor={buttonBgColor}
                                    isDetails={true}
                                    fixture={fixture}
                                    time={matchDetailsData?.time}/>
                            {fixture === 'live' ?
                                <GameStatus status={matchDetailsData?.day?.replace(/-/g, '/')}
                                            bgColor={buttonBgColor}
                                            fixture={fixture} isDetails={true}/>
                                :
                                null
                            }
                        </main>
                        <TeamView teamData={matchDetailsData?.rival} rakipbul={matchDetailsData?.rakipbul}
                                  bgColor={buttonBgColor} isDetails={true}/>
                    </div>
                    {matchDetailsData.oyesfc.goal !== 0 ?
                        <div className={classes.playerGoalsDiv}>
                            {matchDetails.map((item, index) => (
                                <div key={index} style={{
                                    background: buttonBgColor,
                                }}
                                     className={classes.goalScorerGrid}>
                            <span style={{
                                background: buttonBgColor,
                            }}
                                  className={classes.goalScorerName}>{item[0].replace(/[0-9]/g, '')}</span>
                                    {Array.from({length: item[1].goal}).map((_, imgIndex) => (
                                        <img
                                            key={imgIndex}
                                            className={classes.goalImage}
                                            style={{background: buttonBgColor}}
                                            src={FootballLogo}
                                            alt={`Goal ${imgIndex + 1}`}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                        :
                        null
                    }
                </section>
                <Box sx={{borderBottom: 1, borderColor: 'divider', bgcolor: '#323232'}}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example"
                          scrollButtons allowScrollButtonsMobilex variant="scrollable"
                          sx={{
                              '& .MuiTabs-indicator': {
                                  backgroundColor: 'lightgray',
                              },
                              '& .MuiTabScrollButton-root': {
                                  color: 'gray'
                              }
                          }}>
                        <Tab sx={{
                            '&.MuiTab-root': {
                                color: 'gray'
                            }, '&.Mui-selected': {
                                color: 'lightgray'
                            }
                        }} label="preview" {...a11yProps(0)} />
                        <Tab sx={{
                            '&.MuiTab-root': {
                                color: 'gray'
                            }, '&.Mui-selected': {
                                color: 'lightgray'
                            }
                        }} label="squad" {...a11yProps(1)} />
                        <Tab sx={{
                            '&.MuiTab-root': {
                                color: 'gray'
                            }, '&.Mui-selected': {
                                color: 'lightgray'
                            }
                        }} label="Jersey" {...a11yProps(2)} />
                        <Tab sx={{
                            '&.MuiTab-root': {
                                color: 'gray'
                            }, '&.Mui-selected': {
                                color: 'lightgray'
                            }
                        }} label="comparison" {...a11yProps(3)} />
                        <Tab sx={{
                            '&.MuiTab-root': {
                                color: 'gray'
                            }, '&.Mui-selected': {
                                color: 'lightgray'
                            }
                        }} label="links" {...a11yProps(4)} />
                        {
                            credentials?.signedIn && fixture === 'previous' &&
                            <Tab sx={{
                                '&.MuiTab-root': {
                                    color: 'gray'
                                }, '&.Mui-selected': {
                                    color: 'lightgray'
                                }
                            }} label="rating" {...a11yProps(5)} />
                        }
                        {
                            credentials?.signedIn && fixture === 'previous' &&
                            <Tab sx={{
                                '&.MuiTab-root': {
                                    color: 'gray'
                                }, '&.Mui-selected': {
                                    color: 'lightgray'
                                }
                            }} label="notes" {...a11yProps(6)} />
                        }
                    </Tabs>
                </Box>
                <CustomTabPanel value={tabValue} index={0}>
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
                                        {
                                            matchDetailsData?.weather?.sky === WeatherSky[1] ?
                                                <WbSunnyIcon fontSize={isMobile ? 'medium' : 'large'}
                                                             className={classes.generalInfoIcon}>
                                                </WbSunnyIcon>
                                                : matchDetailsData?.weather?.sky === WeatherSky[2] ?
                                                    <ThunderstormIcon fontSize={isMobile ? 'medium' : 'large'}
                                                                      className={classes.generalInfoIcon}>
                                                    </ThunderstormIcon>
                                                    : matchDetailsData?.weather?.sky === WeatherSky[3] ?
                                                        <AcUnitIcon fontSize={isMobile ? 'medium' : 'large'}
                                                                    className={classes.generalInfoIcon}>
                                                        </AcUnitIcon>
                                                        : <NightlightRoundIcon fontSize={isMobile ? 'medium' : 'large'}
                                                                               className={classes.generalInfoIcon}>
                                                        </NightlightRoundIcon>
                                        }
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
                            matchInformations?.length > 1 &&
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
                                    matchInformations?.map((x, y) => (
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
                    {isMobile && closeButton}
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={1}>
                    <section className={classes.squadSection}>
                        <div className={classes.generalInfoDiv}>
                            <GroupsIcon fontSize={isMobile ? 'medium' : 'large'} className={classes.generalInfoIcon}>
                            </GroupsIcon>
                            <span className={classes.generalInfoSpan}>
                            Squad
                        </span>
                        </div>
                        <Divider sx={{bgcolor: 'gray', margin: '10px'}}/>
                        {
                            Object.keys(matchDetailsData?.oyesfc?.squad).map((x, y) => (
                                <div key={y} className={classes.generalInfoDiv}>
                                    {
                                        squadRatings ?
                                            <span
                                                className={squadRatings?.find(rating => rating?.name === x)?.rating >= 7 ? classes.goodRating :
                                                    squadRatings?.find(rating => rating?.name === x)?.rating < 5 ? classes.badRating : classes.midRating}>
                                                    {squadRatings?.find(rating => rating?.name === x)?.rating.toFixed(1)}
                                            </span>
                                            :
                                            <PersonIcon fontSize={isMobile ? 'medium' : 'large'} className={classes.generalInfoIcon}>
                                            </PersonIcon>
                                    }
                                    <span className={classes.generalInfoSpan}>
                                        {x}
                                    </span>
                                </div>
                            ))
                        }
                    </section>
                    <div className={classes.pitchStyleDiv}>
                        <SoccerLineUp
                            size={"responsive"}
                            homeTeam={oyesfcSquad}
                            color={'green'}
                        />
                    </div>
                    {isMobile && closeButton}
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={2}>
                    <section className={classes.squadSection}>
                        <span className={classes.kitSpan}>{jerseyName}</span>
                        <Divider sx={{bgcolor: 'gray', margin: '10px'}}/>
                        <img
                            key={'1'}
                            className={classes.kitImage}
                            src={jerseyImage}
                            alt={`1`}
                        />
                    </section>
                    {isMobile && closeButton}
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={3}>
                    <>
                        <RivalComparison data={allData} selectedRival={matchDetailsData?.rival.name}/>
                    </>
                    {isMobile && closeButton}
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={4}>
                    <>
                        <div className={classes.urlTabSection}>
                            <section className={classes.firstLinksSection}>
                                <div className={classes.urlInfoDiv}>
                                    <LocationOnIcon fontSize={isMobile ? 'medium' : 'large'}
                                                    className={classes.generalInfoIcon}>
                                    </LocationOnIcon>
                                    <span className={classes.generalInfoSpan}>
                                        {matchDetailsData.place}
                                    </span>
                                </div>
                                <Divider sx={{bgcolor: 'gray', margin: '10px'}}/>
                                <div className={classes.generalInfoDiv}>
                                    <div className={classes.mapsButtonsWrapper}>
                                        <button className={classes.mapsButtons} onClick={redirectToAppleMaps}>Apple Maps
                                        </button>
                                        <button className={classes.mapsButtons} onClick={redirectToGoogleMaps}>Google
                                            Maps
                                        </button>
                                    </div>
                                </div>
                            </section>
                            <section className={classes.linksSection}>
                                <div className={classes.urlInfoDiv}>
                                    <CalendarMonthIcon fontSize={isMobile ? 'medium' : 'large'}
                                                       className={classes.generalInfoIcon}>
                                    </CalendarMonthIcon>
                                    <span className={classes.generalInfoSpan}>
                                        {matchDetailsData.day.replace(/-/g, '/') + ' ' + matchDetailsData.time}
                                    </span>
                                </div>
                                <Divider sx={{bgcolor: 'gray', margin: '10px'}}/>
                                <div className={classes.generalInfoDiv}>
                                    <AddToCalendarButton
                                        name="Halısaha"
                                        description={rivalForCalendar}
                                        startDate={formattedDateForCalendar}
                                        startTime={startTimeForCalendar}
                                        endTime={endTimeForCalendar}
                                        timeZone="Europe/Istanbul"
                                        location={matchDetailsData.place}
                                        options="'Apple','Google','Outlook.com'"
                                        listStyle="overlay"
                                        availability="busy"
                                        buttonStyle="round"
                                        trigger="click"
                                        hideIconButton
                                        buttonsList
                                        hideBackground
                                        hideCheckmark
                                        size="4"
                                        lightMode="dark"
                                    ></AddToCalendarButton>
                                </div>
                            </section>
                            <section className={classes.linksSection}>
                                <div className={classes.urlInfoDiv}>
                                    {
                                        matchDetailsData?.weather?.sky === WeatherSky[1] ?
                                            <WbSunnyIcon fontSize={isMobile ? 'medium' : 'large'}
                                                         className={classes.generalInfoIcon}>
                                            </WbSunnyIcon>
                                            : matchDetailsData?.weather?.sky === WeatherSky[2] ?
                                                <ThunderstormIcon fontSize={isMobile ? 'medium' : 'large'}
                                                                  className={classes.generalInfoIcon}>
                                                </ThunderstormIcon>
                                                : matchDetailsData?.weather?.sky === WeatherSky[3] ?
                                                    <AcUnitIcon fontSize={isMobile ? 'medium' : 'large'}
                                                                className={classes.generalInfoIcon}>
                                                    </AcUnitIcon>
                                                    : <NightlightRoundIcon fontSize={isMobile ? 'medium' : 'large'}
                                                                           className={classes.generalInfoIcon}>
                                                    </NightlightRoundIcon>
                                    }
                                    {
                                        matchDetailsData?.weather ?
                                            <span className={classes.generalInfoSpan}>
                                            {matchDetailsData?.weather?.sky + ' ' + matchDetailsData?.weather?.temperature}&#176;
                                        </span>
                                            :
                                            <span className={classes.generalInfoSpan}>
                                            No data available
                                        </span>
                                    }
                                </div>
                                <Divider sx={{bgcolor: 'gray', margin: '10px'}}/>
                                <div className={classes.generalInfoDiv}>
                                    <div className={classes.mapsButtonsWrapper}>
                                        {
                                            fixture === 'previous' ?
                                                <button className={classes.mapsButtons}
                                                        onClick={redirectToTimeAndDateWeather}>
                                                    Timeanddate Weather
                                                </button>
                                                :
                                                <button className={classes.mapsButtons} onClick={redirectToWeatherApp}>
                                                    Weather App
                                                </button>
                                        }
                                    </div>
                                </div>
                            </section>
                            {
                                credentials?.isCaptain &&
                                <section className={classes.lastLinksSection}>
                                    <div className={classes.urlInfoDiv}>
                                        <EditIcon fontSize={isMobile ? 'medium' : 'large'}
                                                  className={classes.generalInfoIcon}>
                                        </EditIcon>
                                        <span className={classes.generalInfoSpan}>
                                            Edit Match
                                        </span>
                                    </div>
                                    <Divider sx={{bgcolor: 'gray', margin: '10px'}}/>
                                    <div className={classes.generalInfoDiv}>
                                        <div className={classes.mapsButtonsWrapper}>
                                            <button className={classes.mapsButtons} onClick={editMatch}>Edit
                                            </button>
                                        </div>
                                    </div>
                                </section>
                            }
                        </div>
                    </>
                    {isMobile && closeButton}
                </CustomTabPanel>
                {
                    credentials?.signedIn && fixture === 'previous' &&
                    <>
                        <CustomTabPanel value={tabValue} index={5}>
                            {
                                Object.entries(matchDetailsData.oyesfc.squad).filter(a => a[0] !== credentials?.userName)?.map((x, y) => (
                                    <section key={y} className={classes.starSection}>
                                        <span className={classes.starSpan}>{x[0]}</span>
                                        <div className={classes.starDiv}>
                                            {[...Array(totalStars)].map((star, index) => {
                                                const currentRating = index + 1;
                                                return (

                                                    <label key={index} className={classes.starLabel}>
                                                        <input
                                                            key={star}
                                                            type="radio"
                                                            name="rating"
                                                            value={oYesFCStarFormData[x[0]]}
                                                            onChange={() =>
                                                                handleStarChange(x[0], currentRating)}
                                                        />
                                                        <span
                                                            className={classes.star}
                                                            style={{
                                                                color:
                                                                    currentRating <= (oYesFCStarFormData[x[0]]) ? "#ffc107" : "#e4e5e9",
                                                            }}>
                                                        &#9733;
                                                    </span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                        {
                                            oYesFCStarFormData[x[0]] ?
                                                <span className={classes.starDetailSpan}>
                                                Your rating to {x[0] + ' is ' + oYesFCStarFormData[x[0]] + '.'}</span>
                                                :
                                                <span className={classes.starDetailSpan}>
                                                Rate {x[0]}.
                                            </span>
                                        }

                                    </section>
                                ))
                            }
                            {
                                starsErrorMessage &&
                                <section className={classes.starSection}>
                                    <span className={classes.starsErrorSpan}>
                                        <ErrorOutlineIcon fontSize={isMobile ? 'medium' : 'large'} className={classes.errorIcon}>
                                        </ErrorOutlineIcon>
                                        {starsErrorMessage}
                                    </span>
                                </section>
                            }
                            <div className={classes.submitButtonDiv}>
                                <button className={classes.mapsButtons} disabled={starsSubmitButton === 'Submitted'} onClick={submitStars}>{starsSubmitButton}</button>
                                {isMobile && <button className={classes.mapsButtons} onClick={handleClose}>Close</button>}
                            </div>
                        </CustomTabPanel>
                        <CustomTabPanel value={tabValue} index={6}>
                            {
                                matchNotes && matchNotes?.map((x, y) => (
                                    <section key={y} className={classes.notesSection}>
                                        <span className={classes.noteWriterSpan}>{x[0]}</span>
                                        <Divider sx={{bgcolor: 'gray', marginTop: '10px', marginBottom: '10px'}}/>
                                        <span className={classes.starSpan}>{x[1]?.note}</span>
                                    </section>
                                ))
                            }
                            {
                                notesSubmitButton !== 'Submitted' &&
                                <section className={classes.notesSection}>
                                    <label className={classes.labelStyle}>
                                        Add your note:
                                        <input
                                            className={classes.inputDesign}
                                            required={true}
                                            type="text"
                                            name="note"
                                            value={noteFormData[credentials?.userName]}
                                            onChange={handleNoteInputChange}
                                            maxLength={250}
                                        />
                                    </label>
                                </section>
                            }
                            {
                                notesErrorMessage &&
                                <section className={classes.starSection}>
                                    <span className={classes.starsErrorSpan}>
                                        <ErrorOutlineIcon fontSize={isMobile ? 'medium' : 'large'} className={classes.errorIcon}>
                                        </ErrorOutlineIcon>
                                        {notesErrorMessage}
                                    </span>
                                </section>
                            }
                            <div className={classes.submitButtonDiv}>
                                <button className={classes.mapsButtons} disabled={notesSubmitButton === 'Submitted'}
                                        onClick={submitNote}>
                                    {notesSubmitButton}
                                </button>
                                {isMobile && <button className={classes.mapsButtons} onClick={handleClose}>Close</button>}
                            </div>
                        </CustomTabPanel>
                    </>
                }
            </div>}
            {isAddMatchPopupOpen && <AddMatchComponent openMessage={() => setMessagePopupOpen(true)}
                                                       onClose={() => setAddMatchPopupOpen(false)}
                                                       messageData={(messageData) => handleMessageClick(messageData)}
                                                       databaseData={data} selectedMatchData={matchDetailsData}/>}
            {isMessagePopupOpen && <Message messageData={messageData} onClose={() => setMessagePopupOpen(false)} reloadData={handleReload}/>}
        </div>
    );
};
