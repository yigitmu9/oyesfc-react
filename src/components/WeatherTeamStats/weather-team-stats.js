import React from 'react';
import classes from "./weather-team-stats.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import SevereColdIcon from '@mui/icons-material/SevereCold';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import {Divider, List, ListItem} from "@mui/material";
import generalResultsClasses from '../GeneralResults/general-results.module.css'

const WeatherTeamStats = ({data}) => {

    const hotWeatherData = Object.values(data).filter(item => item?.weather?.temperature > 15);
    const numberOfMatches = Object.values(hotWeatherData)?.length;
    const wonMatches = Object.values(hotWeatherData)?.filter(x => x?.oyesfc?.goal > x?.rival?.goal)?.length;
    const lostMatches = Object.values(hotWeatherData)?.filter(x => x?.oyesfc?.goal < x?.rival?.goal)?.length;
    const drawMatches = Object.values(hotWeatherData)?.filter(x => x?.oyesfc?.goal === x?.rival?.goal)?.length;
    let goalsScored = 0
    Object.values(hotWeatherData)?.forEach(item => {
        goalsScored += item?.oyesfc?.goal;
    });
    let goalsConceded = 0
    Object.values(hotWeatherData)?.forEach(item => {
        goalsConceded += item?.rival?.goal;
    });
    const goalDifference = goalsScored - goalsConceded;
    const scoredGoalsPerGame = (goalsScored / numberOfMatches)?.toFixed(2);
    const concededGoalsPerGame = (goalsConceded / numberOfMatches)?.toFixed(2);
    const goalDifferencePerGame = (goalDifference / numberOfMatches)?.toFixed(2);

    const coldWeatherData = Object.values(data).filter(item => item?.weather?.temperature < 16);
    const numberOfMatchesCold = Object.values(coldWeatherData)?.length;
    const wonMatchesCold = Object.values(coldWeatherData)?.filter(x => x?.oyesfc?.goal > x?.rival?.goal)?.length;
    const lostMatchesCold = Object.values(coldWeatherData)?.filter(x => x?.oyesfc?.goal < x?.rival?.goal)?.length;
    const drawMatchesCold = Object.values(coldWeatherData)?.filter(x => x?.oyesfc?.goal === x?.rival?.goal)?.length;
    let goalsScoredCold = 0
    Object.values(coldWeatherData)?.forEach(item => {
        goalsScoredCold += item?.oyesfc?.goal;
    });
    let goalsConcededCold = 0
    Object.values(coldWeatherData)?.forEach(item => {
        goalsConcededCold += item?.rival?.goal;
    });
    const goalDifferenceCold = goalsScoredCold - goalsConcededCold;
    const scoredGoalsPerGameCold = (goalsScoredCold / numberOfMatchesCold)?.toFixed(2);
    const concededGoalsPerGameCold = (goalsConcededCold / numberOfMatchesCold)?.toFixed(2);
    const goalDifferencePerGameCold = (goalDifferenceCold / numberOfMatchesCold)?.toFixed(2);

    return (
        <div className={classes.grid}>
            <div className={classes.cardGrid}>
                <Card sx={{ borderRadius: "25px", width: "100%", height: "100%", backgroundColor: "#242424" }} style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center"}}>
                    <h1 className={classes.titleStyle}>Hot Weather{' (>15'}&#176;{')'}</h1>
                    <CardContent style={{backgroundColor: "#242424"}}>
                        <div className={classes.cardAlign}>
                            <div className={classes.iconDivStyle}>
                                <LocalFireDepartmentIcon sx={{width: "200px", height: "200px"}}
                                              className={classes.iconStyle}></LocalFireDepartmentIcon>
                            </div>
                            <div className={classes.percentageDiv}>
                                <List  component="nav" aria-label="mailbox folders" style={{backgroundColor: "#242424", width: "100%"}}>
                                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                        <p className={generalResultsClasses.listItemSpanStyle}>Matches</p>
                                        <p className={generalResultsClasses.listItemSpanStyle}>{numberOfMatches}</p>
                                    </ListItem>
                                    <Divider sx={{ bgcolor: "#646464" }} variant="middle" color="red"/>
                                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                        <p className={generalResultsClasses.listItemSpanStyle}>Wins (Rate)</p>
                                        <p className={generalResultsClasses.listItemSpanStyle}>{wonMatches + ' ('  + ((wonMatches / numberOfMatches) * 100)?.toFixed(0) + '%)'}</p>
                                    </ListItem>
                                    <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                        <p className={generalResultsClasses.listItemSpanStyle}>Draws (Rate)</p>
                                        <p className={generalResultsClasses.listItemSpanStyle}>{drawMatches + ' ('  + ((drawMatches / numberOfMatches) * 100)?.toFixed(0) + '%)'}</p>
                                    </ListItem>
                                    <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                        <p className={generalResultsClasses.listItemSpanStyle}>Losses (Rate)</p>
                                        <p className={generalResultsClasses.listItemSpanStyle}>{lostMatches + ' ('  + ((lostMatches / numberOfMatches) * 100)?.toFixed(0) + '%)'}</p>
                                    </ListItem>
                                    <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                        <p className={generalResultsClasses.listItemSpanStyle}>Goals Scored (per Match)</p>
                                        <p className={generalResultsClasses.listItemSpanStyle}>{goalsScored + ' (' + scoredGoalsPerGame + ')'}</p>
                                    </ListItem>
                                    <Divider sx={{ bgcolor: "#646464" }} variant="middle" color="red"/>
                                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                        <p className={generalResultsClasses.listItemSpanStyle}>Goals Conceded (per Match)</p>
                                        <p className={generalResultsClasses.listItemSpanStyle}>{goalsConceded + ' (' + concededGoalsPerGame + ')'}</p>
                                    </ListItem>
                                    <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                        <p className={generalResultsClasses.listItemSpanStyle}>Goal Difference (per Match)</p>
                                        <p className={generalResultsClasses.listItemSpanStyle}>{goalDifference + ' (' + goalDifferencePerGame + ')'}</p>
                                    </ListItem>
                                </List>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className={classes.cardGrid}>
                <Card sx={{ borderRadius: "25px", width: "100%", height: "100%", backgroundColor: "#242424" }} style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center"}}>
                    <h1 className={classes.titleStyle}>Cold Weather{' (<16'}&#176;{')'}</h1>
                    <CardContent style={{backgroundColor: "#242424"}}>
                        <div className={classes.cardAlign}>
                            <div className={classes.iconDivStyle}>
                                <SevereColdIcon sx={{width: "200px", height: "200px"}}
                                                           className={classes.iconStyle}></SevereColdIcon>
                            </div>
                            <div className={classes.percentageDiv}>
                                <List  component="nav" aria-label="mailbox folders" style={{backgroundColor: "#242424", width: "100%"}}>
                                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                        <p className={generalResultsClasses.listItemSpanStyle}>Matches</p>
                                        <p className={generalResultsClasses.listItemSpanStyle}>{numberOfMatchesCold}</p>
                                    </ListItem>
                                    <Divider sx={{ bgcolor: "#646464" }} variant="middle" color="red"/>
                                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                        <p className={generalResultsClasses.listItemSpanStyle}>Wins (Rate)</p>
                                        <p className={generalResultsClasses.listItemSpanStyle}>{wonMatchesCold + ' ('  + ((wonMatchesCold / numberOfMatchesCold) * 100)?.toFixed(0) + '%)'}</p>
                                    </ListItem>
                                    <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                        <p className={generalResultsClasses.listItemSpanStyle}>Draws (Rate)</p>
                                        <p className={generalResultsClasses.listItemSpanStyle}>{drawMatchesCold + ' ('  + ((drawMatchesCold / numberOfMatchesCold) * 100)?.toFixed(0) + '%)'}</p>
                                    </ListItem>
                                    <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                        <p className={generalResultsClasses.listItemSpanStyle}>Losses (Rate)</p>
                                        <p className={generalResultsClasses.listItemSpanStyle}>{lostMatchesCold + ' ('  + ((lostMatchesCold / numberOfMatchesCold) * 100)?.toFixed(0) + '%)'}</p>
                                    </ListItem>
                                    <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                        <p className={generalResultsClasses.listItemSpanStyle}>Goals Scored (per Match)</p>
                                        <p className={generalResultsClasses.listItemSpanStyle}>{goalsScoredCold + ' (' + scoredGoalsPerGameCold + ')'}</p>
                                    </ListItem>
                                    <Divider sx={{ bgcolor: "#646464" }} variant="middle" color="red"/>
                                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                        <p className={generalResultsClasses.listItemSpanStyle}>Goals Conceded (per Match)</p>
                                        <p className={generalResultsClasses.listItemSpanStyle}>{goalsConcededCold + ' (' + concededGoalsPerGameCold + ')'}</p>
                                    </ListItem>
                                    <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                    <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                        <p className={generalResultsClasses.listItemSpanStyle}>Goal Difference (per Match)</p>
                                        <p className={generalResultsClasses.listItemSpanStyle}>{goalDifferenceCold + ' (' + goalDifferencePerGameCold + ')'}</p>
                                    </ListItem>
                                </List>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default WeatherTeamStats;