import React, {useEffect, useRef, useState} from 'react';
import classes from "./match-details.module.css"
import TeamView from "../TeamView/team-view";
import Result from "../Result/result";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FootballLogo from '../../images/football.png';
import AddToCalendarModal from "../AddToCalendarModal/add-to-calendar-modal";
import GameStatus from "../GameStatus/game-status";
import MapsModal from "../MapsModal/maps-modal";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import {Facilities, FootballRoles, Jerseys, TeamMembers, TeamNames, WeatherSky} from "../../constants/constants";
import Kit1 from '../../images/kit1.PNG';
import Kit2 from '../../images/kit2.PNG';
import Kit3 from '../../images/kit3.PNG';
import Kit4 from '../../images/kit4.PNG';
import Kit5 from '../../images/kit5.PNG';
import RivalKit from '../../images/rivalKit.PNG';
import Box from "@mui/material/Box";
import {Tab, Tabs, Typography} from "@mui/material";
import PropTypes from "prop-types";
import SoccerLineUp from "react-soccer-lineup";
import RivalComparison from "../RivalComparison/rival-comparison";
import AcUnitIcon from '@mui/icons-material/AcUnit';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import {AddToCalendarButton} from "add-to-calendar-button-react";

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

    const isMobile = window.innerWidth <= 768;
    const buttonBgColor = '#323232'
    const matchDetails = Object.entries(matchDetailsData.oyesfc.squad).filter(x => x[1].goal > 0)
    const formattedDateForCalendar = formatDate(matchDetailsData.day);
    const rivalForCalendar = 'Rakip: ' + matchDetailsData.rival.name;
    const startTimeForCalendar = getStartTime(matchDetailsData.time);
    const endTimeForCalendar = getEndTime(matchDetailsData.time) === '00:00' ? '23:59' : getEndTime(matchDetailsData.time);
    const popupRef = useRef(null);
    const [isCalendarModalOpen, setCalendarModalOpen] = useState(false);
    const [isMapsModalOpen, setMapsModalOpen] = useState(false);
    const [tabValue, setTabValue] = React.useState(0);
    let jerseyImage;
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

    const openCalendarModal = () => {
        document.body.style.overflow = 'hidden';
        setCalendarModalOpen(true);
    };

    const openMapsModal = () => {
        document.body.style.overflow = 'hidden';
        setMapsModalOpen(true);
    };

    let playerColor;
    let playerNumberColor;
    let gkColor;
    let gkNumberColor;

    if (matchDetailsData.oyesfc?.jersey === Jerseys[4]) {
        jerseyImage = Kit1;
        playerColor = 'dodgerblue';
        playerNumberColor = 'white';
        gkColor = 'royalblue';
        gkNumberColor = 'black';
    } else if (matchDetailsData.oyesfc?.jersey === Jerseys[3]) {
        jerseyImage = Kit2;
        playerColor = 'black';
        playerNumberColor = 'dodgerblue';
        gkColor = 'yellow';
        gkNumberColor = 'black';
    } else if (matchDetailsData.oyesfc?.jersey === Jerseys[2]) {
        jerseyImage = Kit3;
        playerColor = 'darkslateblue';
        playerNumberColor = 'white';
        gkColor = 'yellow';
        gkNumberColor = 'black';
    } else if (matchDetailsData.oyesfc?.jersey === Jerseys[1]) {
        jerseyImage = Kit4;
        playerColor = 'red';
        playerNumberColor = 'white';
        gkColor = 'dodgerblue';
        gkNumberColor = 'white';
    } else {
        jerseyImage = Kit5;
        playerColor = 'black';
        playerNumberColor = 'gold';
        gkColor = 'darkred';
        gkNumberColor = 'black';
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
        setTabValue(5)
    }

    const redirectToKitsTab = () => {
        setTabValue(3)
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

    return (
        <div className={classes.overlay}>
            {!isCalendarModalOpen && !isMapsModalOpen &&
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
                            }} label="general 1" {...a11yProps(0)} />
                            <Tab sx={{
                                '&.MuiTab-root': {
                                    color: 'gray'
                                }, '&.Mui-selected': {
                                    color: 'lightgray'
                                }
                            }} label="general 2" {...a11yProps(1)} />
                            <Tab sx={{
                                '&.MuiTab-root': {
                                    color: 'gray'
                                }, '&.Mui-selected': {
                                    color: 'lightgray'
                                }
                            }} label="lineup" {...a11yProps(2)} />
                            <Tab sx={{
                                '&.MuiTab-root': {
                                    color: 'gray'
                                }, '&.Mui-selected': {
                                    color: 'lightgray'
                                }
                            }} label="kits" {...a11yProps(3)} />
                            <Tab sx={{
                                '&.MuiTab-root': {
                                    color: 'gray'
                                }, '&.Mui-selected': {
                                    color: 'lightgray'
                                }
                            }} label="comparison" {...a11yProps(4)} />
                            <Tab sx={{
                                '&.MuiTab-root': {
                                    color: 'gray'
                                }, '&.Mui-selected': {
                                    color: 'lightgray'
                                }
                            }} label="urls" {...a11yProps(5)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={tabValue} index={0}>
                        <div className={classes.generalInfoDiv}>
                            <div className={classes.generalInfoInsideDiv}>
                                <section className={classes.generalInfoSection}>
                                    <LocationOnIcon
                                        className={classes.generalInfoIcon}>
                                    </LocationOnIcon>
                                    <span className={classes.generalInfoSpan}>
                                        {matchDetailsData.place}
                                    </span>
                                </section>
                                <section className={classes.generalInfoSection}
                                         onClick={redirectToUrlTab}>
                                    <CalendarMonthIcon
                                        className={classes.generalInfoIcon}>
                                    </CalendarMonthIcon>
                                    <span className={classes.generalInfoSpan}>
                                        {matchDetailsData.day.replace(/-/g, '/')}
                                    </span>
                                </section>
                                <section className={classes.generalInfoSection}>
                                    <AccessTimeIcon
                                        className={classes.generalInfoIcon}>
                                    </AccessTimeIcon>
                                    <span className={classes.generalInfoSpan}>
                                        {matchDetailsData.time}
                                    </span>
                                </section>
                            </div>
                            {matchDetailsData?.weather && matchDetailsData?.oyesfc?.jersey ?
                                <div className={classes.generalInfoInsideDiv}>
                                    <section className={classes.generalInfoSection}>
                                        <CheckroomIcon
                                            className={classes.generalInfoIcon}>
                                        </CheckroomIcon>
                                        <span className={classes.generalInfoSpan}>
                                        {matchDetailsData?.oyesfc?.jersey}
                                    </span>
                                    </section>
                                    <section className={classes.generalInfoSection}>
                                        {
                                            matchDetailsData?.weather?.sky === WeatherSky[1] ?
                                                <WbSunnyIcon
                                                    className={classes.generalInfoIcon}>
                                                </WbSunnyIcon>
                                                : matchDetailsData?.weather?.sky === WeatherSky[2] ?
                                                    <ThunderstormIcon
                                                        className={classes.generalInfoIcon}>
                                                    </ThunderstormIcon>
                                                    : matchDetailsData?.weather?.sky === WeatherSky[3] ?
                                                        <AcUnitIcon
                                                            className={classes.generalInfoIcon}>
                                                        </AcUnitIcon>
                                                        : <NightlightRoundIcon
                                                            className={classes.generalInfoIcon}>
                                                        </NightlightRoundIcon>
                                        }
                                        <span className={classes.generalInfoSpan}>
                                        {matchDetailsData?.weather?.sky}
                                    </span>
                                    </section>
                                    <section className={classes.generalInfoSection}>
                                        <ThermostatIcon
                                            className={classes.generalInfoIcon}>
                                        </ThermostatIcon>
                                        <span className={classes.generalInfoSpan}>
                                        {matchDetailsData?.weather?.temperature}&#176;
                                    </span>
                                    </section>
                                </div>
                                :
                                null
                            }
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={1}>
                        <div className={classes.generalTabDiv2}>
                            <section className={classes.generalTabSection2}>
                                <div className={classes.generalInfoDiv2} onClick={redirectToUrlTab}>
                                    <LocationOnIcon
                                        className={classes.generalInfoIcon2}>
                                    </LocationOnIcon>
                                    <span className={classes.generalInfoSpan2}>
                                        {matchDetailsData.place}
                                    </span>
                                </div>
                                <div className={classes.generalInfoDiv2} onClick={redirectToUrlTab}>
                                    <CalendarMonthIcon
                                        className={classes.generalInfoIcon2}>
                                    </CalendarMonthIcon>
                                    <span className={classes.generalInfoSpan2}>
                                        {matchDetailsData.day.replace(/-/g, '/')}
                                    </span>
                                </div>
                                <div className={classes.generalInfoDiv2} onClick={redirectToUrlTab}>
                                    <AccessTimeIcon
                                        className={classes.generalInfoIcon2}>
                                    </AccessTimeIcon>
                                    <span className={classes.generalInfoSpan2}>
                                        {matchDetailsData.time}
                                    </span>
                                </div>
                                {matchDetailsData?.weather && matchDetailsData?.oyesfc?.jersey ?
                                    <>
                                        <div className={classes.generalInfoDiv2} onClick={redirectToUrlTab}>
                                            {
                                                matchDetailsData?.weather?.sky === WeatherSky[1] ?
                                                    <WbSunnyIcon
                                                        className={classes.generalInfoIcon2}>
                                                    </WbSunnyIcon>
                                                    : matchDetailsData?.weather?.sky === WeatherSky[2] ?
                                                        <ThunderstormIcon
                                                            className={classes.generalInfoIcon2}>
                                                        </ThunderstormIcon>
                                                        : matchDetailsData?.weather?.sky === WeatherSky[3] ?
                                                            <AcUnitIcon
                                                                className={classes.generalInfoIcon2}>
                                                            </AcUnitIcon>
                                                            : <NightlightRoundIcon
                                                                className={classes.generalInfoIcon2}>
                                                            </NightlightRoundIcon>
                                            }
                                            <span className={classes.generalInfoSpan2}>
                                                {matchDetailsData?.weather?.sky}
                                            </span>
                                        </div>
                                        <div className={classes.generalInfoDiv2} onClick={redirectToUrlTab}>
                                            <ThermostatIcon
                                                className={classes.generalInfoIcon2}>
                                            </ThermostatIcon>
                                            <span className={classes.generalInfoSpan2}>
                                                {matchDetailsData?.weather?.temperature}&#176;
                                            </span>
                                        </div>
                                        <div className={classes.generalInfoDiv2} onClick={redirectToKitsTab}>
                                            <CheckroomIcon
                                                className={classes.generalInfoIcon2}>
                                            </CheckroomIcon>
                                            <span className={classes.generalInfoSpan2}>
                                                {matchDetailsData?.oyesfc?.jersey}
                                            </span>
                                        </div>
                                    </>
                                    :
                                    null
                                }
                            </section>
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={2}>
                        <div className={classes.pitchStyleDiv}>
                            <SoccerLineUp
                                size={"responsive"}
                                homeTeam={oyesfcSquad}
                                color={'#404040'}
                            />
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={3}>
                        <div className={classes.kitStyleDiv}>
                            <div className={classes.kitStyleInsideDiv}>
                                <span className={classes.kitSpan}>{TeamNames.oYesFc}</span>
                                <img
                                    key={'1'}
                                    className={classes.kitImage}
                                    src={jerseyImage}
                                    alt={`1`}
                                />
                            </div>
                            <div className={classes.kitStyleInsideDiv}>
                                <span className={classes.kitSpan}>{matchDetailsData.rival.name}</span>
                                <img
                                    key={'1'}
                                    className={classes.kitImage}
                                    src={RivalKit}
                                    alt={`1`}
                                />
                            </div>
                        </div>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={4}>
                        <>
                            <RivalComparison data={data} selectedRival={matchDetailsData?.rival.name}/>
                        </>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={5}>
                        <div className={classes.generalTabDiv2}>
                        <section className={classes.generalTabSection2}>
                                <div className={classes.generalInfoDiv2}>
                                    <LocationOnIcon
                                        className={classes.generalInfoIcon2}>
                                    </LocationOnIcon>
                                    <span className={classes.generalInfoSpan2}>
                                        {matchDetailsData.place}
                                    </span>
                                </div>
                                <div className={classes.generalInfoDiv2}>
                                    <div className={classes.mapsButtonsWrapper}>
                                        <button className={classes.mapsButtons} onClick={redirectToAppleMaps}>Apple Maps</button>
                                        <button className={classes.mapsButtons} onClick={redirectToGoogleMaps}>Google Maps</button>
                                    </div>
                                </div>
                                <div className={classes.generalInfoDiv2}>
                                    <CalendarMonthIcon
                                        className={classes.generalInfoIcon2}>
                                    </CalendarMonthIcon>
                                    <span className={classes.generalInfoSpan2}>
                                        {matchDetailsData.day.replace(/-/g, '/') + ' ' + matchDetailsData.time}
                                    </span>
                                </div>
                                <div className={classes.generalInfoDiv2}>
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
                                <div className={classes.generalInfoDiv2}>
                                    {
                                        matchDetailsData?.weather?.sky === WeatherSky[1] ?
                                            <WbSunnyIcon
                                                className={classes.generalInfoIcon2}>
                                            </WbSunnyIcon>
                                            : matchDetailsData?.weather?.sky === WeatherSky[2] ?
                                                <ThunderstormIcon
                                                    className={classes.generalInfoIcon2}>
                                                </ThunderstormIcon>
                                                : matchDetailsData?.weather?.sky === WeatherSky[3] ?
                                                    <AcUnitIcon
                                                        className={classes.generalInfoIcon2}>
                                                    </AcUnitIcon>
                                                    : <NightlightRoundIcon
                                                        className={classes.generalInfoIcon2}>
                                                    </NightlightRoundIcon>
                                    }
                                    <span className={classes.generalInfoSpan2}>
                                        {matchDetailsData?.weather?.sky + ' ' + matchDetailsData?.weather?.temperature}&#176;
                                    </span>
                                </div>
                                <div className={classes.generalInfoDiv2}>
                                    <div className={classes.mapsButtonsWrapper}>
                                        <button className={classes.mapsButtons} onClick={redirectToWeatherApp}>Weather App</button>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </CustomTabPanel>
                    {
                        isMobile &&
                        <div className={classes.buttonBorderStyle}>
                            <button className={classes.buttonStyle} onClick={handleClose}>Close</button>
                        </div>
                    }
                </div>
            }
            {isCalendarModalOpen &&
                <AddToCalendarModal matchDetailsData={matchDetailsData} onClose={() => setCalendarModalOpen(false)}/>}
            {isMapsModalOpen && <MapsModal place={matchDetailsData.place} onClose={() => setMapsModalOpen(false)}/>}
        </div>
);
};
