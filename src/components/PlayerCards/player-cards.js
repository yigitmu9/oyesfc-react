import * as React from 'react';
import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Alert, Divider, List, ListItem, Snackbar, Tab, Tabs} from "@mui/material";
import {BootBrandsList, FifaCalculations, SnackbarTypes, TeamMembers} from "../../constants/constants";
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
import bootBrandsClasses from "../BootBrands/boot-brands.module.css";
import NikeLogo from "../../images/nike.png";
import AdidasLogo from "../../images/adidas.PNG";
import TollIcon from '@mui/icons-material/Toll';
import BackButton from "../../shared/BackButton/back-button";
import {useSelector} from "react-redux";
import PsychologyIcon from '@mui/icons-material/Psychology';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ShieldIcon from '@mui/icons-material/Shield';
import PanToolIcon from '@mui/icons-material/PanTool';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import {returnAverageData} from "../../utils/utils";

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

const PlayerCards = ({playerName, close}) => {

    const {allData, filteredData} = useSelector((state) => state.databaseData);
    const {signedIn} = useSelector((state) => state.credentials);
    const isMobile = window.innerWidth <= 768;
    const [tabValue, setTabValue] = React.useState(0);
    const numberOfMatches = Object.values(filteredData).length;
    const playerNumber = Object.values(TeamMembers).find(x => x.name === playerName).number;
    const imageUrl = Object.entries(TeamMembers).find(x => x[1].name === playerName)[0];
    const playerFoot = playerName === TeamMembers.atakan.name ? 'Left' :
        (playerName === TeamMembers.yigit.name || playerName === TeamMembers.mert.name) ? 'Both' : 'Right';
    const filteredWithPlayerData = Object.values(filteredData).filter(x => {
        return Object.keys(x.oyesfc.squad).includes(playerName)
    })
    const [ratesData, setRatesData] = useState(null);
    const [playerRatingMvp, setPlayerRatingMvp] = useState({rating: '-', mvp: 0});
    const oyesfcMembers = Object.values(TeamMembers).map(x => x.name)
    const [snackbarData, setSnackbarData] = useState(null);
    let playerTotalGoal = 0;
    const playerBootBrand = Object.values(TeamMembers).find(x => x.name === playerName).bootBrand;
    const playerBootCollection = Object.values(TeamMembers).find(x => x.name === playerName).bootCollection;
    const playerBootModel = Object.values(TeamMembers).find(x => x.name === playerName).bootModel;
    const [playerRatingData, setPlayerRatingData] = useState(null);
    const categories = ['Attacking', 'Skill', 'Movement', 'Power', 'Mentality', 'Defending', 'Goalkeeping']

    const returnIcon = (selection) => {
        if (selection === categories[0]) {
            return (
                <FlashOnIcon fontSize={isMobile ? 'medium' : 'large'}
                             className={matchDetailsClasses.generalInfoIcon}>
                </FlashOnIcon>
            )
        }
        if (selection === categories[1]) {
            return (
                <PrecisionManufacturingIcon fontSize={isMobile ? 'medium' : 'large'}
                                            className={matchDetailsClasses.generalInfoIcon}>
                </PrecisionManufacturingIcon>
            )
        }
        if (selection === categories[2]) {
            return (
                <DirectionsRunIcon fontSize={isMobile ? 'medium' : 'large'}
                                   className={matchDetailsClasses.generalInfoIcon}>
                </DirectionsRunIcon>
            )
        }
        if (selection === categories[3]) {
            return (
                <FitnessCenterIcon fontSize={isMobile ? 'medium' : 'large'}
                                   className={matchDetailsClasses.generalInfoIcon}>
                </FitnessCenterIcon>
            )
        }
        if (selection === categories[4]) {
            return (
                <PsychologyIcon fontSize={isMobile ? 'medium' : 'large'}
                                className={matchDetailsClasses.generalInfoIcon}>
                </PsychologyIcon>
            )
        }
        if (selection === categories[5]) {
            return (
                <ShieldIcon fontSize={isMobile ? 'medium' : 'large'}
                            className={matchDetailsClasses.generalInfoIcon}>
                </ShieldIcon>
            )
        }
        if (selection === categories[6]) {
            return (
                <PanToolIcon fontSize={isMobile ? 'medium' : 'large'}
                             className={matchDetailsClasses.generalInfoIcon}>
                </PanToolIcon>
            )
        }
        return null
    };

    Object.values(filteredData).forEach(item => {
        if (item?.oyesfc?.squad[playerName]) {
            playerTotalGoal += item.oyesfc.squad[playerName].goal;
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


    const playerTotalMatch = Object.values(filteredData).filter(item =>
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
            backgroundColor: {xs: 'black', md: '#252525'},
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
            backgroundColor: {xs: 'black', md: '#1C1C1E'},
            color: 'white',
            padding: '10px',
            width: '100%',
            textAlign: 'center'
        },
    };

    const handleClose = () => {
        close(true);
    };

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
            const errorResponse = {
                open: true,
                status: SnackbarTypes.error,
                message: error?.message,
                duration: 18000
            }
            setSnackbarData(errorResponse)
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
            return Object.values(filteredData)?.map(x => x?.day)?.includes(x[0]) && (Object.values(x[1]?.rates)?.length >= oyesfcMemberLength || showRatings === 'enable' ||
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

    const handleBack = (data) => {
        if (data) handleClose()
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await loadWebsite(`playerRatings/${playerName}`);
                if (response && Object.keys(response)?.length > 3) calculatePlayerRating(response)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData().then(r => r);
    }, [playerName]);

    const calculatePlayerRating = (data) => {
        const calculatedAverages = returnAverageData(data)
        setPlayerRatingData(calculatedAverages);
    }

    const calculateAttributes = () => {
        if (playerRatingData) {
            const PAC = ((Number(playerRatingData["Acceleration"]) + Number(playerRatingData["Sprint speed"])) / 2).toFixed(2);
            const SHO = ((Number(playerRatingData["Finishing"]) + Number(playerRatingData["Long Shots"]) + Number(playerRatingData["Penalties"]) + Number(playerRatingData["Shot Power"]) + Number(playerRatingData["Volleys"])) / 5).toFixed(2);
            const PAS = ((Number(playerRatingData["Crossing"]) + Number(playerRatingData["Curve"]) + Number(playerRatingData["Free Kick Accuracy"]) + Number(playerRatingData["Long Passing"]) + Number(playerRatingData["Short Passing"]) + Number(playerRatingData["Vision"])) / 6).toFixed(2);
            const DRI = ((Number(playerRatingData["Agility"]) + Number(playerRatingData["Balance"]) + Number(playerRatingData["Ball Control"]) + Number(playerRatingData["Composure"]) + Number(playerRatingData["Dribbling"]) + Number(playerRatingData["Reactions"])) / 6).toFixed(2);
            const DEF = ((Number(playerRatingData["Defensive Awareness"]) + Number(playerRatingData["Interceptions"]) + Number(playerRatingData["Sliding Tackle"]) + Number(playerRatingData["Standing Tackle"]) + Number(playerRatingData["Heading Accuracy"])) / 5).toFixed(2);
            const PHY = ((Number(playerRatingData["Aggression"]) + Number(playerRatingData["Jumping"]) + Number(playerRatingData["Stamina"]) + Number(playerRatingData["Strength"])) / 4).toFixed(2);

            const DIV = Number(playerRatingData["GK Diving"]).toFixed(2);
            const HAN = Number(playerRatingData["GK Handling"]).toFixed(2);
            const KIC = Number(playerRatingData["GK Kicking"]).toFixed(2);
            const REF = Number(playerRatingData["GK Reflexes"]).toFixed(2);
            const POS = Number(playerRatingData["GK Positioning"]).toFixed(2);


            if (playerName === TeamMembers.can.name) return [ Number(DIV), Number(HAN), Number(KIC), Number(REF), Number(PAC), Number(POS) ];
            return [ Number(PAC), Number(SHO), Number(PAS), Number(DRI), Number(DEF), Number(PHY) ];
        }
    };

    const attributes = calculateAttributes();
    const attributeNames = playerName === TeamMembers.can.name ? ['Diving', 'Handling', 'Kicking', 'Reflex', 'Speed', 'Positioning'] : ['Pace', 'Shooting', 'Passing', 'Dribbling', 'Defending', 'Physique']

    const calculateOverall = (role) => {
        if (playerRatingData) {
            let overallScore = 0;
            let totalWeight = 0;

            FifaCalculations.forEach(({ name, calculation }) => {
                const weight = calculation[role] || 0;

                if (weight > 0) {
                    overallScore += playerRatingData[name] * weight;
                    totalWeight += weight;
                }
            });

            return ((overallScore / totalWeight)).toFixed(0);
        }

    };


    const playerOverall = calculateOverall(Object.values(TeamMembers).find(x => x.name === playerName).fifaRole.toLowerCase());

    return (
        <Card sx={styles.card}>
            <Box sx={{display: {xs: 'flex', md: 'none'}, bgcolor: 'black'}}>
                <BackButton handleBackButton={handleBack}/>
            </Box>
            <CardMedia
                component="img"
                sx={styles.media}
                image={require(`../../images/${imageUrl}.jpeg`)}
            />
            <CardContent sx={styles.content}>
                <h1>{playerName}</h1>
            </CardContent>
            <Box sx={{
                borderBottom: 1,
                borderColor: 'divider',
                bgcolor: {xs: 'black', md: '#1C1C1E'},
                justifyContent: 'center',
                display: 'flex'
            }}>
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
                    {
                        signedIn && playerRatingData &&
                        <Tab sx={{
                            '&.MuiTab-root': {
                                color: 'gray'
                            }, '&.Mui-selected': {
                                color: 'lightgray'
                            }
                        }} label="rating" {...a11yProps(3)} />
                    }
                </Tabs>
            </Box>
            <Box sx={{borderBottom: {xs: '1px solid #252525', md: 0}, display: {xs: 'block', md: 'none'}}}></Box>
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
                {playerBootBrand && <section className={matchDetailsClasses.squadSection}>
                    <div className={matchDetailsClasses.generalInfoDiv}>
                        <TollIcon fontSize={isMobile ? 'medium' : 'large'}
                                  className={matchDetailsClasses.generalInfoIcon}>
                        </TollIcon>
                        <span className={matchDetailsClasses.generalInfoSpan}>
                            Football Boot
                        </span>
                    </div>
                    <Divider sx={{bgcolor: 'gray', margin: '10px'}}/>
                    <div className={classes.bootStyle}>
                        <img className={playerBootBrand === BootBrandsList.nike ?
                            bootBrandsClasses.nikeImageStyle : bootBrandsClasses.adidasImageStyle}
                             src={playerBootBrand === BootBrandsList.nike ? NikeLogo : AdidasLogo}
                             alt={'1'}/>
                        <h1 className={classes.collectionNameStyle}>{playerBootCollection + ' ' + playerBootModel}</h1>
                    </div>
                </section>}
                <Box sx={{display: {xs: 'block', md: 'none'}, height: '90px'}}></Box>
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
                <Box sx={{display: {xs: 'block', md: 'none'}, height: '90px'}}></Box>
            </CustomTabs>
            <CustomTabs value={tabValue} index={2}>
                <div className={classes.matchesDiv}>
                    <ScoreboardsGrid filteredWithPlayerData={filteredWithPlayerData}
                                     playerDetails={true}/>
                </div>
                <Box sx={{display: {xs: 'block', md: 'none'}, height: '90px'}}></Box>
            </CustomTabs>
            {
                signedIn && playerRatingData &&
                <CustomTabs value={tabValue} index={3}>
                    <div className={matchDetailsClasses.generalTabDiv}>
                        <section className={matchDetailsClasses.generalTabSection}>
                            <div className={matchDetailsClasses.generalInfoDiv}>
                            <span className={classes.ratingSpan} style={{
                                background: playerOverall >= 80 ? 'darkgreen' :
                                    playerOverall < 60 ? 'darkred' : 'darkgoldenrod'
                            }}>
                                {playerOverall}
                            </span>
                                <span className={matchDetailsClasses.generalInfoSpan}>
                                Overall
                            </span>
                            </div>
                            <Divider sx={{bgcolor: 'gray', margin: '10px'}}/>
                            {
                                attributes?.map((a, b) => (
                                    <div key={b} className={matchDetailsClasses.generalInfoDiv}>
                                        <span className={classes.ratingSpan} style={{
                                            background: a?.toFixed(0) >= 80 ? 'darkgreen' :
                                                a?.toFixed(0) < 60 ? 'darkred' : 'darkgoldenrod'
                                        }}>
                                            {a?.toFixed(0)}
                                        </span>
                                        <span className={matchDetailsClasses.generalInfoSpan}>
                                            {attributeNames[b]}
                                        </span>
                                    </div>
                                ))
                            }

                        </section>
                    </div>

                    {<PlayerRadarChart playerName={playerName} attributes={attributes}/>}
                    <div className={matchDetailsClasses.generalTabDiv}>
                        {
                            categories.map((category, i) => (
                                <section key={i} className={matchDetailsClasses.generalTabSection}>
                                    <div className={matchDetailsClasses.generalInfoDiv}>
                                        {returnIcon(category)}
                                        <span className={matchDetailsClasses.generalInfoSpan}>
                                            {category}
                                        </span>
                                    </div>
                                    <Divider sx={{bgcolor: 'gray', margin: '10px'}}/>
                                    {
                                        Object.entries(playerRatingData)?.filter(z => FifaCalculations.find(f => f.name === z[0]).category === category)
                                            ?.map((x, y) => (
                                                <div key={y} className={matchDetailsClasses.generalInfoDiv}>
                                                    <span className={classes.ratingSpan} style={{
                                                        background: x[1] >= 80 ? 'darkgreen' :
                                                            x[1] < 60 ? 'darkred' : 'darkgoldenrod'
                                                    }}>
                                                        {Number(x[1])?.toFixed(0)}
                                                    </span>
                                                    <span className={matchDetailsClasses.generalInfoSpan}>
                                                        {x[0]}
                                                    </span>
                                                </div>
                                            ))
                                    }
                                </section>
                            ))
                        }
                    </div>
                    <Box sx={{display: {xs: 'block', md: 'none'}, height: '90px'}}></Box>
                </CustomTabs>
            }
            <Snackbar open={snackbarData?.open} autoHideDuration={4000}>
                <Alert
                    severity={snackbarData?.status}
                    variant="filled"
                    sx={{width: '100%'}}
                >
                    {snackbarData?.message}
                </Alert>
            </Snackbar>
        </Card>
    );
}

export default PlayerCards;
