import React, {useEffect, useRef, useState} from 'react';
import classes from "./add-match.module.css";
import {dataBase, loadWebsite} from "../../firebase";
import {ref, set} from "firebase/database";
import {
    AddMatchMessages,
    Facilities,
    FootballRoles,
    Jerseys,
    openWeatherType,
    SnackbarMessages,
    SnackbarTypes,
    TeamMembers,
    TeamNames, TurkishJerseys,
    WeatherSky
} from "../../constants/constants";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LoadingPage from "../../pages/loading-page";
import matchDetailsClasses from "../MatchDetails/match-details.module.css"
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    FormControlLabel,
    Radio,
    RadioGroup,
} from "@mui/material";
import {styled} from "@mui/system";
import {getWeather} from "../../services/service";
import * as emailjs from "@emailjs/browser";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {PulseLoader} from "react-spinners";
import Box from "@mui/material/Box";
import BackButton from "../../shared/BackButton/back-button";
import MainTitle from "../../shared/MainTitle/main-title";

const AddMatchComponent = ({onClose, snackbarData, databaseData, selectedMatchData}) => {

    document.body.style.overflow = 'hidden';
    const isMobile = window.innerWidth <= 768;
    const [loading, setLoading] = useState(selectedMatchData ? null : '');
    const [calendarButtonLoading, setCalendarButtonLoading] = useState(false);
    const [emailJsButtonLoading, setEmailJsButtonLoading] = useState(false);
    const [siriShortcutButtonLoading, setSiriShortcutButtonLoading] = useState(false);
    const [weatherButtonLoading, setWeatherButtonLoading] = useState(false);
    const [warnings, setWarnings] = useState(null);
    const [finalErrors, setFinalErrors] = useState([]);
    const [finalSuccesses, setFinalSuccesses] = useState([]);
    const [weatherButtonStatus, setWeatherButtonStatus] = useState(null);
    const [submittedMatchData, setSubmittedMatchData] = useState(null);
    const allFacilities = Facilities.map(x => x.name)

    let facilities = [];
    Object.values(databaseData)?.forEach((x) => {
        if (!facilities.includes(x.place)) {
            facilities.push(x.place)
        }
    })

    const [isRakipbul, setIsRakipbul] = useState(false);
    let rivalNames = [];
    Object.values(databaseData)?.forEach((x) => {
        if (!rivalNames.includes(x.rival.name) && x.rakipbul === isRakipbul) {
            rivalNames.push(x.rival.name)
        }
    })

    const popupRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            document.body.style.overflow = 'visible';
            onClose();
        }
    };

    const initialOYesFCSquadFormData = selectedMatchData ? selectedMatchData?.oyesfc?.squad : {};

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    });

    useEffect(() => {
        if (selectedMatchData && !weatherButtonStatus) {
            const formattedDateTime = formatDateTime(selectedMatchData?.day, selectedMatchData?.time)
            checkWeatherButtons(formattedDateTime)
        }
    });

    const initialOYesFCFormData = {
        goal: selectedMatchData ? selectedMatchData?.oyesfc?.goal : 0,
        squad: initialOYesFCSquadFormData,
        jersey: selectedMatchData ? selectedMatchData?.oyesfc?.jersey : '',
    };

    const initialRivalFormData = {
        goal: selectedMatchData ? selectedMatchData?.rival?.goal : 0,
        name: selectedMatchData ? selectedMatchData?.rival?.name : '',
    };

    const initialWeatherFormData = {
        sky: selectedMatchData ? selectedMatchData?.weather?.sky : '',
        temperature: selectedMatchData ? selectedMatchData?.weather?.temperature : 0,
        weather: selectedMatchData?.weather?.weather ? selectedMatchData?.weather?.weather : '',
        feels_like: selectedMatchData?.weather?.feels_like ? selectedMatchData?.weather?.feels_like : 0,
        grnd_level: selectedMatchData?.weather?.grnd_level ? selectedMatchData?.weather?.grnd_level : 0,
        sea_level: selectedMatchData?.weather?.sea_level ? selectedMatchData?.weather?.sea_level : 0,
        humidity: selectedMatchData?.weather?.humidity ? selectedMatchData?.weather?.humidity : 0,
        description: selectedMatchData?.weather?.description ? selectedMatchData?.weather?.description : '',
        windSpeed: selectedMatchData?.weather?.windSpeed ? selectedMatchData?.weather?.windSpeed : 0,
        clouds: selectedMatchData?.weather?.clouds ? selectedMatchData?.weather?.clouds : 0,
    };

    const initialFormData = {
        day: selectedMatchData ? formatDateTime(selectedMatchData?.day, selectedMatchData?.time) : '',
        oyesfc: initialOYesFCFormData,
        place: selectedMatchData ? selectedMatchData?.place : '',
        rakipbul: selectedMatchData ? selectedMatchData?.rakipbul : false,
        showRatings: selectedMatchData ? selectedMatchData?.showRatings : 'auto',
        rival: initialRivalFormData,
        time: selectedMatchData ? selectedMatchData?.time : '',
        weather: initialWeatherFormData
    };

    const [formData, setFormData] = useState(initialFormData);
    const [rivalFormData, setRivalFormData] = useState(initialRivalFormData);
    const [oYesFCFormData, setOYesFCFormData] = useState(initialOYesFCFormData);
    const [weatherFormData, setWeatherFormData] = useState(initialWeatherFormData);
    const [oYesFCSquadFormData, setOYesFCSquadFormData] = useState(initialOYesFCSquadFormData);
    const [newSquadMember, setNewSquadMember] = useState('');

    const handleGeneralInputChange = (event) => {
        const {name, value, type, checked} = event.target;
        const inputValue = type === "checkbox" ? checked : value;
        if (type === "checkbox" && isRakipbul !== checked) {
            setIsRakipbul(checked);
        }
        if (name === 'day') checkWeatherButtons(inputValue)
        setFormData((prevData) => ({
            ...prevData,
            [name]: inputValue,
        }));
    };

    const handleShowRatingsChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleOYesFCInputChange = (event) => {
        const {name, value, type} = event.target;
        const inputValue = type === "number" ? parseInt(value) : value;
        setOYesFCFormData((prevData) => ({
            ...prevData,
            [name]: inputValue,
        }));
    };

    const handleSquadInputChange = (member, event, goal, role, description) => {
        const {name, value, type} = event.target;
        const inputValue = type === "number" ? parseInt(value) : value;
        setOYesFCSquadFormData((prevData) => ({
            ...prevData,
            [member]: {
                'goal': name.includes('goal') ? inputValue : goal,
                'role': name.includes('role') ? inputValue : role,
                'description': name.includes('description') ? inputValue : description
            },
        }));
    };

    const handleRivalInputChange = (event) => {
        const {name, value, type} = event.target;
        const inputValue = type === "number" ? parseInt(value) : value;
        setRivalFormData((prevData) => ({
            ...prevData,
            [name]: inputValue,
        }));
    };

    const handleAddSquadMember = () => {
        if (newSquadMember.trim() !== '') {
            setOYesFCSquadFormData((prevData) => ({
                ...prevData,
                [newSquadMember]: {
                    goal: 0,
                    role: (Object.values(TeamMembers).find(x => x?.name === newSquadMember)?.role || '')
                },
            }));
            setNewSquadMember('');
        }
    };

    const sendWhatsAppNotificationToSquadMembers = () => {
        try {
            setSiriShortcutButtonLoading(true)
            const data = submittedMatchData
            const formattedDate = convertMatchDayToString(data?.day)
            const encodedNames = Object.keys(data?.oyesfc?.squad)?.map(name => name.replace(/ /g, '%20'));
            const resultString = encodedNames.join('-');
            window.location.href = `shortcuts://run-shortcut?name=O%20Yes%20FC%20WhatsApp%20Notification&input=text&text=${resultString}/${formattedDate}-${data?.time?.split('-')[0]}-${data?.rival?.name}-${data?.place?.replace(/ /g, '%20')}-${TurkishJerseys[data?.oyesfc?.jersey]?.replace(/ /g, '%20')}`;
            const message = AddMatchMessages.siri_shortcut_run_successful
            setFinalSuccesses((prevData) => ([
                ...prevData,
                message
            ]));
            setSiriShortcutButtonLoading(false)
        } catch (error) {
            const errorResponse = {
                open: true,
                status: SnackbarTypes.error,
                message: error?.message,
                duration: 18000
            }
            snackbarData(errorResponse)
            const message = AddMatchMessages.siri_shortcut_run_failed
            setFinalErrors((prevData) => ([
                ...prevData,
                message
            ]));
            setSiriShortcutButtonLoading(false)
        }
    }

    const convertMatchDayToString = (matchDate) => {
        const [day, month, year] = matchDate.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        const dayName = new Intl.DateTimeFormat('tr-TR', {weekday: 'long'}).format(date);
        const monthName = new Intl.DateTimeFormat('tr-TR', {month: 'long'}).format(date);
        return `${day}%20${monthName}%20${dayName}`;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const unconvertedDay = formData?.day
        finalizeData();
        setDayTime();
        try {
            checkPayload(formData, unconvertedDay)
            setSubmittedMatchData(formData)
            if (warnings) setWarnings(null)
        } catch (error) {
            const messageResponse = {
                open: true,
                status: SnackbarTypes.error,
                message: error?.message,
                duration: 18000
            }
            snackbarData(messageResponse)
        }
    };

    const completeAddMatch = async () => {
        try {
            setLoading(true)
            await set(ref(dataBase, `matches/${submittedMatchData.day}`), submittedMatchData);
            setFormData(initialFormData);
            setNewSquadMember('');
            document.body.style.overflow = 'visible';
            setLoading(false)
            onClose()
            const messageResponse = {
                open: true,
                status: SnackbarTypes.success,
                message: selectedMatchData ? SnackbarMessages.successfully_updated : SnackbarMessages.successfully_added,
                duration: 6000
            }
            snackbarData(messageResponse)
        } catch (error) {
            setLoading(false)
            const messageResponse = {
                open: true,
                status: SnackbarTypes.error,
                message: error?.message,
                duration: 18000
            }
            snackbarData(messageResponse)
        }
    }

    const setDayTime = () => {
        const [datePart, timePart] = formData.day.split('T');

        const [year, month, day] = datePart.split('-');
        const dateFormat = `${day}-${month}-${year}`;

        const [hour, minute] = timePart.split(':');
        const timeFormat = `${hour}:${minute}`;

        const nextHour = new Date(`${year}-${month}-${day}T${hour}:${minute}`);
        nextHour.setHours(nextHour.getHours() + 1);
        const [nextHourStr, nextMinuteStr] = [nextHour.getHours(), nextHour.getMinutes()].map(num => num.toString().padStart(2, '0'));
        const nextTimeFormat = `${nextHourStr}:${nextMinuteStr}`;

        formData.day = dateFormat;
        formData.time = `${timeFormat}-${nextTimeFormat}`;
    };

    const handleClose = () => {
        document.body.style.overflow = 'visible';
        onClose();
    }

    const finalizeData = () => {
        for (const key in oYesFCSquadFormData) {
            if (oYesFCSquadFormData.hasOwnProperty(key)) {
                if (!oYesFCSquadFormData[key].hasOwnProperty('description') || !oYesFCSquadFormData[key]['description']) {
                    oYesFCSquadFormData[key]['description'] = "No description";
                }
            }
        }
        oYesFCFormData.squad = oYesFCSquadFormData;
        formData.oyesfc = oYesFCFormData;
        formData.rival = rivalFormData;
        formData.weather = weatherFormData;
    }

    function formatDateTime(day, time) {
        const [dayStr, monthStr, yearStr] = day.split('-');
        const [startTime] = time.split('-');

        return `${yearStr}-${monthStr}-${dayStr}T${startTime}`;
    }

    const createCalendar = async () => {
        setCalendarButtonLoading(true)
        let playerMails;
        const calendarData = submittedMatchData
        try {
            playerMails = await loadWebsite('firebaseUID');
            let attendees = '';
            if (playerMails) {
                const mails = Object.entries(playerMails?.mail).filter(a => Object.keys(calendarData?.oyesfc?.squad)?.includes(a[0]))
                for (let i = 0; i < mails.length; i++) {
                    if (mails[i][0] === TeamMembers.yigit.name) {
                        attendees += `ORGANIZER;CN="${mails[i][0]}";EMAIL="${mails[i][1]}":mailto:${mails[i][1]}\n`;
                        attendees += `ATTENDEE;CN="${mails[i][0]}";CUTYPE=INDIVIDUAL;EMAIL="${mails[i][1]}";PARTSTAT=ACCEPTED:mailto:${mails[i][1]}\n`;
                    } else {
                        attendees += `ATTENDEE;CN="${mails[i][0]}";CUTYPE=INDIVIDUAL;EMAIL="${mails[i][1]}":mailto:${mails[i][1]}\n`;
                    }
                }
            }
            const [day, month, year] = calendarData?.day?.split('-');
            const [startTime, endTime] = calendarData?.time?.split('-');
            const [startHour, startMinute] = startTime?.split(':');
            const [endHour, endMinute] = endTime === '00:00' ? [23, 59] : endTime?.split(':');

            const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTAMP:${new Date().toISOString().replace(/-|:|\.\d\d\d/g, "")}
DTSTART:${new Date(Number(year), Number(month) - 1, Number(day), Number(startHour), Number(startMinute)).toISOString().replace(/-|:|\.\d\d\d/g, "")}
DTEND:${new Date(Number(year), Number(month) - 1, Number(day), Number(endHour), Number(endMinute)).toISOString().replace(/-|:|\.\d\d\d/g, "")}
SUMMARY:${TeamNames.oYesFc + ' - ' + calendarData?.rival?.name}
DESCRIPTION:${'Call ' + calendarData?.place + ' Facility: ' + Facilities.find(x => x.name === calendarData?.place)?.phoneNumber}
URL;VALUE=URI:https://yigitmu9.github.io/oyesfc-react/
LOCATION:${Facilities.find(x => x.name === calendarData?.place).calendarLocation}
X-APPLE-STRUCTURED-LOCATION;${Facilities?.find(x => x?.name === calendarData?.place)?.xAppleLocation}
X-APPLE-CREATOR-IDENTITY:com.apple.mobilecal
X-APPLE-CREATOR-TEAM-IDENTITY:0000000000
${attendees}END:VEVENT
END:VCALENDAR`;

            const blob = new Blob([icsContent], {type: 'text/calendar'});
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'event.ics';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            const message = AddMatchMessages.calendar_create_successful
            setFinalSuccesses((prevData) => ([
                ...prevData,
                message
            ]));
            setCalendarButtonLoading(false)
        } catch (error) {
            const errorResponse = {
                open: true,
                status: SnackbarTypes.error,
                message: error?.message,
                duration: 18000
            }
            snackbarData(errorResponse)
            const message = AddMatchMessages.calendar_create_failed
            setFinalErrors((prevData) => [
                ...prevData,
                message
            ]);
            setCalendarButtonLoading(false)
        }
    };

    const sendEmails = async () => {
        setEmailJsButtonLoading(true)
        let playerMails;
        const calendarData = submittedMatchData
        try {
            playerMails = await loadWebsite('firebaseUID');
            const formattedDate = convertMatchDayToString(calendarData?.day)
            const emailList = Object.entries(playerMails?.mail).filter(a => Object.keys(calendarData?.oyesfc?.squad)?.includes(a[0]))
            let players = ''
            const squadList = Object.keys(calendarData?.oyesfc?.squad)
            for (let i = 0; i < squadList.length; i++) {
                players += `${squadList[i]}\n`;
            }
            const messageContent = `Gün: ${formattedDate?.replace(/%20/g, ' ')}

Saat: ${calendarData?.time}

Rakip: ${calendarData?.rival?.name}

Konum: ${calendarData?.place}

Forma: ${TurkishJerseys[calendarData?.oyesfc?.jersey]}

Kadro:
${players}
Apple Maps: ${Facilities?.find(x => x?.name === calendarData?.place)?.appleUrl}

Google Maps: ${Facilities?.find(x => x?.name === calendarData?.place)?.googleUrl}

Detaylar web sitemizde: https://yigitmu9.github.io/oyesfc-react/`;
            emailjs.init({
                publicKey: playerMails?.emailJS?.publicKey,
            });
            for (const item of emailList) {
                await emailjs.send(playerMails?.emailJS?.serviceID, playerMails?.emailJS?.templateID, {
                    to_email: item[1],
                    message: messageContent,
                    to_name: item[0]
                }).catch(() => {
                    const message = `Email could not be sent to ${item[1]}!`
                    setFinalErrors((prevData) => ([
                        ...prevData,
                        message
                    ]));
                }).then(() => {
                    const message = `Email successfully sent to ${item[1]}!`
                    setFinalSuccesses((prevData) => ([
                        ...prevData,
                        message
                    ]));
                });
            }
            const message = AddMatchMessages.email_sent_successful
            setFinalSuccesses((prevData) => ([
                ...prevData,
                message
            ]));
            setEmailJsButtonLoading(false)
        } catch (error) {
            const errorResponse = {
                open: true,
                status: SnackbarTypes.error,
                message: error?.message,
                duration: 18000
            }
            snackbarData(errorResponse)
            const message = AddMatchMessages.email_sent_failed
            setFinalErrors((prevData) => ([
                ...prevData,
                message
            ]));
            setEmailJsButtonLoading(false)
        }

    };

    const getGeoCoordinates = () => {
        const xLocation = Facilities.find(x => x.name === formData?.place).xAppleLocation
        const xLocationWithoutSpaces = xLocation.replace(/\s+/g, '');
        const match = xLocationWithoutSpaces.match(/geo:[\d.,]+/);
        return match ? match[0]?.split(':')[1] : 'Geo coordinates not found';
    };

    function capitalizeWords(str) {
        return str
            ?.split(' ')
            ?.map(word => word?.charAt(0)?.toUpperCase() + word.slice(1))
            ?.join(' ');
    }

    const handleGetOpenWeather = async (type) => {
        setWeatherButtonLoading(true)
        if (formData?.day && formData?.place) {
            const endDate = new Date(formData?.day);
            const startDate = new Date();
            const timeDifference = endDate.getTime() - startDate.getTime();
            const dayDifference = timeDifference / (1000 * 3600 * 24);
            if (dayDifference <= 5) {
                const coordinates = getGeoCoordinates();
                const [latitude, longitude] = coordinates.split(',');
                const date = new Date(formData.day.split('T')[0])
                const hour = parseInt(formData.day.split('T')[1].split(':')[0], 10);
                const roundedHour = hour >= 23 || hour <= 1 ? '00' : Math.round(hour / 3) * 3;
                if (hour >= 23) date.setDate(date.getDate() + 1);
                const finalDate = date.toISOString().split('T')[0];
                const weatherDate = finalDate + ' ' + roundedHour + ':00:00'
                const weatherResponse = await getWeather(type, latitude, longitude);
                const specificForecast = type === openWeatherType.forecast ? weatherResponse?.list?.find(forecast =>
                    forecast.dt_txt === weatherDate) : weatherResponse;
                let sunriseTimestamp;
                let sunsetTimestamp;
                let partOfDay;
                if (type === openWeatherType.forecast) {
                    sunriseTimestamp = weatherResponse?.city?.sunrise
                    sunsetTimestamp = weatherResponse?.city?.sunset
                } else {
                    sunriseTimestamp = weatherResponse?.sys?.sunrise
                    sunsetTimestamp = weatherResponse?.sys?.sunset
                }
                const specificDate = new Date(formData.day);
                const sunriseDate = new Date(sunriseTimestamp * 1000);
                if (type === openWeatherType.forecast) {
                    sunriseDate.setFullYear(specificDate.getFullYear());
                    sunriseDate.setMonth(specificDate.getMonth());
                    sunriseDate.setDate(specificDate.getDate());
                }
                const sunsetDate = new Date(sunsetTimestamp * 1000);
                if (type === openWeatherType.forecast) {
                    sunsetDate.setFullYear(specificDate.getFullYear());
                    sunsetDate.setMonth(specificDate.getMonth());
                    sunsetDate.setDate(specificDate.getDate());
                }
                if (specificDate >= sunriseDate && specificDate <= sunsetDate) {
                    partOfDay = WeatherSky[1]
                } else {
                    partOfDay = WeatherSky[0]
                }
                setWeatherFormData((prevData) => ({
                    ...prevData,
                    temperature: Number(specificForecast?.main?.temp.toFixed(0)),
                    sky: partOfDay,
                    weather: specificForecast?.weather[0]?.main,
                    feels_like: Number(specificForecast?.main?.feels_like.toFixed(0)),
                    grnd_level: specificForecast?.main?.grnd_level,
                    sea_level: specificForecast?.main?.sea_level,
                    humidity: specificForecast?.main?.humidity,
                    description: capitalizeWords(specificForecast?.weather[0]?.description),
                    windSpeed: specificForecast?.wind?.speed,
                    clouds: specificForecast?.clouds?.all,
                }));
            }
        }
        setWeatherButtonLoading(false)
    }

    const checkWeatherButtons = (dateTimeValue) => {
        let endDate = new Date(dateTimeValue)
        endDate.setHours(endDate.getHours() + 1);
        const startDate = new Date();
        const timeDifference = endDate.getTime() - startDate.getTime();
        const hourDifference = timeDifference / (1000 * 3600);
        let buttonState;
        if (hourDifference > 120) {
            buttonState = {
                button: null,
                warning: 'Match date is more than 5 days away, try again later.'
            }
        } else if (hourDifference <= 120 && hourDifference > 2) {
            buttonState = {
                button: 'forecast',
                warning: 'The match date is within 5 days, the weather forecast for the selected time can be viewed.'
            }
        } else if (hourDifference <= 2 && hourDifference >= -1) {
            buttonState = {
                button: 'current',
                warning: 'Match time is near, current weather conditions can be checked.'
            }
        } else {
            buttonState = {
                button: null,
                warning: 'At least 1 hour past match time, weather forecast cannot be checked.'
            }
        }
        setWeatherButtonStatus(buttonState)
    };

    const checkPayload = (payload, unconvertedDay) => {
        let errorMessages = [];
        if (!payload?.oyesfc?.jersey || payload?.oyesfc?.jersey === '' || payload?.oyesfc?.jersey === 'Select Jersey') {
            const message = 'Select JERSEY!'
            errorMessages.push(message)
        }
        if (!payload?.rival?.name || payload?.rival?.name === '' || payload?.rival?.name === 'Select Rival') {
            const message = 'Select RIVAL!'
            errorMessages.push(message)
        }
        if (!payload?.place || payload?.place === '' || payload?.place === 'Select Facility') {
            const message = 'Select FACILITY!'
            errorMessages.push(message)
        }
        if (Object.keys(payload?.oyesfc?.squad)?.length > 0) {
            Object.entries(payload?.oyesfc?.squad)?.forEach(x => {
                if (!(x[1]?.goal >= 0)) {
                    const message = `${x[0]} missing GOAL value!`
                    errorMessages.push(message)
                }
                if (!x[1]?.role || x[1]?.role === 'Select Role' || x[1]?.role === '') {
                    const message = `${x[0]} missing ROLE value!`
                    errorMessages.push(message)
                }
                if (!Object.values(TeamMembers).map(x => x.name).includes(x[0]) && !x[1]?.description) {
                    const message = `${x[0]} missing DESCRIPTION value!`
                    errorMessages.push(message)
                }
            })
            let totalGoal = 0;
            Object.values(payload?.oyesfc?.squad)?.forEach(x => {
                totalGoal += x?.goal
            })
            if (payload?.oyesfc?.goal !== totalGoal) {
                const message = `The total number of goals of the players is not equal with the team goal!`
                errorMessages.push(message)
            }
        } else {
            const message = 'There is no one in the SQUAD!'
            errorMessages.push(message)
        }
        if (errorMessages?.length > 0) {
            formData.day = unconvertedDay
            setWarnings(errorMessages)
            throw new Error('There are missing data in this form, please check the warnings!');
        }
    };
    const clearSubmittedMatchData = () => {
        const [day, month, year] = submittedMatchData?.day?.split('-')
        const time = submittedMatchData?.time?.split('-')[0]
        formData.day = year + '-' + month + '-' + day + 'T' + time
        if (finalSuccesses?.length > 0) setFinalSuccesses([])
        if (finalErrors?.length > 0) setFinalErrors([])
        setSubmittedMatchData(null)
    }

    const BpIcon = styled('span')(({theme}) => ({
        borderRadius: '50%',
        width: 20,
        height: 20,
        boxShadow:
            theme.palette.mode === 'dark'
                ? '0 0 0 1px rgb(16 22 26 / 40%)'
                : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
        backgroundImage:
            theme.palette.mode === 'dark'
                ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
                : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
        '.Mui-focusVisible &': {
            outline: '2px auto rgba(19,124,189,.6)',
            outlineOffset: 2,
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background:
                theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
            color: 'gray'
        },
    }));

    const BpCheckedIcon = styled(BpIcon)({
        backgroundColor: 'darkred',
        color: 'red',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&::before': {
            display: 'block',
            width: 20,
            height: 20,
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
    });

    const handleBack = (data) => {
        if (data) handleClose()
    }

    function BpRadio(props) {
        return (
            <Radio
                disableRipple
                color="default"
                checkedIcon={<BpCheckedIcon/>}
                icon={<BpIcon/>}
                {...props}
            />
        );
    }

    if (loading) {
        return (
            <div className={classes.overlay}>
                <div className={classes.generalStyle} ref={popupRef}>
                    <LoadingPage/>
                </div>
            </div>
        )
    }

    if (submittedMatchData) {
        return (
            <div className={classes.overlay}>
                <div className={classes.generalStyle} ref={popupRef}>
                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                        <BackButton handleBackButton={handleBack}/>
                    </Box>
                    <div className={classes.completeProcessDiv}>
                        <div className={classes.generalTitle}>
                            <MainTitle title={'Complete'}/>
                        </div>
                        <div className={classes.matchSubmitModalDiv}>
                            <Accordion sx={{
                                bgcolor: '#2e2e2e',
                                color: 'lightgray',
                                border: '1px solid #4d4d4d',
                                width: '100%'
                            }}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon sx={{color: 'lightgray'}}/>}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    Match Payload
                                </AccordionSummary>
                                <AccordionDetails sx={{textAlign: 'left'}}>
                                    {<pre>{JSON.stringify(submittedMatchData, null, 2)}</pre>}
                                </AccordionDetails>
                            </Accordion>
                        </div>
                        {
                            finalErrors?.length > 0 &&
                            finalErrors?.map((x, y) => (
                                <Alert key={y}
                                       sx={{padding: '2px 13px', margin: '10px 20px', borderRadius: '25px'}}
                                       variant="filled" severity="error">{x}</Alert>
                            ))

                        }
                        {
                            finalSuccesses?.length > 0 &&
                            finalSuccesses?.map((x, y) => (
                                <Alert key={y}
                                       sx={{padding: '2px 13px', margin: '10px 20px', borderRadius: '25px'}}
                                       variant="filled" severity="success">{x}</Alert>
                            ))

                        }
                        <div className={classes.matchSubmitModalDiv}>
                            <button className={matchDetailsClasses.mapsButtons} style={{margin: "1rem", width: '100%'}}
                                    disabled={calendarButtonLoading || emailJsButtonLoading || siriShortcutButtonLoading}
                                    onClick={clearSubmittedMatchData}>
                                Back
                            </button>
                            <button className={matchDetailsClasses.mapsButtons} style={{margin: "1rem", width: '100%'}}
                                    disabled={calendarButtonLoading || emailJsButtonLoading || siriShortcutButtonLoading}
                                    onClick={handleClose}>
                                Cancel
                            </button>
                            {
                                !selectedMatchData && !finalSuccesses?.includes(AddMatchMessages.calendar_create_successful) &&
                                <button className={matchDetailsClasses.mapsButtons}
                                        style={{margin: "1rem", width: '100%'}}
                                        disabled={calendarButtonLoading || emailJsButtonLoading || siriShortcutButtonLoading}
                                        onClick={createCalendar}>
                                    {
                                        calendarButtonLoading ?
                                            <PulseLoader color="red" speedMultiplier={0.7}/>
                                            :
                                            <span>Create Calendar Event</span>
                                    }
                                </button>
                            }
                            {
                                !selectedMatchData && !finalSuccesses?.includes(AddMatchMessages.email_sent_successful) &&
                                <button className={matchDetailsClasses.mapsButtons}
                                        style={{margin: "1rem", width: '100%'}}
                                        disabled={calendarButtonLoading || emailJsButtonLoading || siriShortcutButtonLoading}
                                        onClick={sendEmails}>
                                    {
                                        emailJsButtonLoading ?
                                            <PulseLoader color="red" speedMultiplier={0.7}/>
                                            :
                                            <span>Send Emails</span>
                                    }
                                </button>
                            }

                            {
                                !selectedMatchData && !finalSuccesses?.includes(AddMatchMessages.siri_shortcut_run_successful) &&
                                <button className={matchDetailsClasses.mapsButtons}
                                        style={{margin: "1rem", width: '100%'}}
                                        disabled={calendarButtonLoading || emailJsButtonLoading || siriShortcutButtonLoading}
                                        onClick={sendWhatsAppNotificationToSquadMembers}>
                                    {
                                        siriShortcutButtonLoading ?
                                            <PulseLoader color="red" speedMultiplier={0.7}/>
                                            :
                                            <span>Run Siri Shortcut</span>
                                    }
                                </button>
                            }
                            <button className={matchDetailsClasses.mapsButtons} style={{margin: "1rem", width: '100%'}}
                                    disabled={calendarButtonLoading || emailJsButtonLoading || siriShortcutButtonLoading}
                                    onClick={completeAddMatch}>
                                Submit & Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={classes.overlay}>
            <div className={classes.generalStyle} ref={popupRef}>
                <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                    <BackButton handleBackButton={handleBack}/>
                </Box>
            <form onSubmit={handleSubmit}>
                    <div className={classes.formAlign}>
                        <div className={classes.infoAlign}>
                            <div className={classes.generalTitle}>
                                <MainTitle title={selectedMatchData ? 'Edit Match' : 'Add Match'}/>
                            </div>
                            <label className={classes.matchTypeTitle}>
                                Select Match Type:
                            </label>
                            <label className={classes.customCheckbox}>
                                Rakipbul
                                <input
                                    type="checkbox"
                                    name="rakipbul"
                                    checked={formData.rakipbul}
                                    onChange={handleGeneralInputChange}
                                />
                                <span className={classes.checkmark}></span>
                            </label>
                            <br/>
                            {

                                <>
                                    <label className={classes.matchTypeTitle}>
                                        Show Player Ratings:
                                    </label>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="showRatings" value={formData.showRatings}
                                    >
                                        <FormControlLabel value="enable" control={<BpRadio/>} label="Enable"
                                                          onChange={handleShowRatingsChange}/>
                                        <FormControlLabel value="auto" control={<BpRadio/>} label="Auto"
                                                          onChange={handleShowRatingsChange}/>
                                        <FormControlLabel value="disable" control={<BpRadio/>} label="Disable"
                                                          onChange={handleShowRatingsChange}/>
                                    </RadioGroup>
                                    <br/>
                                </>
                            }
                            <label>
                                Select a Rival:
                                <select className={classes.select}
                                        onChange={handleRivalInputChange}
                                        required={true}
                                        name="name"
                                        value={rivalFormData.name}>
                                    <option value={'New Rival'}>New Rival</option>
                                    {rivalNames.sort().map((x, y) => (
                                        <option key={y} value={x}>{x}</option>
                                    ))}
                                </select>
                            </label>
                            <br/>
                            <label>
                                Rival Name:
                                <input
                                    className={classes.inputDesign}
                                    required={true}
                                    type="text"
                                    name="name"
                                    value={rivalFormData.name}
                                    onChange={handleRivalInputChange}
                                />
                            </label>
                            <br/>
                            <label style={{width: "100%", minWidth: "100%"}}>
                                Day & Time:
                                <input
                                    style={{width: "100%", minWidth: "100%"}}
                                    className={classes.dayTimeDesign}
                                    required={true}
                                    type="datetime-local"
                                    name="day"
                                    value={formData.day}
                                    onChange={handleGeneralInputChange}
                                />
                            </label>
                            <br/>
                            <label>
                                Select a Facility:
                                <select className={classes.select}
                                        onChange={handleGeneralInputChange}
                                        required={true}
                                        name="place"
                                        value={formData.place}>
                                    <option value={'New Facility'}>New Facility</option>
                                    {allFacilities.sort().map((x, y) => (
                                        <option key={y} value={x}>{x}</option>
                                    ))}
                                </select>
                            </label>
                            <br/>
                            <label>
                                Place:
                                <input
                                    className={classes.inputDesign}
                                    required={true}
                                    type="text"
                                    name="place"
                                    value={formData.place}
                                    onChange={handleGeneralInputChange}
                                />
                            </label>
                            <br/>
                            <label>
                                Get Weather from Api:
                                {
                                    weatherButtonStatus?.button &&
                                    <div className={classes.weatherButtonDiv}>
                                        {
                                            weatherButtonStatus?.button === 'current' &&
                                            <div className={matchDetailsClasses.mapsButtons}
                                                 onClick={() => handleGetOpenWeather(openWeatherType.weather)}>
                                                {
                                                    weatherButtonLoading ?
                                                        <PulseLoader color="red" speedMultiplier={0.7}/>
                                                        :
                                                        <span>Current</span>
                                                }
                                            </div>
                                        }
                                        {
                                            weatherButtonStatus?.button === 'forecast' &&
                                            <div className={matchDetailsClasses.mapsButtons}
                                                 onClick={() => handleGetOpenWeather(openWeatherType.forecast)}>
                                                {
                                                    weatherButtonLoading ?
                                                        <PulseLoader color="red" speedMultiplier={0.7}/>
                                                        :
                                                        <span>Selected Date</span>
                                                }
                                            </div>
                                        }
                                    </div>
                                }
                            </label>
                            <br/>
                            {
                                weatherButtonStatus?.warning &&
                                <Alert
                                    sx={{bgcolor: 'transparent', color: 'lightgray', padding: 0, marginBottom: '20px'}}
                                    variant="standard" severity="info">{weatherButtonStatus?.warning}</Alert>
                            }
                            <>
                                <label>
                                    Weather: {weatherFormData?.weather}
                                </label>
                                <br/>
                                <label>
                                    Temperature: {weatherFormData?.temperature}&#176;
                                </label>
                                <br/>
                                <label>
                                    Feels Like: {weatherFormData?.feels_like}&#176;
                                </label>
                                <br/>
                                <label>
                                    Ground Level Pressure: {weatherFormData?.grnd_level} hPa
                                </label>
                                <br/>
                                <label>
                                    Sea Level Pressure: {weatherFormData?.sea_level} hPa
                                </label>
                                <br/>
                                <label>
                                    Humidity: {weatherFormData?.humidity} %
                                </label>
                                <br/>
                                <label>
                                    Description: {weatherFormData?.description}
                                </label>
                                <br/>
                                <label>
                                    Wind Speed: {weatherFormData?.windSpeed} km/h
                                </label>
                                <br/>
                                <label>
                                    Clouds: {weatherFormData?.clouds} %
                                </label>
                                <br/>
                                <label>
                                    Sky: {weatherFormData?.sky}
                                </label>
                                <br/>
                            </>
                            <label>
                                O Yes FC Jersey:
                                <select className={classes.select}
                                        onChange={handleOYesFCInputChange}
                                        required={true}
                                        name="jersey"
                                        value={oYesFCFormData.jersey}>
                                    <option>Select Jersey</option>
                                    {Jerseys.map((x, y) => (
                                        <option key={y} value={x}>{x}</option>
                                    ))}
                                </select>
                            </label>
                            <br/>
                            <label>
                                O Yes FC Goal:
                                <input
                                    className={classes.inputDesign}
                                    required={true}
                                    type="number"
                                    name="goal"
                                    value={oYesFCFormData.goal}
                                    onChange={handleOYesFCInputChange}
                                />
                            </label>
                            <br/>
                            <label>
                                Rival Goal:
                                <input
                                    className={classes.inputDesign}
                                    required={true}
                                    type="number"
                                    name="goal"
                                    value={rivalFormData.goal}
                                    onChange={handleRivalInputChange}
                                />
                            </label>
                            <br/>
                        </div>
                        <div className={classes.playersAlign}>
                            {Object.keys(oYesFCSquadFormData).map((member) => (
                                <div key={member}>
                                    <label>
                                        {member} Goal:
                                        <input
                                            className={classes.inputDesign}
                                            type="number"
                                            name={`oyesfc.squad.${member}.goal`}
                                            value={oYesFCSquadFormData[member].goal}
                                            onChange={(e) =>
                                                handleSquadInputChange(member, e, oYesFCSquadFormData[member]?.goal, oYesFCSquadFormData[member]?.role, oYesFCSquadFormData[member]?.description)}
                                        />
                                    </label>
                                    <br/>
                                    <label>
                                        {member} Role:
                                        <select className={classes.select}
                                                onChange={(e) =>
                                                    handleSquadInputChange(member, e, oYesFCSquadFormData[member]?.goal, oYesFCSquadFormData[member]?.role, oYesFCSquadFormData[member]?.description)}
                                                required={true}
                                                name={`oyesfc.squad.${member}.role`}
                                                value={oYesFCSquadFormData[member].role ? oYesFCSquadFormData[member].role : (Object.values(TeamMembers).find(x => x?.name === member)?.role || oYesFCSquadFormData[member].role)}>
                                            <option>Select Role</option>
                                            {FootballRoles.map((x, y) => (
                                                <option key={y} value={x}>{x}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <br/>
                                    {!Object.values(TeamMembers).some(x => x?.name === member) &&
                                        <>
                                            <label>
                                                {member} Description:
                                                <input
                                                    className={classes.inputDesign}
                                                    type="text"
                                                    name={`oyesfc.squad.${member}.description`}
                                                    value={oYesFCSquadFormData[member].description}
                                                    onChange={(e) =>
                                                        handleSquadInputChange(member, e, oYesFCSquadFormData[member]?.goal, oYesFCSquadFormData[member]?.role, oYesFCSquadFormData[member]?.description)}
                                                />
                                            </label>
                                            <br/>
                                        </>
                                    }
                                </div>
                            ))}
                            <label>
                                Select Player:
                                <select className={classes.select}
                                        onChange={(e) =>
                                            setNewSquadMember(e.target.value !== 'None' ? e.target.value : '')}
                                        value={newSquadMember}>
                                    <option>New Player</option>
                                    {Object.values(TeamMembers).map((x, y) => (
                                        <option key={y} value={x.name}>{x.name}</option>
                                    ))}
                                </select>
                            </label>
                            <br/>
                            <label>
                                Add Squad Member:
                                <input
                                    className={classes.inputDesign}
                                    type="text"
                                    value={newSquadMember}
                                    onChange={(e) => setNewSquadMember(e.target.value)}
                                />
                                <div className={classes.addPlayerButtonDiv}>
                                    <div className={matchDetailsClasses.mapsButtons} onClick={handleAddSquadMember}>
                                        <PersonAddAlt1Icon className={classes.iconStyle}></PersonAddAlt1Icon>
                                    </div>
                                </div>
                            </label>
                            <br/>
                        </div>
                    </div>
                    {
                        warnings &&
                        warnings?.map((x, y) => (
                            <Alert key={y}
                                   sx={{bgcolor: 'transparent', color: '#ed6c02', padding: 0, marginBottom: '20px'}}
                                   variant="standard" severity="warning">{x}</Alert>
                        ))

                    }
                    <div className={classes.matchSubmitButtonDiv}>
                        <button className={matchDetailsClasses.mapsButtons} style={{marginRight: "1rem"}}
                                type="submit">Submit
                        </button>
                    </div>
                <Box sx={{display: {xs: 'block', md: 'none'}, height: '110px'}}></Box>
                </form>
            </div>
        </div>

    );
};

export default AddMatchComponent;
