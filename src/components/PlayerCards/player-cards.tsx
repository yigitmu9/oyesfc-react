import * as React from 'react';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Divider, List, ListItem, Tab, Tabs } from '@mui/material';
import { BootBrandsList, FifaCalculations, TeamMembers } from '../../constants/constants';
import classes from '../PlayerCards/player-cards.module.css';
import matchDetailsClasses from '../MatchDetails/match-details.module.css';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import NumbersIcon from '@mui/icons-material/Numbers';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import CopyrightIcon from '@mui/icons-material/Copyright';
import SoccerLineUp from 'react-soccer-lineup';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import Looks3Icon from '@mui/icons-material/Looks3';
import PushPinIcon from '@mui/icons-material/PushPin';
import ScoreboardsGrid from '../ScoreboardsGrid/scoreboards-grid';
import { loadWebsite } from '../../firebase';
import CakeIcon from '@mui/icons-material/Cake';
import PlayerRadarChart from '../PlayerRadarChart/player-radar-chart';
import bootBrandsClasses from '../BootBrands/boot-brands.module.css';
import NikeLogo from '../../images/nike.png';
import AdidasLogo from '../../images/adidas.png';
import PumaLogo from '../../images/puma.png';
import TollIcon from '@mui/icons-material/Toll';
import BackButton from '../../shared/BackButton/back-button';
import { useSelector } from 'react-redux';
import PsychologyIcon from '@mui/icons-material/Psychology';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import ShieldIcon from '@mui/icons-material/Shield';
import PanToolIcon from '@mui/icons-material/PanTool';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import {
    calculateAttributes,
    calculateOverall,
    calculatePlayerRatings,
    getPlayerStats,
    returnAverageData,
} from '../../utils/utils';
import { useNavigate } from 'react-router-dom';
import ListComponent from '../../shared/ListComponent/list-component';

