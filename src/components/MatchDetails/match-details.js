import React, {useEffect, useRef, useState} from 'react';
import classes from "./match-details.module.css"
import TeamView from "../TeamView/team-view";
import Result from "../Result/result";
import FootballLogo from '../../images/football.png';
import GameStatus from "../GameStatus/game-status";
import {TeamMembers, WeatherSky} from "../../constants/constants";
import Box from "@mui/material/Box";
import {Divider, Tab, Tabs} from "@mui/material";
import PropTypes from "prop-types";
import RivalComparison from "../RivalComparison/rival-comparison";
import AddMatchComponent from "../AddMatch/add-match";
import Message from "../Message/message";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {ref, set} from "firebase/database";
import {dataBase, loadWebsite} from "../../firebase";
import PreviewTab from "../PreviewTab/preview-tab";
import SquadTab from "../SquadTab/squad-tab";
import JerseyTab from "../JerseyTab/jersey-tab";
import LinksTab from "../LinksTab/links-tab";
import PlayerDetails from "../PlayerDetails/player-details";

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

export const MatchDetails = ({onClose, matchDetailsData, fixture, data, reloadData, credentials, allData, playerDetails}) => {

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
        if (differenceInHours >= 48 || !Object.keys(matchDetailsData?.oyesfc?.squad)?.includes(credentials?.userName)) {
            return 'Not Available'
        }
        return 'Submit'
    };

    document.body.style.overflow = 'hidden';
    const initialOYesFCStarFormData = {};
    const [ratesData, setRatesData] = useState(null);
    const isMobile = window.innerWidth <= 768;
    const buttonBgColor = '#323232'
    const oyesfcMembers = Object.values(TeamMembers).map(x => x.name)
    const matchDetails = Object.entries(matchDetailsData?.oyesfc?.squad)?.filter(x => x[1].goal > 0)
    const popupRef = useRef(null);
    const [tabValue, setTabValue] = React.useState(0);
    const matchIndex = Object.values(allData).findIndex(x => x === matchDetailsData)
    const [oYesFCStarFormData, setOYesFCStarFormData] = useState(initialOYesFCStarFormData);
    const [messageData, setMessageData] = useState(null);
    const [player, setPlayer] = useState(null);
    const [isMessagePopupOpen, setMessagePopupOpen] = useState(false);
    const [isPlayerPopupOpen, setPlayerPopupOpen] = useState(false);
    const [isAddMatchPopupOpen, setAddMatchPopupOpen] = useState(false);
    const [starsErrorMessage, setStarsErrorMessage] = useState(null);
    const [notesErrorMessage, setNotesErrorMessage] = useState(null);
    const [starsSubmitButton, setStarsSubmitButton] = useState(checkButton());
    const [notesSubmitButton, setNotesSubmitButton] = useState('Submit');
    const [matchNotes, setMatchNotes] = useState(null);
    const [noteFormData, setNoteFormData] = useState({});
    const [squadRatings, setSquadRatings] = useState(null);
    const [bestOfMatch, setBestOfMatch] = useState(null);
    const [ratedPeople, setRatedPeople] = useState(null);

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



    const redirectToTab = (tabIndex) => {
        setTabValue(tabIndex)
    }

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

    const editMatch = (data) => {
        setAddMatchPopupOpen(data)
    }

    const openPlayerDetailsModal = (player) => {
        setPlayer(player)
        setPlayerPopupOpen(true)
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
            setRatesData(response)
            const ratedOrNot = await whoRatedWhoNotRated(response)
            setRatedPeople(ratedOrNot)
            if (response?.rates) {
                if (Object.entries(response?.rates).some(x => x[0] === credentials?.id)) {
                    const form = Object.entries(response?.rates).find(x => x[0] === credentials?.id)[1]
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

    const whoRatedWhoNotRated = async (response) => {
        if (!response) return
        let responseForRatedPlayers;
        try {
            responseForRatedPlayers = await loadWebsite('firebaseUID');
        } catch (error) {
            console.log(error)
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

    const closeButton = (
        <div className={classes.buttonBorderStyle}>
            <button className={classes.mapsButtons} onClick={handleClose}>Close</button>
        </div>
    )

    return (
        <div className={classes.overlay}>
            {!isAddMatchPopupOpen && !isMessagePopupOpen && !isPlayerPopupOpen && <div className={playerDetails ? classes.fullContainer : classes.popupContainer} ref={popupRef}>
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
                          scrollButtons variant="scrollable"
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
                                color: 'gray',
                                size: 14
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
                    <PreviewTab matchDetailsData={matchDetailsData} allData={allData} matchIndex={matchIndex}
                                bestOfMatch={bestOfMatch} redirectToTab={redirectToTab}/>
                    {isMobile && closeButton}
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={1}>
                    <SquadTab matchDetailsData={matchDetailsData} squadRatings={squadRatings} openPlayerModal={openPlayerDetailsModal} redirectToTab={redirectToTab}/>
                    {isMobile && closeButton}
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={2}>
                    <JerseyTab matchDetailsData={matchDetailsData}/>
                    {isMobile && closeButton}
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={3}>
                    <RivalComparison data={allData} selectedRival={matchDetailsData?.rival.name}/>
                    {isMobile && closeButton}
                </CustomTabPanel>
                <CustomTabPanel value={tabValue} index={4}>
                    <LinksTab matchDetailsData={matchDetailsData} editMatch={editMatch} credentials={credentials} fixture={fixture}/>
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
                                        {
                                            oYesFCStarFormData[x[0]] ?
                                                <span className={classes.starDetailSpan}>
                                                Your rating to {x[0] + ' is ' + oYesFCStarFormData[x[0]] + '.'}</span>
                                                :
                                                <span className={classes.starDetailSpan}>
                                                Rate {x[0]}.
                                            </span>
                                        }
                                        {
                                            Object.values(TeamMembers).map(x => x.name).includes(x[0]) &&
                                                (ratedPeople?.includes(x[0]) ?
                                                <span className={classes.starDetailSpan}>
                                                    {x[0]?.split(' ')[0] + ' added rating to this match.'}
                                                </span>
                                                :
                                                <span className={classes.starDetailSpan}>
                                                    {x[0]?.split(' ')[0] + ' did not add rating to this match.'}
                                                </span>)
                                        }
                                    </section>
                                ))
                            }
                            {
                                starsErrorMessage &&
                                <section className={classes.starSection}>
                                    <span className={classes.starsErrorSpan}>
                                        <ErrorOutlineIcon fontSize={isMobile ? 'medium' : 'large'}
                                                          className={classes.errorIcon}>
                                        </ErrorOutlineIcon>
                                        {starsErrorMessage}
                                    </span>
                                </section>
                            }
                            <div className={classes.submitButtonDiv}>
                                <button className={classes.mapsButtons}
                                        disabled={starsSubmitButton === 'Submitted' || starsSubmitButton === 'Not Available'}
                                        onClick={submitStars}>{starsSubmitButton}</button>
                                {isMobile &&
                                    <button className={classes.mapsButtons} onClick={handleClose}>Close</button>}
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
                                (notesSubmitButton !== 'Submitted' && notesSubmitButton !== 'Not Available') &&
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
                                <button className={classes.mapsButtons} disabled={notesSubmitButton === 'Submitted' || notesSubmitButton === 'Not Available'}
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
            {isPlayerPopupOpen &&
                <PlayerDetails data={data}
                               onClose={() => setPlayerPopupOpen(false)} player={player}
                               credentials={credentials} allData={allData} reloadData={handleReload}/>}
        </div>
    );
};
