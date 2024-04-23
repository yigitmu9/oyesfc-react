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
import {Tab, Tabs, Typography} from "@mui/material";
import PropTypes from "prop-types";
import SoccerLineUp from "react-soccer-lineup";
import RivalComparison from "../RivalComparison/rival-comparison";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import {AddToCalendarButton} from "add-to-calendar-button-react";
import EditIcon from '@mui/icons-material/Edit';

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

export const MatchDetails = ({onClose, matchDetailsData, fixture, data}) => {

    const initialOYesFCStarFormData = {};
    const isMobile = window.innerWidth <= 768;
    const buttonBgColor = '#323232'
    const matchDetails = Object.entries(matchDetailsData.oyesfc.squad).filter(x => x[1].goal > 0)
    const formattedDateForCalendar = formatDate(matchDetailsData.day);
    const rivalForCalendar = 'Rakip: ' + matchDetailsData.rival.name;
    const startTimeForCalendar = getStartTime(matchDetailsData.time);
    const endTimeForCalendar = getEndTime(matchDetailsData.time) === '00:00' ? '23:59' : getEndTime(matchDetailsData.time);
    const popupRef = useRef(null);
    const [tabValue, setTabValue] = React.useState(0);
    const lastFiveGames = Object.values(data).filter((x, y) => x && (y === 0 || y === 1 || y === 2 || y === 3 || y === 4));
    const [oYesFCStarFormData, setOYesFCStarFormData] = useState(initialOYesFCStarFormData);
    const totalStars = 10;
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
                    number: Object.values(TeamMembers)?.find(y => y?.name === x[0])?.number
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
        setOYesFCStarFormData((prevData) => ({
            ...prevData,
            [player]: parseInt(rating)
        }));
    };

    return (
        <div className={classes.overlay}>
            <div className={classes.popupContainer} ref={popupRef}>
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
                        }} label="lineup" {...a11yProps(1)} />
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
                        <Tab sx={{
                            '&.MuiTab-root': {
                                color: 'gray'
                            }, '&.Mui-selected': {
                                color: 'lightgray'
                            }
                        }} label="rating" {...a11yProps(5)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={tabValue} index={0}>
                    <div className={classes.generalTabDiv}>
                        <section className={classes.generalTabSection}>
                            <div className={classes.generalInfoDiv}>
                                <LocationOnIcon fontSize={"large"}
                                                className={classes.generalInfoIcon}>
                                </LocationOnIcon>
                                <span className={classes.generalInfoSpan} onClick={redirectToUrlTab}>
                                        {matchDetailsData.place}
                                    </span>
                            </div>
                            <div className={classes.generalInfoDiv}>
                                <CalendarMonthIcon fontSize={"large"}
                                                   className={classes.generalInfoIcon}>
                                </CalendarMonthIcon>
                                <span className={classes.generalInfoSpan} onClick={redirectToUrlTab}>
                                        {matchDetailsData.day.replace(/-/g, '/')}
                                    </span>
                            </div>
                            <div className={classes.generalInfoDiv}>
                                <AccessTimeIcon fontSize={"large"}
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
                                                <WbSunnyIcon fontSize={"large"}
                                                             className={classes.generalInfoIcon}>
                                                </WbSunnyIcon>
                                                : matchDetailsData?.weather?.sky === WeatherSky[2] ?
                                                    <ThunderstormIcon fontSize={"large"}
                                                                      className={classes.generalInfoIcon}>
                                                    </ThunderstormIcon>
                                                    : matchDetailsData?.weather?.sky === WeatherSky[3] ?
                                                        <AcUnitIcon fontSize={"large"}
                                                                    className={classes.generalInfoIcon}>
                                                        </AcUnitIcon>
                                                        : <NightlightRoundIcon fontSize={"large"}
                                                                               className={classes.generalInfoIcon}>
                                                        </NightlightRoundIcon>
                                        }
                                        <span className={classes.generalInfoSpan} onClick={redirectToUrlTab}>
                                                {matchDetailsData?.weather?.sky}
                                            </span>
                                    </div>
                                    <div className={classes.generalInfoDiv}>
                                        <ThermostatIcon fontSize={"large"}
                                                        className={classes.generalInfoIcon}>
                                        </ThermostatIcon>
                                        <span className={classes.generalInfoSpan} onClick={redirectToUrlTab}>
                                                {matchDetailsData?.weather?.temperature}&#176;
                                            </span>
                                    </div>
                                    <div className={classes.generalInfoDiv}>
                                        <CheckroomIcon fontSize={"large"}
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
                        <section className={classes.teamFormSection}>
                            <div className={classes.formTitleDiv}>
                                <span className={classes.formTitleSpan}>{TeamNames.oYesFc + ' Form'}</span>
                            </div>
                            <div className={classes.formScoresDiv}>
                                {
                                    lastFiveGames.map((x, y) => (
                                        <span className={
                                            x.oyesfc.goal > x.rival.goal ?
                                                classes.formScoresWinSpan
                                                : x.oyesfc.goal === x.rival.goal ?
                                                    classes.formScoresDrawSpan
                                                    : classes.formScoresLoseSpan
                                        } key={y}>
                                            {x.oyesfc.goal + ' - ' + x.rival.goal}
                                        </span>
                                    ))
                                }
                            </div>
                        </section>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={1}>
                    <div className={classes.pitchStyleDiv}>
                        <SoccerLineUp
                            size={"responsive"}
                            homeTeam={oyesfcSquad}
                            color={'#404040'}
                        />
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={2}>
                    <div className={classes.kitStyleDiv}>
                        <span className={classes.kitSpan}>{jerseyName}</span>
                        <img
                            key={'1'}
                            className={classes.kitImage}
                            src={jerseyImage}
                            alt={`1`}
                        />
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={3}>
                    <>
                        <RivalComparison data={data} selectedRival={matchDetailsData?.rival.name}/>
                    </>
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={4}>
                    <div className={classes.generalTabDiv}>
                        <section className={classes.urlTabSection}>
                            <div className={classes.generalInfoDiv}>
                                <LocationOnIcon fontSize={"large"}
                                                className={classes.generalInfoIcon}>
                                </LocationOnIcon>
                                <span className={classes.generalInfoSpan}>
                                        {matchDetailsData.place}
                                    </span>
                            </div>
                            <div className={classes.generalInfoDiv}>
                                <div className={classes.mapsButtonsWrapper}>
                                    <button className={classes.mapsButtons} onClick={redirectToAppleMaps}>Apple Maps
                                    </button>
                                    <button className={classes.mapsButtons} onClick={redirectToGoogleMaps}>Google Maps
                                    </button>
                                </div>
                            </div>
                            <div className={classes.generalInfoDiv}>
                                <CalendarMonthIcon fontSize={"large"}
                                                   className={classes.generalInfoIcon}>
                                </CalendarMonthIcon>
                                <span className={classes.generalInfoSpan}>
                                        {matchDetailsData.day.replace(/-/g, '/') + ' ' + matchDetailsData.time}
                                    </span>
                            </div>
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
                            <div className={classes.generalInfoDiv}>
                                {
                                    matchDetailsData?.weather?.sky === WeatherSky[1] ?
                                        <WbSunnyIcon fontSize={"large"}
                                                     className={classes.generalInfoIcon}>
                                        </WbSunnyIcon>
                                        : matchDetailsData?.weather?.sky === WeatherSky[2] ?
                                            <ThunderstormIcon fontSize={"large"}
                                                              className={classes.generalInfoIcon}>
                                            </ThunderstormIcon>
                                            : matchDetailsData?.weather?.sky === WeatherSky[3] ?
                                                <AcUnitIcon fontSize={"large"}
                                                            className={classes.generalInfoIcon}>
                                                </AcUnitIcon>
                                                : <NightlightRoundIcon fontSize={"large"}
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
                            <div className={classes.generalInfoDiv}>
                                <EditIcon fontSize={"large"}
                                                className={classes.generalInfoIcon}>
                                </EditIcon>
                                <span className={classes.generalInfoSpan}>
                                    Edit Match
                                </span>
                            </div>
                            <div className={classes.generalInfoDiv}>
                                <div className={classes.mapsButtonsWrapper}>
                                    <button className={classes.mapsButtons}>Edit
                                    </button>
                                </div>
                            </div>
                        </section>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={5}>
                    {
                        Object.entries(matchDetailsData.oyesfc.squad).filter(a => Object.values(TeamMembers)
                            ?.some(item => item?.name === a[0]))?.map((x, y) => (
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
                                            Your rating to {x[0] + ' is ' + oYesFCStarFormData[x[0]] + '.'}
                                        </span>
                                        :
                                        <span className={classes.starDetailSpan}>
                                            Rate {x[0]}.
                                        </span>
                                }

                            </section>
                        ))
                    }
                    <div className={classes.submitButtonDiv}>
                        <button className={classes.mapsButtons}>Submit</button>
                    </div>

                </CustomTabPanel>
                {
                    isMobile &&
                    <div className={classes.buttonBorderStyle}>
                        <button className={classes.buttonStyle} onClick={handleClose}>Close</button>
                    </div>
                }
            </div>

        </div>
    );
};