function CustomTabs(props?: any) {
    const { children, value, index, ...other } = props;

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

function a11yProps(index?: any) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface PlayerCardsProps {
    playerName?: any;
}

const PlayerCards: React.FC<PlayerCardsProps> = ({ playerName }) => {
    const { allData, filteredData } = useSelector((state: any) => state.databaseData);
    const { signedIn } = useSelector((state: any) => state.credentials);
    const isMobile = window.innerWidth <= 768;
    const [tabValue, setTabValue] = React.useState(0);
    const playerNumber = Object.values(TeamMembers).find((x) => x.name === playerName)?.number;
    const imageUrl = Object.entries(TeamMembers).find((x) => x[1].name === playerName)?.[0];
    const playerFoot =
        playerName === TeamMembers.atakan.name
            ? 'Left'
            : playerName === TeamMembers.yigit.name || playerName === TeamMembers.mert.name
              ? 'Both'
              : 'Right';
    const filteredWithPlayerData = Object.values(filteredData).filter((x: any) => {
        return Object.keys(x.oyesfc.squad).includes(playerName);
    });
    const [ratesData, setRatesData] = useState(null);
    const [playerRatingMvp, setPlayerRatingMvp] = useState<any>({
        rating: '-',
        mvp: 0,
    });
    const playerStats = getPlayerStats(filteredData, playerName);
    const playerBootBrand = Object.values(TeamMembers).find((x) => x.name === playerName)?.bootBrand;
    const playerBootCollection = Object.values(TeamMembers).find((x) => x.name === playerName)?.bootCollection;
    const playerBootModel = Object.values(TeamMembers).find((x) => x.name === playerName)?.bootModel;
    const [playerRatingData, setPlayerRatingData] = useState(null);
    const categories = ['Attacking', 'Skill', 'Movement', 'Power', 'Mentality', 'Defending', 'Goalkeeping'];
    const navigate = useNavigate();

    const returnIcon = (selection?: any) => {
        if (selection === categories[0]) {
            return (
                <FlashOnIcon
                    fontSize={isMobile ? 'medium' : 'large'}
                    className={matchDetailsClasses.generalInfoIcon}
                ></FlashOnIcon>
            );
        }
        if (selection === categories[1]) {
            return (
                <PrecisionManufacturingIcon
                    fontSize={isMobile ? 'medium' : 'large'}
                    className={matchDetailsClasses.generalInfoIcon}
                ></PrecisionManufacturingIcon>
            );
        }
        if (selection === categories[2]) {
            return (
                <DirectionsRunIcon
                    fontSize={isMobile ? 'medium' : 'large'}
                    className={matchDetailsClasses.generalInfoIcon}
                ></DirectionsRunIcon>
            );
        }
        if (selection === categories[3]) {
            return (
                <FitnessCenterIcon
                    fontSize={isMobile ? 'medium' : 'large'}
                    className={matchDetailsClasses.generalInfoIcon}
                ></FitnessCenterIcon>
            );
        }
        if (selection === categories[4]) {
            return (
                <PsychologyIcon
                    fontSize={isMobile ? 'medium' : 'large'}
                    className={matchDetailsClasses.generalInfoIcon}
                ></PsychologyIcon>
            );
        }
        if (selection === categories[5]) {
            return (
                <ShieldIcon
                    fontSize={isMobile ? 'medium' : 'large'}
                    className={matchDetailsClasses.generalInfoIcon}
                ></ShieldIcon>
            );
        }
        if (selection === categories[6]) {
            return (
                <PanToolIcon
                    fontSize={isMobile ? 'medium' : 'large'}
                    className={matchDetailsClasses.generalInfoIcon}
                ></PanToolIcon>
            );
        }
        return null;
    };

    const calculateAge = () => {
        const year = Object.values(TeamMembers).find((x) => x.name === playerName)?.birthYear || 0;
        const month = Object.values(TeamMembers).find((x) => x.name === playerName)?.birthMonth || 0;
        const day = Object.values(TeamMembers).find((x) => x.name === playerName)?.birthDay || 0;
        const inputDateTime = new Date(year, month - 1, day);
        const now = new Date();
        const thisYearBirthDate = new Date(now.getFullYear(), month - 1, day);
        if (thisYearBirthDate > now) return now.getFullYear() - inputDateTime.getFullYear() - 1;
        return now.getFullYear() - inputDateTime.getFullYear();
    };

    useEffect(() => {
        if (!ratesData) {
            fetchRatesData().then((r) => r);
        }
    });

    const handleTabChange = (event?: any, newTabValue?: any) => {
        setTabValue(newTabValue);
    };

    const styles = {
        card: {
            position: 'relative',
            backgroundColor: 'black',
            width: '100%',
            height: '100%',
            overflow: 'auto',
            overflowX: 'hidden',
        },
        media: {
            height: '400px',
            borderRadius: { xs: '12px', md: '12px 12px 0 0' },
            objectFit: 'cover',
            objectPosition: { xs: '', md: '0 -100px' },
        },
        content: {
            position: 'absolute',
            bottom: '49.5%',
            left: 0,
            right: 0,
            backgroundColor: 'black',
            color: 'white',
            padding: '10px',
            width: '100%',
            textAlign: 'center',
        },
    };

    const positionStyle = {
        color: 'black',
        numberColor: 'goldenrod',
        nameColor: 'black',
    };

    const oyesfcSquad = {
        [TeamMembers.atakan.name]: {
            squad: {
                df: [
                    { name: 'LB', number: 2 },
                    { name: 'CB', number: 1 },
                    { name: 'RB', number: 3 },
                ],
                cm: [],
                fw: [],
            },
            style: positionStyle,
        },
        [TeamMembers.yigit.name]: {
            squad: {
                df: [],
                cdm: [],
                cm: [{ name: 'CM', number: 3 }],
                cam: [{ name: 'CAM', number: 1 }],
                fw: [{ name: 'CF', number: 2 }],
            },
            style: positionStyle,
        },
        [TeamMembers.can.name]: {
            squad: {
                gk: { name: 'GK', number: 1 },
            },
            style: positionStyle,
        },
        [TeamMembers.mert.name]: {
            squad: {
                df: [],
                cm: [],
                fw: [
                    { name: 'LW', number: 1 },
                    { name: 'CF', number: 3 },
                    { name: 'RW', number: 2 },
                ],
            },
            style: positionStyle,
        },
        [TeamMembers.oguzhan.name]: {
            squad: {
                df: [
                    { name: 'LB', number: 3 },
                    { name: 'CB', number: 2 },
                    { name: 'RB', number: 1 },
                ],
                cm: [],
                fw: [],
            },
            style: positionStyle,
        },
        [TeamMembers.berent.name]: {
            squad: {
                df: [],
                cm: [],
                fw: [
                    { name: 'LW', number: 2 },
                    { name: 'CF', number: 3 },
                    { name: 'RW', number: 1 },
                ],
            },
            style: positionStyle,
        },
        [TeamMembers.berk.name]: {
            squad: {
                df: [
                    { name: 'LWB', number: 1 },
                    { name: 'CB', number: 2 },
                    { name: 'RWB', number: 3 },
                ],
                cm: [],
                fw: [],
            },
            style: positionStyle,
        },
        [TeamMembers.mehmet.name]: {
            squad: {
                df: [{ name: 'CB', number: 1 }],
                cm: [],
                fw: [],
            },
            style: positionStyle,
        },
        [TeamMembers.gokhan.name]: {
            squad: {
                df: [],
                cdm: [{ name: 'CDM', number: 2 }],
                cm: [{ name: 'CM', number: 1 }],
                cam: [{ name: 'CAM', number: 3 }],
                fw: [],
            },
            style: positionStyle,
        },
        [TeamMembers.ogulcan.name]: {
            squad: {
                df: [],
                cdm: [{ name: 'CDM', number: 3 }],
                cm: [{ name: 'CM', number: 1 }],
                cam: [{ name: 'CAM', number: 2 }],
                fw: [],
            },
            style: positionStyle,
        },
        [TeamMembers.utku.name]: {
            squad: {
                df: [{ name: 'LWB', number: 2 }, { color: 'green' }, { name: 'RWB', number: 1 }],
                cm: [],
                fw: [],
            },
            style: positionStyle,
        },
    };

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
    };

    const fetchRatesData = async () => {
        try {
            const response: any = await loadWebsite(`rates`);
            if (response) {
                const data = calculatePlayerRatings(response, allData, filteredData, playerName);
                if (data) setPlayerRatingMvp(data);
                setRatesData(response);
            }
        } catch (error: any) {
            alert(error?.message);
        }
    };

    const handleBack = (data?: any) => {
        if (data) {
            navigate('/oyesfc-react/individual-stats');
        }
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await loadWebsite(`playerRatings/${playerName}`);
                if (response && Object.keys(response)?.length > 3) calculatePlayerRating(response);
            } catch (error: any) {
                alert(error?.message);
            }
        }

        fetchData().then((r) => r);
    }, [playerName]);

    const calculatePlayerRating = (data?: any) => {
        const calculatedAverages = returnAverageData(data);
        setPlayerRatingData(calculatedAverages);
    };

    const attributes = calculateAttributes(playerRatingData, playerName);
    const attributeNames =
        playerName === TeamMembers.can.name
            ? ['Diving', 'Handling', 'Kicking', 'Reflex', 'Speed', 'Positioning']
            : ['Pace', 'Shooting', 'Passing', 'Dribbling', 'Defending', 'Physique'];
    const playerOverall =
        calculateOverall(
            Object.values(TeamMembers)
                .find((x) => x?.name === playerName)
                ?.fifaRole?.toLowerCase(),
            playerRatingData
        ) || 0;

    return (
        <Card sx={styles.card}>
            <BackButton handleBackButton={handleBack} generalTitle={playerName} />
            <Box sx={{ display: { xs: 'flex', md: 'none' }, height: '30px' }}></Box>
            <CardMedia component="img" sx={styles.media} image={require(`../../images/${imageUrl}.jpeg`)} />
            <Box
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    bgcolor: { xs: 'black', md: '#1C1C1E' },
                    justifyContent: 'center',
                    display: 'flex',
                    borderRadius: '0 0 12px 12px',
                }}
            >
                <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    aria-label="basic tabs example"
                    scrollButtons
                    variant="scrollable"
                    sx={{
                        '& .MuiTabs-indicator': {
                            backgroundColor: 'lightgray',
                        },
                        '& .MuiTabScrollButton-root': {
                            color: 'gray',
                        },
                    }}
                >
                    <Tab
                        sx={{
                            '&.MuiTab-root': {
                                color: 'gray',
                            },
                            '&.Mui-selected': {
                                color: 'lightgray',
                            },
                        }}
                        label="profile"
                        {...a11yProps(0)}
                    />
                    <Tab
                        sx={{
                            '&.MuiTab-root': {
                                color: 'gray',
                            },
                            '&.Mui-selected': {
                                color: 'lightgray',
                            },
                        }}
                        label="statistics"
                        {...a11yProps(1)}
                    />
                    <Tab
                        sx={{
                            '&.MuiTab-root': {
                                color: 'gray',
                            },
                            '&.Mui-selected': {
                                color: 'lightgray',
                            },
                        }}
                        label="matches"
                        {...a11yProps(2)}
                    />
                    {signedIn && playerRatingData && (
                        <Tab
                            sx={{
                                '&.MuiTab-root': {
                                    color: 'gray',
                                },
                                '&.Mui-selected': {
                                    color: 'lightgray',
                                },
                            }}
                            label="rating"
                            {...a11yProps(3)}
                        />
                    )}
                </Tabs>
            </Box>
            <Box
                sx={{
                    borderBottom: { xs: '1px solid #252525', md: 0 },
                    display: { xs: 'block', md: 'none' },
                }}
            ></Box>
            <CustomTabs value={tabValue} index={0}>
                {playerName === TeamMembers.yigit.name && (
                    <>
                        <div style={{ height: '20px' }}></div>
                        <div className={classes.captainDiv}>
                            <section className={matchDetailsClasses.momSection}>
                                <>
                                    <CopyrightIcon
                                        fontSize={isMobile ? 'medium' : 'large'}
                                        className={matchDetailsClasses.starIcon}
                                    ></CopyrightIcon>
                                </>
                                <div className={matchDetailsClasses.momDetailsDiv}>
                                    <span className={matchDetailsClasses.momNameSpan}>Captain</span>
                                </div>
                            </section>
                        </div>
                    </>
                )}
                <div style={{ height: '20px' }}></div>
                <section className={matchDetailsClasses.squadSection}>
                    <div className={classes.generalInfoDiv}>
                        <div className={classes.generalInfoInsideDiv}>
                            <CakeIcon fontSize={isMobile ? 'medium' : 'large'} className={classes.iconStyle}></CakeIcon>
                            <span className={classes.belowIconSpan}>{calculateAge()}</span>
                        </div>
                        <div className={classes.generalInfoInsideDiv}>
                            <NumbersIcon
                                fontSize={isMobile ? 'medium' : 'large'}
                                className={classes.iconStyle}
                            ></NumbersIcon>
                            <span className={classes.belowIconSpan}>{playerNumber}</span>
                        </div>
                        <div className={classes.generalInfoInsideDiv}>
                            <TransferWithinAStationIcon
                                fontSize={isMobile ? 'medium' : 'large'}
                                className={classes.iconStyle}
                            ></TransferWithinAStationIcon>
                            <span className={classes.belowIconSpan}>{playerFoot}</span>
                        </div>
                    </div>
                </section>
                <div style={{ height: '20px' }}></div>
                <section className={matchDetailsClasses.squadSection}>
                    <div className={matchDetailsClasses.generalInfoDiv}>
                        <PushPinIcon
                            fontSize={isMobile ? 'medium' : 'large'}
                            className={matchDetailsClasses.generalInfoIcon}
                        ></PushPinIcon>
                        <span className={matchDetailsClasses.generalInfoSpan}>Positions</span>
                    </div>
                    <Divider sx={{ bgcolor: 'gray', margin: '10px' }} />
                    <div className={matchDetailsClasses.generalInfoDiv}>
                        <LooksOneIcon
                            fontSize={isMobile ? 'medium' : 'large'}
                            className={matchDetailsClasses.generalInfoIcon}
                        ></LooksOneIcon>
                        <span className={matchDetailsClasses.generalInfoSpan}>
                            {Object.entries(playersPositions)?.find((x) => x[0] === playerName)?.[1]?.[0]}
                        </span>
                    </div>
                    {playerName !== TeamMembers.can.name && playerName !== TeamMembers.mehmet.name && (
                        <div className={matchDetailsClasses.generalInfoDiv}>
                            <LooksTwoIcon
                                fontSize={isMobile ? 'medium' : 'large'}
                                className={matchDetailsClasses.generalInfoIcon}
                            ></LooksTwoIcon>
                            <span className={matchDetailsClasses.generalInfoSpan}>
                                {Object.entries(playersPositions)?.find((x) => x[0] === playerName)?.[1]?.[1]}
                            </span>
                        </div>
                    )}
                    {playerName !== TeamMembers.can.name &&
                        playerName !== TeamMembers.utku.name &&
                        playerName !== TeamMembers.mehmet.name && (
                            <div className={matchDetailsClasses.generalInfoDiv}>
                                <Looks3Icon
                                    fontSize={isMobile ? 'medium' : 'large'}
                                    className={matchDetailsClasses.generalInfoIcon}
                                ></Looks3Icon>
                                <span className={matchDetailsClasses.generalInfoSpan}>
                                    {Object.entries(playersPositions)?.find((x) => x[0] === playerName)?.[1]?.[2]}
                                </span>
                            </div>
                        )}
                    <div className={matchDetailsClasses.pitchStyleDiv}>
                        <SoccerLineUp size={'responsive'} homeTeam={oyesfcSquad[playerName]} color={'green'} />
                    </div>
                </section>
                {playerBootBrand && (
                    <>
                        <div style={{ height: '20px' }}></div>
                        <section className={matchDetailsClasses.squadSection}>
                            <div className={matchDetailsClasses.generalInfoDiv}>
                                <TollIcon
                                    fontSize={isMobile ? 'medium' : 'large'}
                                    className={matchDetailsClasses.generalInfoIcon}
                                ></TollIcon>
                                <span className={matchDetailsClasses.generalInfoSpan}>
                                    Football Boot
                                </span>
                            </div>
                            <Divider sx={{ bgcolor: 'gray', margin: '10px' }} />
                            <div className={classes.bootStyle}>
                                <img
                                    className={bootBrandsClasses.imageStyle}
                                    src={playerBootBrand === BootBrandsList.nike ? NikeLogo : playerBootBrand === BootBrandsList.adidas ? AdidasLogo : PumaLogo}
                                    alt={'1'}
                                />
                                <h1 className={classes.collectionNameStyle}>
                                    {playerBootCollection + ' ' + playerBootModel}
                                </h1>
                            </div>
                        </section>
                    </>
                )}
            </CustomTabs>
            <CustomTabs value={tabValue} index={1}>
                <div style={{ height: '20px' }}></div>
                <section className={matchDetailsClasses.squadSection}>
                    <div className={classes.generalPointsDiv}>
                        <div className={classes.generalInfoInsideDiv}>
                            <StarHalfIcon
                                fontSize={isMobile ? 'medium' : 'large'}
                                className={classes.iconStyle}
                            ></StarHalfIcon>
                            <span className={classes.belowIconSpan}>{playerRatingMvp?.rating}</span>
                        </div>
                        <div className={classes.generalInfoInsideDiv}>
                            <SportsSoccerIcon
                                fontSize={isMobile ? 'medium' : 'large'}
                                className={classes.iconStyle}
                            ></SportsSoccerIcon>
                            <span className={classes.belowIconSpan}>{playerStats?.totalGoal}</span>
                        </div>
                        <div className={classes.generalInfoInsideDiv}>
                            <MilitaryTechIcon
                                fontSize={isMobile ? 'medium' : 'large'}
                                className={classes.iconStyle}
                            ></MilitaryTechIcon>
                            <span className={classes.belowIconSpan}>{playerRatingMvp?.mvp}</span>
                        </div>
                    </div>
                </section>
                <div style={{ height: '20px' }}></div>
                <section className={matchDetailsClasses.squadSection}>
                    <List component="nav" aria-label="mailbox folders">
                        <ListItem
                            style={{
                                justifyContent: 'space-between',
                                display: 'flex',
                                textAlign: 'end',
                            }}
                        >
                            <p className={classes.fontStyle}>Matches</p>
                            <p className={classes.fontStyle}>{playerStats?.totalMatch}</p>
                        </ListItem>
                        <Divider sx={{ bgcolor: '#646464' }} variant="middle" color="red" />
                        <ListItem
                            style={{
                                justifyContent: 'space-between',
                                display: 'flex',
                                textAlign: 'end',
                            }}
                        >
                            <p className={classes.fontStyle}>Goals</p>
                            <p className={classes.fontStyle}>{playerStats?.totalGoal}</p>
                        </ListItem>
                        <Divider sx={{ bgcolor: '#646464' }} variant="middle" color="red" />
                        <ListItem
                            style={{
                                justifyContent: 'space-between',
                                display: 'flex',
                                textAlign: 'end',
                            }}
                        >
                            <p className={classes.fontStyle}>Goal per Game</p>
                            <p className={classes.fontStyle}>{playerStats?.goalPerGame}</p>
                        </ListItem>
                        <Divider sx={{ bgcolor: '#646464' }} variant="middle" />
                        <ListItem
                            style={{
                                justifyContent: 'space-between',
                                display: 'flex',
                                textAlign: 'end',
                            }}
                        >
                            <p className={classes.fontStyle}>Rating</p>
                            <p className={classes.fontStyle}>{playerRatingMvp?.rating}</p>
                        </ListItem>
                        <Divider sx={{ bgcolor: '#646464' }} variant="middle" color="red" />
                        <ListItem
                            style={{
                                justifyContent: 'space-between',
                                display: 'flex',
                                textAlign: 'end',
                            }}
                        >
                            <p className={classes.fontStyle}>Man of the Match Awards</p>
                            <p className={classes.fontStyle}>{playerRatingMvp?.mvp}</p>
                        </ListItem>
                        <Divider sx={{ bgcolor: '#646464' }} variant="middle" color="red" />
                        <ListItem
                            style={{
                                justifyContent: 'space-between',
                                display: 'flex',
                                textAlign: 'end',
                            }}
                        >
                            <p className={classes.fontStyle}>Rate of Attendance</p>
                            <p className={classes.fontStyle}>{playerStats?.attendanceRate}%</p>
                        </ListItem>
                    </List>
                </section>
                {
                    playerBootBrand &&
                    <>
                        <div style={{ height: '20px' }}></div>
                        <section className={matchDetailsClasses.squadSection}>
                            <ListComponent data={playerStats?.bootGoalsData} />
                        </section>
                    </>
                }
            </CustomTabs>
            <CustomTabs value={tabValue} index={2}>
                <div style={{ height: '20px' }}></div>
                <div className={classes.matchesDiv}>
                    <ScoreboardsGrid filteredWithPlayerData={filteredWithPlayerData} playerDetails={true} />
                </div>
            </CustomTabs>
            {signedIn && playerRatingData && (
                <CustomTabs value={tabValue} index={3}>
                    <div className={matchDetailsClasses.generalTabDiv}>
                        <div style={{ height: '20px' }}></div>
                        <section className={matchDetailsClasses.generalTabSection}>
                            <div className={matchDetailsClasses.generalInfoDiv}>
                                <span
                                    className={classes.ratingSpan}
                                    style={{
                                        background:
                                            Number(playerOverall) >= 80
                                                ? 'darkgreen'
                                                : Number(playerOverall) < 60
                                                  ? 'darkred'
                                                  : 'darkgoldenrod',
                                    }}
                                >
                                    {Number(playerOverall)?.toFixed(0)}
                                </span>
                                <span className={matchDetailsClasses.generalInfoSpan}>Overall</span>
                            </div>
                            <Divider sx={{ bgcolor: 'gray', margin: '10px' }} />
                            {attributes?.map((a, b) => (
                                <div key={b} className={matchDetailsClasses.generalInfoDiv}>
                                    <span
                                        className={classes.ratingSpan}
                                        style={{
                                            background:
                                                Number(a?.toFixed(0)) >= 80
                                                    ? 'darkgreen'
                                                    : Number(a?.toFixed(0)) < 60
                                                      ? 'darkred'
                                                      : 'darkgoldenrod',
                                        }}
                                    >
                                        {a?.toFixed(0)}
                                    </span>
                                    <span className={matchDetailsClasses.generalInfoSpan}>{attributeNames[b]}</span>
                                </div>
                            ))}
                        </section>
                    </div>
                    <div style={{ height: '20px' }}></div>
                    {<PlayerRadarChart playerName={playerName} attributes={attributes} />}
                    <div className={matchDetailsClasses.generalTabDiv}>
                        {categories.map((category, i) => (
                            <>
                                <div style={{ height: '20px' }}></div>
                                <section key={i} className={matchDetailsClasses.generalTabSection}>
                                    <div className={matchDetailsClasses.generalInfoDiv}>
                                        {returnIcon(category)}
                                        <span className={matchDetailsClasses.generalInfoSpan}>{category}</span>
                                    </div>
                                    <Divider
                                        sx={{
                                            bgcolor: 'gray',
                                            margin: '10px',
                                        }}
                                    />
                                    {Object.entries(playerRatingData)
                                        ?.filter(
                                            (z) => FifaCalculations.find((f) => f.name === z[0])?.category === category
                                        )
                                        ?.map((x, y) => (
                                            <div key={y} className={matchDetailsClasses.generalInfoDiv}>
                                                <span
                                                    className={classes.ratingSpan}
                                                    style={{
                                                        background:
                                                            Number(Number(x[1])?.toFixed(0)) >= 80
                                                                ? 'darkgreen'
                                                                : Number(Number(x[1])?.toFixed(0)) < 60
                                                                  ? 'darkred'
                                                                  : 'darkgoldenrod',
                                                    }}
                                                >
                                                    {Number(x[1])?.toFixed(0)}
                                                </span>
                                                <span className={matchDetailsClasses.generalInfoSpan}>{x[0]}</span>
                                            </div>
                                        ))}
                                </section>
                            </>
                        ))}
                    </div>
                </CustomTabs>
            )}
        </Card>
    );
};

export default PlayerCards;
