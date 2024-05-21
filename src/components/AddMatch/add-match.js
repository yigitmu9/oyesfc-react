import React, {useEffect, useRef, useState} from 'react';
import classes from "./add-match.module.css";
import {dataBase, loadWebsite} from "../../firebase";
import {ref, set} from "firebase/database";
import {
    Facilities,
    FootballRoles,
    Jerseys,
    openWeatherType,
    TeamMembers,
    TeamNames,
    WeatherSky
} from "../../constants/constants";
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import LoadingPage from "../../pages/loading-page";
import matchDetailsClasses from "../MatchDetails/match-details.module.css"
import {FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {styled} from "@mui/system";
import {getWeather} from "../../services/service";

const AddMatchComponent = ({onClose, openMessage, messageData, databaseData, selectedMatchData}) => {

    document.body.style.overflow = 'hidden';
    const isMobile = window.innerWidth <= 768;
    const [loading, setLoading] = useState(false);
    const allFacilities = Facilities.map(x => x.name)

    let facilities = [];
    Object.values(databaseData)?.forEach((x) => {
        if (!facilities.includes(x.place)) {
            facilities.push(x.place)
        }
    } )

    const [isRakipbul, setIsRakipbul] = useState(false);
    let rivalNames = [];
    Object.values(databaseData)?.forEach((x) => {
        if (!rivalNames.includes(x.rival.name) && x.rakipbul === isRakipbul) {
            rivalNames.push(x.rival.name)
        }
    } )

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

    const handleSquadInputChange = (member, event, goal, role) => {
        const {name, value, type} = event.target;
        const inputValue = type === "number" ? parseInt(value) : value;
        setOYesFCSquadFormData((prevData) => ({
            ...prevData,
            [member]: {
                'goal': name.includes('goal') ? inputValue : goal,
                'role': name.includes('role') ? inputValue : role
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
                },
            }));
            setNewSquadMember('');
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        finalizeData();
        setDayTime();
        try {
            setLoading(true)
            await set(ref(dataBase, `matches/${formData.day}`), formData);
            const calendarData = formData
            setFormData(initialFormData);
            setNewSquadMember('');
            document.body.style.overflow = 'visible';
            setLoading(false)
            onClose()
            if (!selectedMatchData) await createCalendar(calendarData)
            const messageResponse = {
                isValid: true,
                message: selectedMatchData ? 'Match successfully updated.' : 'Match successfully added.'
            }
            messageData(messageResponse)
            openMessage(true)
        } catch (error) {
            console.log(error)
            document.body.style.overflow = 'visible';
            onClose()
            const messageResponse = {
                isValid: false,
                message: error?.message === 'PERMISSION_DENIED: Permission denied' ?
                    'This user does not have permission to add match!' :
                    'An error occurred!'
            }
            messageData(messageResponse)
            openMessage(true)
        }
    };

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

    const createCalendar = async (calendarData) => {
        let playerMails;
        try {
            playerMails = await loadWebsite('firebaseUID');
        } catch (error) {
            console.log(error)
        }
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

    }

    const BpIcon = styled('span')(({ theme }) => ({
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

    function BpRadio(props) {
        return (
            <Radio
                disableRipple
                color="default"
                checkedIcon={<BpCheckedIcon />}
                icon={<BpIcon />}
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

    return (
        <div className={classes.overlay}>
            <div className={classes.generalStyle} ref={popupRef}>
                <form onSubmit={handleSubmit} style={{background: "#1f1f1f"}}>
                    <div className={classes.formAlign}>
                        <div className={classes.infoAlign}>
                            <h1 className={classes.generalTitle}>{selectedMatchData ? 'Edit Match' : 'Add Match'}</h1>
                            <label className={classes.matchTypeTitle}>
                                Select Match Type:
                            </label>
                            <label style={{background: "#1f1f1f"}} className={classes.customCheckbox}>
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
                            <label style={{background: "#1f1f1f"}}>
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
                            <label style={{background: "#1f1f1f"}}>
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
                            <label style={{background: "#1f1f1f", width: "100%", minWidth: "100%"}}>
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
                            <label style={{background: "#1f1f1f"}}>
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
                            <label style={{background: "#1f1f1f"}}>
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
                            <label style={{background: "#1f1f1f"}}>
                                Get Weather from Api:
                                <div className={classes.weatherButtonDiv}>
                                    <div className={matchDetailsClasses.mapsButtons} onClick={() => handleGetOpenWeather(openWeatherType.weather)}>
                                        Current
                                    </div>
                                    <div className={matchDetailsClasses.mapsButtons} onClick={() => handleGetOpenWeather(openWeatherType.forecast)}>
                                        Selected Date
                                    </div>
                                </div>
                            </label>
                            <br/>
                            <>
                                <label style={{background: "#1f1f1f"}}>
                                    Weather: {weatherFormData?.weather}
                                </label>
                                <br/>
                                <label style={{background: "#1f1f1f"}}>
                                    Temperature: {weatherFormData?.temperature}&#176;
                                </label>
                                <br/>
                                <label style={{background: "#1f1f1f"}}>
                                    Feels Like: {weatherFormData?.feels_like}&#176;
                                </label>
                                <br/>
                                <label style={{background: "#1f1f1f"}}>
                                    Ground Level Pressure: {weatherFormData?.grnd_level} hPa
                                </label>
                                <br/>
                                <label style={{background: "#1f1f1f"}}>
                                    Sea Level Pressure: {weatherFormData?.sea_level} hPa
                                </label>
                                <br/>
                                <label style={{background: "#1f1f1f"}}>
                                    Humidity: {weatherFormData?.humidity} %
                                </label>
                                <br/>
                                <label style={{background: "#1f1f1f"}}>
                                    Description: {weatherFormData?.description}
                                </label>
                                <br/>
                                <label style={{background: "#1f1f1f"}}>
                                    Wind Speed: {weatherFormData?.windSpeed} km/h
                                </label>
                                <br/>
                                <label style={{background: "#1f1f1f"}}>
                                    Clouds: {weatherFormData?.clouds} %
                                </label>
                                <br/>
                                <label style={{background: "#1f1f1f"}}>
                                    Sky: {weatherFormData?.sky}
                                </label>
                                <br/>
                            </>
                            <label style={{background: "#1f1f1f"}}>
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
                            <label style={{background: "#1f1f1f"}}>
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
                            <label style={{background: "#1f1f1f"}}>
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
                                <div key={member} style={{background: "#1f1f1f"}}>
                                    <label style={{background: "#1f1f1f"}}>
                                        {member} Goal:
                                        <input
                                            className={classes.inputDesign}
                                            type="number"
                                            name={`oyesfc.squad.${member}.goal`}
                                            value={oYesFCSquadFormData[member].goal}
                                            onChange={(e) =>
                                                handleSquadInputChange(member, e, oYesFCSquadFormData[member]?.goal, oYesFCSquadFormData[member]?.role)}
                                        />
                                    </label>
                                    <br/>
                                    <label style={{background: "#1f1f1f"}}>
                                        {member} Role:
                                        <select className={classes.select}
                                                onChange={(e) =>
                                                    handleSquadInputChange(member, e, oYesFCSquadFormData[member]?.goal, oYesFCSquadFormData[member]?.role)}
                                                required={true}
                                                name={`oyesfc.squad.${member}.role`}
                                                value={oYesFCSquadFormData[member].role ? oYesFCSquadFormData[member].role : (Object.values(TeamMembers).find(x => x?.name === member)?.role || oYesFCSquadFormData[member].role) }>
                                            <option>Select Role</option>
                                            {FootballRoles.map((x, y) => (
                                                <option key={y} value={x}>{x}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <br/>
                                </div>
                            ))}
                            <label style={{background: "#1f1f1f"}}>
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
                            <label style={{background: "#1f1f1f"}}>
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
                    <div className={classes.matchSubmitButtonDiv}>
                        <button className={matchDetailsClasses.mapsButtons} style={{marginRight: "1rem"}} type="submit">Submit
                        </button>
                        {isMobile && <button className={matchDetailsClasses.mapsButtons} onClick={handleClose}>Close</button>}
                    </div>
                </form>
            </div>
        </div>

    );
};

export default AddMatchComponent;
