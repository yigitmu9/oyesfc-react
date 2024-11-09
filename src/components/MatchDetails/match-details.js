import React, {useEffect, useState} from 'react';
import classes from "./match-details.module.css"
import TeamView from "../TeamView/team-view";
import Result from "../Result/result";
import FootballLogo from '../../images/football.png';
import GameStatus from "../GameStatus/game-status";
import {
    Facilities,
    matchType,
    openWeatherType,
    TeamMembers,
    WeatherSky
} from "../../constants/constants";
import Box from "@mui/material/Box";
import {Alert, Divider, Tab, Tabs} from "@mui/material";
import PropTypes from "prop-types";
import RivalComparison from "../RivalComparison/rival-comparison";
import {ref, set} from "firebase/database";
import {dataBase, loadWebsite} from "../../firebase";
import PreviewTab from "../PreviewTab/preview-tab";
import SquadTab from "../SquadTab/squad-tab";
import {getWeather} from "../../services/service";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import HighlightsTab from "../HighlightsTab/highlights-tab";
import BackButton from "../../shared/BackButton/back-button";
import {useSelector} from "react-redux";
import {findMatchType, sortData} from "../../utils/utils";
import EditIcon from "@mui/icons-material/Edit";
import {useNavigate} from "react-router-dom";
import accountClasses from "../AccountGrid/account-grid.module.css";
import navbarClasses from "../Navbar/navbar.module.css";

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
                    <>{children}</>
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

