import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {Divider, List, ListItem, Tab, Tabs, Typography} from "@mui/material";
import {TeamMembers} from "../../constants/constants";
import classes from "../PlayerCards/player-cards.module.css"
import matchDetailsClasses from "../MatchDetails/match-details.module.css"
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import StarIcon from "@mui/icons-material/Star";
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import DoNotStepIcon from '@mui/icons-material/DoNotStep';
import PublicIcon from '@mui/icons-material/Public';
import NumbersIcon from '@mui/icons-material/Numbers';
import HeightIcon from '@mui/icons-material/Height';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import FlagIcon from '@mui/icons-material/Flag';
import {Soap} from "@mui/icons-material";

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
                    <Typography>{children}</Typography>
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

const PlayerCards = ({playerName, data}) => {

    const isMobile = window.innerWidth <= 768;
    let playerTotalGoal = 0;
    const [tabValue, setTabValue] = React.useState(0);
    const numberOfMatches = Object.values(data).length;
    const playerFoot = playerName === TeamMembers.atakan.name ? 'Left' :
        (playerName === TeamMembers.yigit.name || playerName === TeamMembers.mert.name) ? 'Both' : 'Right';

    Object.values(data).forEach(item => {
        if (item?.oyesfc?.squad[playerName] && playerName !== TeamMembers.can.name) {
            playerTotalGoal += item.oyesfc.squad[playerName].goal;
        }
    });

    const playerTotalMatch = Object.values(data).filter(item =>
        Object.keys(item.oyesfc.squad).includes(playerName)).length;

    const playerNumber = Object.values(TeamMembers).find(x => x.name === playerName).number;

    const imageUrl = Object.entries(TeamMembers).find(x => x[1].name === playerName)[0];

    const getPlayerName = () => {
        if (playerName === TeamMembers.yigit.name) {
            return playerName + ' (C) ';
        } else if (playerName === TeamMembers.can.name) {
            return playerName + ' (GK) ';
        }
        return playerName
    };

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
            overflow: 'auto'
        },
        media: {
            height: '50%',
        },
        content: {
            position: 'absolute',
            bottom: '50%',
            left: 0,
            right: 0,
            backgroundColor: '#323232',
            color: 'white',
            padding: '10px',
            width: '100%',
            textAlign: 'center'
        },
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
                      scrollButtons allowScrollButtonsMobilex variant="scrollable"
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
                    }} label="position" {...a11yProps(1)} />
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

                <section className={matchDetailsClasses.squadSection}>
                    <div className={classes.generalPointsDiv}>
                        <div className={classes.generalInfoInsideDiv}>
                            <StarHalfIcon fontSize={isMobile ? 'medium' : 'large'} className={classes.iconStyle}>
                            </StarHalfIcon>
                            <span className={classes.belowIconSpan}>?</span>
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
                            <span className={classes.belowIconSpan}>?</span>
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
                            <p className={classes.fontStyle}>Goal per Game</p>
                            <p className={classes.fontStyle}>{(playerTotalGoal / playerTotalMatch).toFixed(2)}</p>
                        </ListItem>
                        <Divider sx={{bgcolor: "#646464"}} variant="middle"/>
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
                    <div className={classes.generalInfoDiv}>
                        <div className={classes.generalInfoInsideDiv}>
                            <FlagIcon fontSize={isMobile ? 'medium' : 'large'} className={classes.iconStyle}>
                            </FlagIcon>
                            <span className={classes.belowIconSpan}>Turkey</span>
                        </div>
                        <div className={classes.generalInfoInsideDiv}>
                            <NumbersIcon fontSize={isMobile ? 'medium' : 'large'} className={classes.iconStyle}>
                            </NumbersIcon>
                            <span className={classes.belowIconSpan}>
                                {Object.values(TeamMembers).find(x => x.name === playerName).number}
                            </span>
                        </div>
                        <div className={classes.generalInfoInsideDiv}>
                            <TransferWithinAStationIcon fontSize={isMobile ? 'medium' : 'large'} className={classes.iconStyle}>
                            </TransferWithinAStationIcon>
                            <span className={classes.belowIconSpan}>{playerFoot}</span>
                        </div>
                    </div>
                </section>
            </CustomTabs>
            <CustomTabs value={tabValue} index={1}>

            </CustomTabs>
            <CustomTabs value={tabValue} index={2}>

            </CustomTabs>
        </Card>
    );
}

export default PlayerCards;
