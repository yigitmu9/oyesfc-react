import React from 'react';
import classes from "../MatchDetails/match-details.module.css";
import {Divider} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import {AddToCalendarButton} from "add-to-calendar-button-react";
import EditIcon from "@mui/icons-material/Edit";
import {Facilities} from "../../constants/constants";

const LinksTab = ({matchDetailsData, weatherIcons, editMatch, credentials, fixture}) => {

    const isMobile = window.innerWidth <= 768;
    const formattedDateForCalendar = formatDate(matchDetailsData.day);
    const rivalForCalendar = 'Rakip: ' + matchDetailsData.rival.name;
    const startTimeForCalendar = getStartTime(matchDetailsData.time);
    const endTimeForCalendar = getEndTime(matchDetailsData.time) === '00:00' ? '23:59' : getEndTime(matchDetailsData.time);

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

    const redirectToEditMatch = () => {
        editMatch(true)
    };

    return (
        <>
            <div className={classes.generalTabDiv}>
                <section className={classes.generalTabSection}>
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
                <section className={classes.generalTabSection}>
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
                <section className={classes.generalTabSection}>
                    <div className={classes.urlInfoDiv}>
                        {weatherIcons}
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
                    <section className={classes.generalTabSection}>
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
                                <button className={classes.mapsButtons} onClick={redirectToEditMatch}>Edit
                                </button>
                            </div>
                        </div>
                    </section>
                }
            </div>
        </>
    );
};

export default LinksTab;