export const MatchDetails = ({matchDate, cameFrom}) => {

    const { allData } = useSelector((state) => state.databaseData);
    const { userName, id, signedIn, isCaptain } = useSelector((state) => state.credentials);
    const matchDetailsData = Object.values(allData).find(x => x.day === matchDate)
    const sortedAllData = sortData(allData);
    const fixture = findMatchType(matchDetailsData)
    const hourDifference = () => {
        const [day, month, year] = matchDetailsData.day.split('-');
        const time = matchDetailsData.time.split('-');
        const endTime = time[1] === '00:00' ? '23:59' : time[1]
        const [hour, minute] = endTime.split(':');
        const inputDateTime = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
        const now = new Date();
        return (now - inputDateTime) / (1000 * 60 * 60)
    };

    const checkButton = () => {
        const differenceInHours = hourDifference()
        if (differenceInHours >= 48 || !Object.keys(matchDetailsData?.oyesfc?.squad)?.includes(userName)) {
            return 'Not Available'
        }
        return 'Submit'
    };

    const initialOYesFCStarFormData = {};
    const [ratesData, setRatesData] = useState(null);
    const isMobile = window.innerWidth <= 768;
    const buttonBgColor = '#1C1C1E'
    const oyesfcMembers = Object.values(TeamMembers).map(x => x.name)
    const matchDetails = Object.entries(matchDetailsData?.oyesfc?.squad)?.filter(x => x[1].goal > 0)
    const [tabValue, setTabValue] = React.useState(0);
    const matchIndex = Object.values(sortedAllData).findIndex(x => x === matchDetailsData)
    const [oYesFCStarFormData, setOYesFCStarFormData] = useState(initialOYesFCStarFormData);
    const [starsErrorMessage, setStarsErrorMessage] = useState(null);
    const [notesErrorMessage, setNotesErrorMessage] = useState(null);
    const [starsSubmitButton, setStarsSubmitButton] = useState(checkButton());
    const [notesTitle, setNotesTitle] = useState('Add your note:');
    const [matchNotes, setMatchNotes] = useState(null);
    const [noteFormData, setNoteFormData] = useState({});
    const [squadRatings, setSquadRatings] = useState(null);
    const [bestOfMatch, setBestOfMatch] = useState(null);
    const [ratedPeople, setRatedPeople] = useState(null);
    const [weatherData, setWeatherData] = useState(null);
    const navigate = useNavigate()

    const handleTabChange = (event, newTabValue) => {
        setTabValue(newTabValue);
    };

    useEffect(() => {
        if (!ratesData) {
            fetchRatesData().then(r => r)
        }
        if (!matchNotes) {
            fetchNotesData().then(r => r)
        }
        if (!weatherData && fixture !== matchType.previous) {
            getOpenWeather().then(r => r)
        }
    });


    const redirectToTab = (tabIndex) => {
        setTabValue(tabIndex)
    }

    const handleStarChange = (player, rating) => {
        if (starsSubmitButton === 'Submit') {
            setOYesFCStarFormData((prevData) => ({
                ...prevData,
                [player]: parseInt(rating)
            }));
        }
    };

    const handleStarDetailChange = (player, operation) => {
        const playerRating = oYesFCStarFormData[player]
        if (playerRating &&
            ((playerRating !== 1 && operation === 'minus') || (playerRating !== 10 && operation === 'plus')) &&
            starsSubmitButton === 'Submit') {
            const newRating = operation === 'plus' ? parseFloat((playerRating + 0.1).toFixed(1)) :
                parseFloat((playerRating - 0.1).toFixed(1));
            setOYesFCStarFormData((prevData) => ({
                ...prevData,
                [player]: newRating
            }));
        }
    };

    const editMatch = () => {
        navigate('/oyesfc-react/add-match', {state: matchDetailsData})
    }

    const submitStars = async () => {
        if (Object.keys(oYesFCStarFormData).length === (Object.entries(matchDetailsData.oyesfc.squad).length - 1)) {
            if (starsErrorMessage) setStarsErrorMessage(null)
            try {
                await set(ref(dataBase, `rates/${matchDetailsData?.day}/rates/${id}`), oYesFCStarFormData);
                setStarsSubmitButton('Submitted')
            } catch (error) {
                setStarsErrorMessage(error?.message)
            }
        } else {
            setStarsErrorMessage('Rate everyone!')
        }
    };

    const fetchRatesData = async () => {
        try {
            const response = await loadWebsite(`rates/${matchDetailsData?.day}`);
            setRatesData(response)
            if (signedIn) {
                const ratedOrNot = await whoRatedWhoNotRated(response)
                setRatedPeople(ratedOrNot)
            }
            if (response?.rates) {
                if (Object.entries(response?.rates).some(x => x[0] === id)) {
                    const form = Object.entries(response?.rates).find(x => x[0] === id)[1]
                    setOYesFCStarFormData(form)
                    setStarsSubmitButton('Submitted')
                }
                const oyesfcMemberLengthOfThisMatch = Object.keys(matchDetailsData?.oyesfc?.squad)?.filter(a => oyesfcMembers?.includes(a))?.length
                if ((Object.entries(response?.rates)?.length >= oyesfcMemberLengthOfThisMatch || matchDetailsData?.showRatings === 'enable' || (Object.entries(response?.rates)?.length >= 4 && hourDifference() >= 48))
                    && matchDetailsData?.showRatings !== 'disable') {
                    calculatePlayerRatings(response?.rates);
                }
            }

        } catch (error) {
            throw new Error(error?.message);
        }
    }

    const fetchNotesData = async () => {
        try {
            const response = await loadWebsite(`notes/${matchDetailsData?.day}`);
            if (response?.notes) {
                const notesArray = Object.entries(response?.notes)
                setMatchNotes(notesArray)
                if (Object.entries(response?.notes).some(x => x[0] === userName)) {
                    const noteData = {
                        note: Object.entries(response?.notes).find(x => x[0] === userName)[1]?.note
                    }
                    setNoteFormData(noteData);
                    setNotesTitle('Edit your note:')
                }
            }
        } catch (error) {
            throw new Error(error?.message);
        }
    }

    const handleNoteInputChange = (event) => {
        const value = event.target.value;
        setNoteFormData((prevData) => ({
            ...prevData,
            note: value,
        }));

    };

    const handleBack = (data) => {
        if (data) {
            navigate(`/oyesfc-react/${cameFrom}`)
        }
    }

    const calculatePlayerRatings = (ratingResponse) => {
        let ratingsArray = [];
        let bestPlayer;
        Object.entries(matchDetailsData.oyesfc.squad).forEach(playerName => {
            let points = 0;
            Object.values(ratingResponse)?.forEach((value) => {
                if (value[playerName[0]]) points += value[playerName[0]]
            })
            const averageRating = points / Object.entries(ratingResponse)?.filter(z => Object.keys(z[1]).includes(playerName[0])).length;
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
                await set(ref(dataBase, `notes/${matchDetailsData?.day}/notes/${userName}`), noteFormData);
                const newNote = [
                    userName,
                    noteFormData
                ]
                setMatchNotes((prevData) => ([
                    ...prevData?.filter(x => x[0] !== userName),
                    newNote
                ]));
                if (notesTitle === 'Add your note:') setNotesTitle('Edit your note:')
            } catch (error) {
                setStarsErrorMessage(error?.message)
            }
        } else {
            setNotesErrorMessage('Add a note!')
        }
    };

    const whoRatedWhoNotRated = async (response) => {
        if (!response) return
        let responseForRatedPlayers;
        try {
            responseForRatedPlayers = await loadWebsite('firebaseUID');
        } catch (error) {
            throw new Error(error?.message);
        }
        const keys = Object.keys(response?.rates)
        let ratedPlayers = [];
        keys?.forEach(key => {
            const userName = Object.entries(responseForRatedPlayers?.users)?.find(x => x[1] === key) ?
                Object.entries(responseForRatedPlayers?.users)?.find(x => x[1] === key)[0] : null;
            ratedPlayers.push(userName)
        })
        return ratedPlayers
    }

    const getGeoCoordinates = () => {
        const xLocation = Facilities.find(x => x.name === matchDetailsData?.place).xAppleLocation
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

    const getOpenWeather = async () => {
        if (matchDetailsData?.day && matchDetailsData?.place) {
            const [matchDay, matchMonth, matchYear] = matchDetailsData?.day?.split('-')
            const endDate = new Date(Number(matchYear), Number(matchMonth) - 1, Number(matchDay))
            const startDate = new Date();
            const timeDifference = endDate.getTime() - startDate.getTime();
            const dayDifference = timeDifference / (1000 * 3600 * 24);
            if (dayDifference <= 5) {
                const coordinates = getGeoCoordinates();
                const [latitude, longitude] = coordinates.split(',');
                const date = new Date(Number(matchYear), Number(matchMonth) - 1, Number(matchDay), 5, 0)
                const hour = Number(matchDetailsData?.time?.split('-')[0]?.split(':')[0])
                const roundedHour = hour >= 23 || hour <= 1 ? '00' : Math.round(hour / 3) * 3;
                if (hour >= 23) date.setDate(date.getDate() + 1);
                const finalDate = date.toISOString().split('T')[0];
                const weatherDate = finalDate + ' ' + roundedHour + ':00:00'
                const type = fixture === matchType.upcoming ? openWeatherType.forecast : openWeatherType.weather
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
                const specificDate = new Date(Number(matchYear), Number(matchMonth) - 1, Number(matchDay), hour, 0)
                const sunriseTime = new Date(sunriseTimestamp * 1000);
                if (type === openWeatherType.forecast) {
                    sunriseTime.setFullYear(specificDate.getFullYear());
                    sunriseTime.setMonth(specificDate.getMonth());
                    sunriseTime.setDate(specificDate.getDate());
                }
                const sunsetTime = new Date(sunsetTimestamp * 1000);
                if (type === openWeatherType.forecast) {
                    sunsetTime.setFullYear(specificDate.getFullYear());
                    sunsetTime.setMonth(specificDate.getMonth());
                    sunsetTime.setDate(specificDate.getDate());
                }
                if (specificDate >= sunriseTime && specificDate <= sunsetTime) {
                    partOfDay = WeatherSky[1]
                } else {
                    partOfDay = WeatherSky[0]
                }
                const dataForWeather = {
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
                }
                setWeatherData(dataForWeather)
            }
        }

    }

    return (
        <div>
            <BackButton handleBackButton={handleBack} generalTitle={'Match Details'}/>
            <Box sx={{display: {xs: 'flex', md: 'none'}, height: '30px'}}></Box>
            {
                <div>
                    <section className={classes.scoreboard}>
                        <div className={classes.scoreboardInsideDiv}>
                            <TeamView teamData={matchDetailsData?.oyesfc} rakipbul={matchDetailsData?.rakipbul}
                                      isDetails={true}/>
                            <main className={classes.score}>
                                <Result homeTeamScore={matchDetailsData?.oyesfc?.goal}
                                        awayTeamScore={matchDetailsData?.rival?.goal}
                                        isDetails={true}
                                        fixture={fixture}
                                        time={matchDetailsData?.time}/>
                                {fixture === matchType.live ?
                                    <GameStatus status={matchDetailsData?.day?.replace(/-/g, '/')}
                                                bgColor={buttonBgColor}
                                                fixture={fixture} isDetails={true}/>
                                    :
                                    null
                                }
                            </main>
                            <TeamView teamData={matchDetailsData?.rival} rakipbul={matchDetailsData?.rakipbul}
                                      isDetails={true}/>
                        </div>
                        {matchDetailsData.oyesfc.goal !== 0 ?
                            <div className={classes.playerGoalsDiv}>
                                {matchDetails.map((item, index) => (
                                    <div key={index}
                                         className={classes.goalScorerGrid}>
                            <span
                                  className={classes.goalScorerName}>{item[0].replace(/[0-9]/g, '')}</span>
                                        {Array.from({length: item[1].goal}).map((_, imgIndex) => (
                                            <img
                                                key={imgIndex}
                                                className={classes.goalImage}
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
                    <Box sx={{borderBottom: 1, borderColor: 'divider', bgcolor: {xs: 'black', md: buttonBgColor}, borderRadius: {xs: '0', md: '0 0 12px 12px'}}}>
                        <Tabs value={tabValue} onChange={handleTabChange} aria-label="basic tabs example"
                              scrollButtons variant="scrollable"
                              sx={{
                                  borderBottom: {xs: '1px solid #252525', md: 0},
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
                                    color: 'gray',
                                    size: 14
                                }, '&.Mui-selected': {
                                    color: 'lightgray'
                                }
                            }} label="comparison" {...a11yProps(2)} />
                            <Tab sx={{
                                '&.MuiTab-root': {
                                    color: 'gray'
                                }, '&.Mui-selected': {
                                    color: 'lightgray'
                                }
                            }} label="highlights" {...a11yProps(3)} />
                            {
                                signedIn && fixture === matchType.previous &&
                                <Tab sx={{
                                    '&.MuiTab-root': {
                                        color: 'gray'
                                    }, '&.Mui-selected': {
                                        color: 'lightgray'
                                    }
                                }} label="rating" {...a11yProps(4)} />
                            }
                            {
                                signedIn && fixture === matchType.previous &&
                                <Tab sx={{
                                    '&.MuiTab-root': {
                                        color: 'gray'
                                    }, '&.Mui-selected': {
                                        color: 'lightgray'
                                    }
                                }} label="notes" {...a11yProps(5)} />
                            }
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={tabValue} index={0}>
                        <PreviewTab matchDetailsData={matchDetailsData} allData={sortedAllData} matchIndex={matchIndex}
                                    bestOfMatch={bestOfMatch} redirectToTab={redirectToTab} weatherData={weatherData}/>
                        {
                            isCaptain &&
                            <>
                                <div style={{height: '20px'}}></div>
                                <section className={classes.generalTabSection} onClick={editMatch} style={{cursor: 'pointer'}}>
                                    <div className={classes.urlInfoDiv}>
                                        <EditIcon fontSize={isMobile ? 'medium' : 'large'}
                                                  className={classes.generalInfoIcon}>
                                        </EditIcon>
                                        <span className={classes.generalInfoSpan}>
                                            Edit Match
                                        </span>
                                    </div>
                                </section>
                            </>
                        }
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={1}>
                        <SquadTab matchDetailsData={matchDetailsData} squadRatings={squadRatings} bestOfMatch={bestOfMatch}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={2}>
                        <div style={{height: '20px'}}></div>
                        <section className={classes.defaultSection}>
                            <RivalComparison data={sortedAllData} selectedRival={matchDetailsData?.rival.name}/>
                        </section>
                    </CustomTabPanel>
                    <CustomTabPanel value={tabValue} index={3}>
                        <div style={{height: '20px'}}></div>
                        <HighlightsTab matchDetailsData={matchDetailsData}/>

                    </CustomTabPanel>
                    {
                    signedIn && fixture === matchType.previous &&
                        <>
                            <CustomTabPanel value={tabValue} index={4}>
                                {
                                    Object.entries(matchDetailsData.oyesfc.squad).filter(a => a[0] !== userName)?.map((x, y) => (
                                        <>
                                            <div style={{height: '20px'}}></div>
                                            <section key={y} className={classes.starSection}>
                                                <span className={classes.starSpan}>{x[0]}</span>
                                                {
                                                    Object.values(TeamMembers).map(x => x.name).includes(x[0]) ?
                                                        (ratedPeople?.includes(x[0]) ?
                                                            <span className={classes.starDetailSpan}>
                                                            {x[0]?.split(' ')[0] + ' added rating to this match.'}
                                                        </span>
                                                            :
                                                            <span className={classes.starDetailSpan}>
                                                            {x[0]?.split(' ')[0] + ' did not add rating to this match.'}
                                                        </span>)
                                                        :
                                                        Object.values(matchDetailsData?.oyesfc?.squad)?.find(x => x?.name === x[0])?.description ?
                                                            <span className={classes.starDetailSpan}>
                                                            {Object.entries(matchDetailsData?.oyesfc?.squad)?.find(z => z[0] === x[0])[1]?.description}
                                                        </span>
                                                            :
                                                            null
                                                }
                                                <div className={classes.starDiv}>
                                                    {[...Array(10)].map((star, index) => {
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
                                                <div className={classes.ratingStarDetailsDiv}>
                                                    <ArrowBackIosNewIcon fontSize={isMobile ? 'medium' : 'large'}
                                                                         className={classes.ratingStarIconDiv}
                                                                         onClick={() => handleStarDetailChange(x[0], 'minus')}>
                                                    </ArrowBackIosNewIcon>
                                                    <h1 className={classes.ratingStarSpanDiv}>
                                                        {oYesFCStarFormData[x[0]] ? oYesFCStarFormData[x[0]]?.toFixed(1) : 'Rate'}
                                                    </h1>
                                                    <ArrowForwardIosIcon fontSize={isMobile ? 'medium' : 'large'}
                                                                         className={classes.ratingStarIconDiv}
                                                                         onClick={() => handleStarDetailChange(x[0], 'plus')}>
                                                    </ArrowForwardIosIcon>
                                                </div>
                                            </section>
                                        </>

                                    ))
                                }
                                {
                                    starsErrorMessage &&
                                    <Alert sx={{borderRadius: '25px', margin: '20px'}}
                                           variant="filled" severity="error">{starsErrorMessage}</Alert>
                                }
                                <div style={{height: '20px'}}></div>
                                <div className={accountClasses.morePageBox} onClick={() => (starsSubmitButton !== 'Submitted' && starsSubmitButton !== 'Not Available') && submitStars()}>
                                    <span className={navbarClasses.drawerRoutesSpan}>{starsSubmitButton}</span>
                                </div>
                            </CustomTabPanel>
                            <CustomTabPanel value={tabValue} index={5}>
                                {
                                    matchNotes && matchNotes?.map((x, y) => (
                                        <>
                                            <div style={{height: '20px'}}></div>
                                            <section key={y} className={classes.notesSection}>
                                                <span className={classes.noteWriterSpan}>{x[0]}</span>
                                                <Divider
                                                    sx={{bgcolor: 'gray', marginTop: '10px', marginBottom: '10px'}}/>
                                                <span className={classes.starSpan}>{x[1]?.note}</span>
                                            </section>
                                        </>
                                    ))
                                }
                                <div style={{height: '20px'}}></div>
                                <section className={classes.notesSection}>
                                    <span className={classes.noteWriterSpan}>{notesTitle}</span>
                                    <Divider sx={{bgcolor: 'gray', marginTop: '10px', marginBottom: '10px'}}/>
                                    <textarea
                                        className={classes.noteInputDesign}
                                        required={true}
                                        name="note"
                                        value={noteFormData['note']}
                                        onChange={handleNoteInputChange}
                                        maxLength={750}
                                    />

                                </section>
                                {
                                    notesErrorMessage &&
                                    <>
                                        <div style={{height: '20px'}}></div>
                                        <Alert sx={{borderRadius: '25px', margin: '20px'}}
                                               variant="filled" severity="error">{notesErrorMessage}</Alert>
                                    </>

                                }
                                <div style={{height: '20px'}}></div>
                                <div className={accountClasses.morePageBox} onClick={submitNote}>
                                    <span className={navbarClasses.drawerRoutesSpan}>Submit</span>
                                </div>
                            </CustomTabPanel>
                        </>
                    }
                </div>}
        </div>
    );
};
