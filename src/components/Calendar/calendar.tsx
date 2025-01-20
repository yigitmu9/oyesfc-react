import React from 'react';
import classes from './calendar.module.css';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/en-gb';
import { TeamNames } from '../../constants/constants';
import BackButton from '../../shared/BackButton/back-button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

const CalendarComponent = () => {
    const { filteredData } = useSelector((state: any) => state.databaseData);
    const navigate = useNavigate();
    moment.locale('us-US');
    let calendarEvents: any = [];
    Object.values(filteredData)?.forEach((match: any) => {
        const [day, month, year] = match?.day?.split('-');
        const [startTime, endTime] = match?.time?.split('-');
        const [startHour, startMinute] = startTime?.split(':');
        const [endHour, endMinute] = endTime?.split(':');
        const event = {
            title: TeamNames.oYesFc + ' - ' + match?.rival?.name,
            start: new Date(Number(year), Number(month) - 1, Number(day), Number(startHour), Number(startMinute)),
            end: new Date(Number(year), Number(month) - 1, Number(day), Number(endHour), Number(endMinute)),
            allDay: false,
            matchId: match?.day,
        };
        calendarEvents.push(event);
    });

    const localizer = momentLocalizer(moment);

    const handleSelectEvent = (event?: any) => {
        const selectedMatch: any = Object.values(filteredData)?.find((x: any) => x?.day === event?.matchId);
        navigate('/oyesfc-react/match-details', {
            state: { day: selectedMatch?.day, cameFrom: 'calendar' },
        });
    };

    const handleBack = (data?: any) => {
        if (data) {
            navigate('/oyesfc-react/account');
        }
    };

    return (
        <>
            <BackButton handleBackButton={handleBack} generalTitle={'Calendar'} />
            <Box sx={{ display: { xs: 'flex', md: 'none' }, height: '30px' }}></Box>
            {
                <div>
                    <div className={classes.grid}>
                        <Calendar
                            localizer={localizer}
                            events={calendarEvents}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: '100%', width: '100%' }}
                            onSelectEvent={handleSelectEvent}
                        />
                    </div>
                </div>
            }
        </>
    );
};

export default CalendarComponent;
