import * as React from 'react';
import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Divider, List, ListItem, Tab, Tabs} from "@mui/material";
import {TeamMembers} from "../../constants/constants";
import classes from "../PlayerCards/player-cards.module.css"
import matchDetailsClasses from "../MatchDetails/match-details.module.css"
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import NumbersIcon from '@mui/icons-material/Numbers';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import CopyrightIcon from '@mui/icons-material/Copyright';
import SoccerLineUp from "react-soccer-lineup";
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import PushPinIcon from '@mui/icons-material/PushPin';
import ScoreboardsGrid from "../ScoreboardsGrid/scoreboards-grid";
import {loadWebsite} from "../../firebase";
import CakeIcon from '@mui/icons-material/Cake';
import PlayerRadarChart from "../PlayerRadarChart/player-radar-chart";

function CustomTabs(props) {
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

CustomTabs.propTypes = {
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

const PlayerCards = ({playerName, data, close , credentials, allData , reloadData}) => {

    const isMobile = window.innerWidth <= 768;
    const [tabValue, setTabValue] = React.useState(0);
    const numberOfMatches = Object.values(data).length;
    const playerNumber = Object.values(TeamMembers).find(x => x.name === playerName).number;
    const imageUrl = Object.entries(TeamMembers).find(x => x[1].name === playerName)[0];
    const playerFoot = playerName === TeamMembers.atakan.name ? 'Left' :
        (playerName === TeamMembers.yigit.name || playerName === TeamMembers.mert.name) ? 'Both' : 'Right';
    const filteredWithPlayerData = Object.values(data).filter(x => {
        return Object.keys(x.oyesfc.squad).includes(playerName)
    })
    const [ratesData, setRatesData] = useState(null);
    const [playerRatingMvp, setPlayerRatingMvp] = useState({rating: '-', mvp: 0});
    const oyesfcMembers = Object.values(TeamMembers).map(x => x.name)
    let playerTotalGoal = 0;
    let playerYellowCard = 0;
    let playerRedCard = 0;

    Object.values(data).forEach(item => {
        if (item?.oyesfc?.squad[playerName] && playerName !== TeamMembers.can.name) {
            playerTotalGoal += item.oyesfc.squad[playerName].goal;
        }
        if (item?.oyesfc?.squad[playerName]?.card === 'yellow') {
            playerYellowCard += 1;
        }
        if (item?.oyesfc?.squad[playerName]?.card === 'red') {
            playerRedCard += 1;
        }
    });

    const calculateAge = () => {
        const year = Object.values(TeamMembers).find(x => x.name === playerName).birthYear
        const month = Object.values(TeamMembers).find(x => x.name === playerName).birthMonth
        const day = Object.values(TeamMembers).find(x => x.name === playerName).birthDay
        const inputDateTime = new Date(year, month - 1, day);
        const now = new Date();
        const thisYearBirthDate = new Date(now.getFullYear(), month - 1, day);
        if (thisYearBirthDate > now) return (now.getFullYear() - inputDateTime.getFullYear()) - 1;
        return now.getFullYear() - inputDateTime.getFullYear();
    };


    const playerTotalMatch = Object.values(data).filter(item =>
        Object.keys(item.oyesfc.squad).includes(playerName)).length;

    useEffect(() => {
        if (!ratesData) {
            fetchRatesData().then(r => r)
        }
    });

    const handleTabChange = (event, newTabValue) => {
        setTabValue(newTabValue);
    };

    const styles = {
        card: {
            position: 'relative',
            backgroundColor: '#424242',
            borderRadius: '25px',
            width: '100%',
            height: '100%',
            overflow: 'auto',
            overflowX: 'hidden'
        },
        media: {
            height: '50%',
        },
        content: {
            position: 'absolute',
            bottom: '49.5%',
            left: 0,
            right: 0,
            backgroundColor: '#323232',
            color: 'white',
            padding: '10px',
            width: '100%',
            textAlign: 'center'
        },
    };

    const handleClose = () => {
        close(true);
    };

    const closeButton = (
        <div className={matchDetailsClasses.buttonBorderStyle}>
            <button className={matchDetailsClasses.mapsButtons} onClick={handleClose}>Close</button>
        </div>
    )

    const positionStyle = {
        color: 'black',
        numberColor: 'goldenrod',
        nameColor: 'black',
    }

    const oyesfcSquad = {
        [TeamMembers.atakan.name]: {
            squad: {
                df: [
                    {name: 'LB', number: 2},
                    {name: 'CB', number: 1},
                    {name: 'RB', number: 3},
                ],
                cm: [],
                fw: [],
            },
            style: positionStyle
        },
        [TeamMembers.yigit.name]: {
            squad: {
                df: [],
                cdm: [],
                cm: [{name: 'CM', number: 3}],
                cam: [{name: 'CAM', number: 1}],
                fw: [{name: 'CF', number: 2}],
            },
            style: positionStyle
        },
        [TeamMembers.can.name]: {
            squad: {
                gk: {name: 'GK', number: 1},
            },
            style: positionStyle
        },
        [TeamMembers.mert.name]: {
            squad: {
                df: [],
                cm: [],
                fw: [
                    {name: 'LW', number: 1},
                    {name: 'CF', number: 3},
                    {name: 'RW', number: 2},
                ],
            },
            style: positionStyle
        },
        [TeamMembers.oguzhan.name]: {
            squad: {
                df: [
                    {name: 'LB', number: 3},
                    {name: 'CB', number: 2},
                    {name: 'RB', number: 1},
                ],
                cm: [],
                fw: [],
            },
            style: positionStyle
        },
        [TeamMembers.berent.name]: {
            squad: {
                df: [],
                cm: [],
                fw: [
                    {name: 'LW', number: 2},
                    {name: 'CF', number: 3},
                    {name: 'RW', number: 1},
                ],
            },
            style: positionStyle
        },
        [TeamMembers.berk.name]: {
            squad: {
                df: [{name: 'LWB', number: 1},
                    {name: 'CB', number: 2},
                    {name: 'RWB', number: 3}
                ],
                cm: [],
                fw: [],
            },
            style: positionStyle
        },
        [TeamMembers.mehmet.name]: {
            squad: {
                df: [{name: 'CB', number: 1}],
                cm: [],
                fw: [],
            },
            style: positionStyle
        },
        [TeamMembers.gokhan.name]: {
            squad: {
                df: [],
                cdm: [{name: 'CDM', number: 2}],
                cm: [{name: 'CM', number: 1}],
                cam: [{name: 'CAM', number: 3}],
                fw: [],
            },
            style: positionStyle
        },
        [TeamMembers.ogulcan.name]: {
            squad: {
                df: [],
                cdm: [{name: 'CDM', number: 3}],
                cm: [{name: 'CM', number: 1}],
                cam: [{name: 'CAM', number: 2}],
                fw: [],
            },
            style: positionStyle
        },
        [TeamMembers.utku.name]: {
            squad: {
                df: [{name: 'LWB', number: 2},
                    {color: 'green',},
                    {name: 'RWB', number: 1},],
                cm: [],
                fw: [],
            },
            style: positionStyle
        }
    }

    const handleReload = (data) => {
        reloadData(data)
    }

    const playersPositions = {
        [TeamMembers.atakan.name]: ['Centre Back', 'Left Back', 'Right Back'],
        [TeamMembers.yigit.name]: ['Centre Attacking Midfielder', 'Centre Forward', 'Centre Midfielder'],
        [TeamMembers.can.name]: ['Goalkeeper'],
        [TeamMembers.mert.name]: ['Left Wing', 'Right Wing', 'Centre Forward'],
        [TeamMembers.oguzhan.name]: ['Right Back', 'Centre Back', 'Left Back'],
        [TeamMembers.berent.name]: ['Right Wing', 'Left Wing', 'Centre Forward'],
        [TeamMembers.berk.name]: ['Left Wing Back', 'Centre Back', 'Right Wing Back'],
        [TeamMembers.mehmet.name]: ['Centre Back'],
        [TeamMembers.gokhan.name]: ['Centre Midfielder', 'Centre Defensive Midfielder', 'Centre Attacking Midfielder'],
        [TeamMembers.ogulcan.name]: ['Centre Midfielder', 'Centre Attacking Midfielder', 'Centre Defensive Midfielder'],
        [TeamMembers.utku.name]: ['Right Wing Back', 'Left Wing Back'],
    }

    const fetchRatesData = async () => {
        try {
            const response = await loadWebsite(`rates`);
            if (response) {
                calculatePlayerRatings(response)
                setRatesData(response)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const hourDifference = (matchDay, time) => {
        const [day, month, year] = matchDay.split('-');
        const matchTime = time.split('-');
        const endTime = matchTime[1] === '00:00' ? '23:59' : matchTime[1]
        const [hour, minute] = endTime.split(':');
        const inputDateTime = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute));
        const now = new Date();
        return (now - inputDateTime) / (1000 * 60 * 60)
    };

    const calculatePlayerRatings = (response) => {
        const superFilteredData = Object.entries(response)?.filter(x => {
            const oyesfcMemberLength = Object.entries(Object.values(allData)?.find(match => match?.day === x[0])?.oyesfc?.squad)
                ?.map(a => a[0])?.filter(b => oyesfcMembers?.includes(b))?.length
            const showRatings = Object.values(allData)?.find(match => match?.day === x[0])?.showRatings
            const differenceInHours = hourDifference(Object.values(allData)?.find(match => match?.day === x[0])?.day, Object.values(allData)?.find(match => match?.day === x[0])?.time)
            return Object.values(data)?.map(x => x?.day)?.includes(x[0]) && (Object.values(x[1]?.rates)?.length >= oyesfcMemberLength || showRatings === 'enable' ||
                (differenceInHours >= 48 && Object.values(x[1]?.rates)?.length >= 4)) && showRatings !== 'disable'
        })
        const matchCount = superFilteredData.filter(superMatch => {
            return Object.keys(Object.values(allData)?.find(match => match?.day === superMatch[0])?.oyesfc?.squad)?.includes(playerName)
        })?.length
        let totalRating = 0;
        let eachMatchRatings = [];
        let eachMatchRatingsTotal = 0;

        if (superFilteredData.length > 0) {
            superFilteredData?.forEach(matchData => {
                totalRating = 0;
                const ratings = Object.values(matchData[1]?.rates).filter(y => Object.keys(y).includes(playerName)).map(x => x[playerName]);
                ratings.forEach(x => {
                    totalRating += x
                });
                totalRating = ratings?.length ? (totalRating / ratings?.length) : 0
                eachMatchRatings.push(totalRating)
            });
            eachMatchRatings.forEach(x => {
                eachMatchRatingsTotal += x
            });
            const averageRating = matchCount ? (eachMatchRatingsTotal / matchCount) : 0;
            if (averageRating !== 0) {
                const mvpCount = calculateAverageRatings(superFilteredData);
                const ratingMvp = {
                    rating: averageRating ? Number(averageRating.toFixed(2)) : '-',
                    mvp: mvpCount
                }
                setPlayerRatingMvp(ratingMvp)
            }
        }
    }

    const calculateAverageRatings = (data) => {
        let averageRatings = {};
        let bestOfMatches = [];
        let count = 0;

        data?.forEach(matchData => {
            averageRatings = {};
            if (!matchData || !matchData[1]?.rates) return;
            const matchRatings = matchData[1]?.rates;
            Object.keys(matchRatings)?.forEach(key => {
                const ratings = matchRatings[key];
                Object.keys(ratings)?.forEach(player => {
                    const rating = ratings[player];
                    averageRatings[player] = (averageRatings[player] || 0) + rating;
                });
            });
            Object.keys(averageRatings)?.forEach(player => {
                averageRatings[player] /= Object.values(matchRatings)?.filter(x => Object.keys(x)?.includes(player))?.length
            });
            const topPlayerOfThisMatch = findTopPlayers(averageRatings);
            bestOfMatches.push(topPlayerOfThisMatch[0])
        });

        bestOfMatches?.forEach(name => {
            if (name === playerName) {
                count++;
            }
        });

        return count;
    };

    const findTopPlayers = (averageRatings) => {
        const maxAverage = Math.max(...Object.values(averageRatings));
        return Object.keys(averageRatings)?.filter(player => averageRatings[player] === maxAverage);
    };


    return (
        <Card sx={styles.card}>
            <CardMedia
                component="img"
                sx={styles.media}
                image={require(`../../images/${imageUrl}.jpeg`)}
            />
            <CardContent sx={styles.content}>
                <h1>{playerName}</h1>
            </CardContent>
            <Box sx={{borderBottom: 1, borderColor: 'divider', bgcolor: '#323232', justifyContent: 'center', display: 'flex'}}>
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
                    }} label="profile" {...a11yProps(0)} />
                    <Tab sx={{
                        '&.MuiTab-root': {
                            color: 'gray'
                        }, '&.Mui-selected': {
                            color: 'lightgray'
                        }
                    }} label="statistics" {...a11yProps(1)} />
                    <Tab sx={{
                        '&.MuiTab-root': {
                            color: 'gray'
                        }, '&.Mui-selected': {
                            color: 'lightgray'
                        }
                    }} label="matches" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <CustomTabs value={tabValue} index={0}>
                {
                    playerName === TeamMembers.yigit.name &&
                    <div className={classes.captainDiv}>
                        <section className={matchDetailsClasses.momSection}>
                            <>
                                <CopyrightIcon fontSize={isMobile ? 'medium' : 'large'}
                                               className={matchDetailsClasses.starIcon}>
                                </CopyrightIcon>
                            </>
                            <div className={matchDetailsClasses.momDetailsDiv}>

                                <span className={matchDetailsClasses.momNameSpan}>
                                Captain
                            </span>
                            </div>
                        </section>
                    </div>
                }
                <section className={matchDetailsClasses.squadSection}>
                    <div className={classes.generalInfoDiv}>
                        <div className={classes.generalInfoInsideDiv}>
                            <CakeIcon fontSize={isMobile ? 'medium' : 'large'} className={classes.iconStyle}>
                            </CakeIcon>
                            <span className={classes.belowIconSpan}>{calculateAge()}</span>
                        </div>
                        <div className={classes.generalInfoInsideDiv}>
                            <NumbersIcon fontSize={isMobile ? 'medium' : 'large'} className={classes.iconStyle}>
                            </NumbersIcon>
                            <span className={classes.belowIconSpan}>
                                {playerNumber}
                            </span>
                        </div>
                        <div className={classes.generalInfoInsideDiv}>
                            <TransferWithinAStationIcon fontSize={isMobile ? 'medium' : 'large'}
                                                        className={classes.iconStyle}>
                            </TransferWithinAStationIcon>
                            <span className={classes.belowIconSpan}>{playerFoot}</span>
                        </div>
                    </div>
                </section>
                <section className={matchDetailsClasses.squadSection}>
                    <div className={matchDetailsClasses.generalInfoDiv}>
                        <PushPinIcon fontSize={isMobile ? 'medium' : 'large'}
                                     className={matchDetailsClasses.generalInfoIcon}>
                        </PushPinIcon>
                        <span className={matchDetailsClasses.generalInfoSpan}>
                            Positions
                        </span>
                    </div>
                    <Divider sx={{bgcolor: 'gray', margin: '10px'}}/>
                    <div className={matchDetailsClasses.generalInfoDiv}>
                        <LooksOneIcon fontSize={isMobile ? 'medium' : 'large'}
                                      className={matchDetailsClasses.generalInfoIcon}>
                        </LooksOneIcon>
                        <span className={matchDetailsClasses.generalInfoSpan}>
                                {Object.entries(playersPositions).find(x => x[0] === playerName)[1][0]}
                            </span>
                    </div>
                    {
                        (playerName !== TeamMembers.can.name && playerName !== TeamMembers.mehmet.name) &&
                        <div className={matchDetailsClasses.generalInfoDiv}>
                            <LooksTwoIcon fontSize={isMobile ? 'medium' : 'large'}
                                          className={matchDetailsClasses.generalInfoIcon}>
                            </LooksTwoIcon>
                            <span className={matchDetailsClasses.generalInfoSpan}>
                                    {Object.entries(playersPositions).find(x => x[0] === playerName)[1][1]}
                                </span>
                        </div>
                    }
                    {
                        (playerName !== TeamMembers.can.name && playerName !== TeamMembers.utku.name && playerName !== TeamMembers.mehmet.name) &&
                        <div className={matchDetailsClasses.generalInfoDiv}>
                            <Looks3Icon fontSize={isMobile ? 'medium' : 'large'}
                                        className={matchDetailsClasses.generalInfoIcon}>
                            </Looks3Icon>
                            <span className={matchDetailsClasses.generalInfoSpan}>
                                    {Object.entries(playersPositions).find(x => x[0] === playerName)[1][2]}
                            </span>
                        </div>
                    }
                    <div className={matchDetailsClasses.pitchStyleDiv}>
                        <SoccerLineUp
                            size={"responsive"}
                            homeTeam={oyesfcSquad[playerName]}
                            color={'green'}
                        />
                    </div>
                </section>
                <PlayerRadarChart playerName={playerName}/>
                {isMobile && closeButton}
            </CustomTabs>
            <CustomTabs value={tabValue} index={1}>
                <section className={matchDetailsClasses.squadSection}>
                    <div className={classes.generalPointsDiv}>
                        <div className={classes.generalInfoInsideDiv}>
                            <StarHalfIcon fontSize={isMobile ? 'medium' : 'large'} className={classes.iconStyle}>
                            </StarHalfIcon>
                            <span className={classes.belowIconSpan}>{playerRatingMvp?.rating}</span>
                        </div>
                        <div className={classes.generalInfoInsideDiv}>
                            <SportsSoccerIcon fontSize={isMobile ? 'medium' : 'large'} className={classes.iconStyle}>
                            </SportsSoccerIcon>
                            <span
                                className={classes.belowIconSpan}>{playerTotalGoal}</span>
                        </div>
                        <div className={classes.generalInfoInsideDiv}>
                            <MilitaryTechIcon fontSize={isMobile ? 'medium' : 'large'}
                                              className={classes.iconStyle}>
                            </MilitaryTechIcon>
                            <span className={classes.belowIconSpan}>{playerRatingMvp?.mvp}</span>
                        </div>
                    </div>
                </section>
                <section className={matchDetailsClasses.squadSection}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem style={{
                            justifyContent: "space-between",
                            display: "flex",
                            textAlign: "end"
                        }}>
                            <p className={classes.fontStyle}>Matches</p>
                            <p className={classes.fontStyle}>{playerTotalMatch}</p>
                        </ListItem>
                        <Divider sx={{bgcolor: "#646464"}} variant="middle" color="red"/>
                        <ListItem style={{
                            justifyContent: "space-between",
                            display: "flex",
                            textAlign: "end"
                        }}>
                            <p className={classes.fontStyle}>Goals</p>
                            <p className={classes.fontStyle}>{playerTotalGoal}</p>
                        </ListItem>
                        <Divider sx={{bgcolor: "#646464"}} variant="middle" color="red"/>
                        <ListItem style={{
                            justifyContent: "space-between",
                            display: "flex",
                            textAlign: "end"
                        }}>
                            <p className={classes.fontStyle}>Goal per Game</p>
                            <p className={classes.fontStyle}>{(playerTotalGoal / playerTotalMatch).toFixed(2)}</p>
                        </ListItem>
                        <Divider sx={{bgcolor: "#646464"}} variant="middle"/>
                        <ListItem style={{
                            justifyContent: "space-between",
                            display: "flex",
                            textAlign: "end"
                        }}>
                            <p className={classes.fontStyle}>Rating</p>
                            <p className={classes.fontStyle}>{playerRatingMvp?.rating}</p>
                        </ListItem>
                        <Divider sx={{bgcolor: "#646464"}} variant="middle" color="red"/>
                        <ListItem style={{
                            justifyContent: "space-between",
                            display: "flex",
                            textAlign: "end"
                        }}>
                            <p className={classes.fontStyle}>Man of the Match Awards</p>
                            <p className={classes.fontStyle}>{playerRatingMvp?.mvp}</p>
                        </ListItem>
                        <Divider sx={{bgcolor: "#646464"}} variant="middle" color="red"/>
                        <ListItem style={{
                            justifyContent: "space-between",
                            display: "flex",
                            textAlign: "end"
                        }}>
                            <p className={classes.fontStyle}>Rate of Attendance</p>
                            <p className={classes.fontStyle}>{((playerTotalMatch / numberOfMatches) * 100).toFixed(0)}%</p>
                        </ListItem>
                    </List>
                </section>
                <section className={matchDetailsClasses.squadSection}>
                    <div className={classes.yellowAndRedCardsDiv}>
                        <div className={classes.generalInfoInsideDiv}>
                            <div className={classes.yellowCardStyle}></div>
                            <span className={classes.belowIconSpan}>{playerYellowCard}</span>
                        </div>
                        <div className={classes.generalInfoInsideDiv}>
                            <div className={classes.redCardStyle}></div>
                            <span className={classes.belowIconSpan}>{playerRedCard}</span>
                        </div>
                    </div>
                </section>
                {isMobile && closeButton}
            </CustomTabs>
            <CustomTabs value={tabValue} index={2}>
                <div className={classes.matchesDiv}>
                    <ScoreboardsGrid databaseData={filteredWithPlayerData} reloadData={handleReload} credentials={credentials} allData={allData} playerDetails={true}/>
                </div>
                {isMobile && closeButton}
            </CustomTabs>
        </Card>
    );
}

export default PlayerCards;
