import React, {useEffect, useRef, useState} from 'react';
import classes from './calendar.module.css'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/en-gb';
import {matchType, TeamNames} from "../../constants/constants";
import {MatchDetails} from "../MatchDetails/match-details";
import Box from "@mui/material/Box";
import BackButton from "../../shared/BackButton/back-button";
import {useSelector} from "react-redux";

const CalendarComponent = ({onClose}) => {

    const { allData, filteredData } = useSelector((state) => state.databaseData);
    const today = new Date();
    const isMobile = window.innerWidth <= 900;
    const popupRef = useRef(null);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [matchDetailsData, setMatchDetailsData] = useState(null);
    const [fixtureType, setFixtureType] = useState(null);
    moment.locale("us-US");
    let calendarEvents = [];
    Object.values(filteredData)?.forEach(match => {
        const [day, month, year] = match?.day?.split('-')
        const [startTime, endTime] = match?.time?.split('-')
        const [startHour, startMinute] = startTime?.split(':')
        const [endHour, endMinute] = endTime?.split(':')
        const event = {
            title: TeamNames.oYesFc + ' - ' + match?.rival?.name,
            start: new Date(Number(year), Number(month) - 1, Number(day), Number(startHour), Number(startMinute)),
            end: new Date(Number(year), Number(month) - 1, Number(day), Number(endHour), Number(endMinute)),
            allDay: false,
            matchId: match?.day
        };
        calendarEvents.push(event)
    })

    const localizer = momentLocalizer(moment)

    const handleSelectEvent = (event) => {
        const selectedMatch = Object.values(filteredData)?.find(x => x?.day === event?.matchId)
        setMatchDetailsData(selectedMatch)
        if (today >= event?.end) setFixtureType(matchType.previous)
        if (today >= event?.start && event?.end > today) setFixtureType(matchType.live)
        if (event?.start > today) setFixtureType(matchType.upcoming)
        setPopupOpen(true)
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
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    });

    const sortedData = Object.values(filteredData)?.slice()?.sort((a, b) => {
        if (a?.day && b?.day) {
            const [dayA, monthA, yearA] = a?.day?.split('-')?.map(Number);
            const [dayB, monthB, yearB] = b?.day?.split('-')?.map(Number);
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
    const sortedAllData = Object.values(allData)?.slice()?.sort((x, y) => {
        if (x?.day && y?.day) {
            const [dayA, monthA, yearA] = x?.day?.split('-')?.map(Number);
            const [dayB, monthB, yearB] = y?.day?.split('-')?.map(Number);
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
        const [day, month, year] = item?.day?.split('-').map(Number);
        const endTime = item?.time?.split('-')[1];
        const [hour, minute] = endTime === '00:00' ? [23, 59] : endTime?.split(':')?.map(Number);

        const eventDateTime = new Date(year, month - 1, day, hour, minute);

        return eventDateTime <= today;
    });

    const handleBack = (data) => {
        if (data) handleClose()
    }

    return (
        <>
            { !isPopupOpen && <div className={classes.overlay}>
                <div className={classes.grid} ref={popupRef}>
                    <Box sx={{display: {xs: 'flex', md: 'none'}, bgcolor: 'black'}}>
                        <BackButton handleBackButton={handleBack}/>
                    </Box>
                    <Calendar
                        localizer={localizer}
                        events={calendarEvents}
                        startAccessor="start"
                        endAccessor="end"
                        style={{height: isMobile ? '80%' : '100%', width: '100%'}}
                        onSelectEvent={handleSelectEvent}
                    />
                </div>
            </div>}
            {isPopupOpen &&
                <MatchDetails matchDetailsData={matchDetailsData}
                              onClose={() => setPopupOpen(false)}
                              fixture={fixtureType}
                              data={previousMatchesData}
                              allData={sortedAllData}/>}
        </>
    );
};

export default CalendarComponent;
