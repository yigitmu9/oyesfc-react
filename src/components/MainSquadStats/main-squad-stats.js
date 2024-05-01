import React from 'react';
import classes from "./main-squad-stats.module.css";
import CardContent from "@mui/material/CardContent";
import {List, ListItem} from "@mui/material";
import Card from "@mui/material/Card";
import {TeamMembers} from "../../constants/constants";

const MainSquadStats = ({data}) => {

    let foreignDataIndex = [];
    let foreignersTotalGoal = 0;
    const players = Object.values(TeamMembers).map(x => x.name)
    Object.values(data).forEach((item, index) => {
        for (let i = 0; i < Object.keys(item.oyesfc.squad).length; i++) {
            if (!players.includes(Object.keys(item.oyesfc.squad)[i])) {
                if (!foreignDataIndex.includes(index)) {
                    foreignDataIndex.push(index)
                }
            }
        }
    });
    const mainData = Object.values(data).filter((x, y) => !foreignDataIndex.includes(y))
    const foreignData = Object.values(data).filter((x, y) => foreignDataIndex.includes(y))
    const foreignNumberOfMatchesStat = foreignData?.length;
    const mainNumberOfMatchesStat = mainData?.length;
    const mainWonMatchesStat = mainData?.filter(x => x?.oyesfc?.goal > x?.rival?.goal)?.length;
    const foreignWonMatchesStat = foreignData?.filter(x => x?.oyesfc?.goal > x?.rival?.goal)?.length;
    const mainLostMatchesStat = mainData?.filter(x => x?.oyesfc?.goal < x?.rival?.goal)?.length;
    const foreignLostMatchesStat = foreignData?.filter(x => x?.oyesfc?.goal < x?.rival?.goal)?.length;
    const mainDrawMatchesStat = mainData?.filter(x => x?.oyesfc?.goal === x?.rival?.goal)?.length;
    const foreignDrawMatchesStat = foreignData?.filter(x => x?.oyesfc?.goal === x?.rival?.goal)?.length;
    let mainGoalsScoredStat = 0
    mainData?.forEach(item => {
        mainGoalsScoredStat += item?.oyesfc?.goal;
    });
    let foreignGoalsScoredStat = 0
    foreignData?.forEach(item => {
        foreignGoalsScoredStat += item?.oyesfc?.goal;
    });
    let mainGoalsConcededStat = 0
    mainData?.forEach(item => {
        mainGoalsConcededStat += item?.rival?.goal;
    });
    let foreignGoalsConcededStat = 0
    foreignData?.forEach(item => {
        foreignGoalsConcededStat += item?.rival?.goal;
    });
    const mainGoalDifferenceStat = mainGoalsScoredStat - mainGoalsConcededStat;
    const foreignGoalDifferenceStat = foreignGoalsScoredStat - foreignGoalsConcededStat;
    const mainScoredGoalsPerGameStat = mainGoalsScoredStat !== 0 ? (mainGoalsScoredStat / mainNumberOfMatchesStat)?.toFixed(2) : '0';
    const foreignScoredGoalsPerGameStat = foreignGoalsScoredStat !== 0 ? (foreignGoalsScoredStat / foreignNumberOfMatchesStat)?.toFixed(2) : '0';
    const mainConcededGoalsPerGameStat = mainGoalsConcededStat !== 0 ? (mainGoalsConcededStat / mainNumberOfMatchesStat)?.toFixed(2) : '0';
    const foreignConcededGoalsPerGameStat = foreignGoalsConcededStat !== 0 ? (foreignGoalsConcededStat / foreignNumberOfMatchesStat)?.toFixed(2) : '0';
    const mainWinRateStat = mainWonMatchesStat !== 0 ? ((mainWonMatchesStat / mainNumberOfMatchesStat) * 100)?.toFixed(0) : '0';
    const foreignWinRateStat = foreignWonMatchesStat !== 0 ? ((foreignWonMatchesStat / foreignNumberOfMatchesStat) * 100)?.toFixed(0) : '0';
    const mainGraphRateStat = Number(mainWinRateStat) !== 0 ? ((Number(mainWinRateStat) / (Number(mainWinRateStat) + Number(foreignWinRateStat))) * 100)?.toFixed(0) : '0';
    const mainMatchGraphRateStat = mainNumberOfMatchesStat !== 0 ? ((mainNumberOfMatchesStat / (mainNumberOfMatchesStat + foreignNumberOfMatchesStat)) * 100)?.toFixed(0) : '0';
    const mainWonGraphRateStat = mainWonMatchesStat !== 0 ? ((mainWonMatchesStat / (mainWonMatchesStat + foreignWonMatchesStat)) * 100)?.toFixed(0) : '0';
    const mainDrawGraphRateStat = mainDrawMatchesStat !== 0 ? ((mainDrawMatchesStat / (mainDrawMatchesStat + foreignDrawMatchesStat)) * 100)?.toFixed(0) : '0';
    const mainLoseGraphRateStat = mainLostMatchesStat !== 0 ? ((mainLostMatchesStat / (mainLostMatchesStat + foreignLostMatchesStat)) * 100)?.toFixed(0) : '0';
    const mainScoredGraphRateStat = mainGoalsScoredStat !== 0 ? ((mainGoalsScoredStat / (mainGoalsScoredStat + foreignGoalsScoredStat)) * 100)?.toFixed(0) : '0';
    const mainConcededGraphRateStat = mainGoalsConcededStat !== 0 ? ((mainGoalsConcededStat / (mainGoalsConcededStat + foreignGoalsConcededStat)) * 100)?.toFixed(0) : '0';
    const mainDifferenceGraphRateStat = mainGoalDifferenceStat !== 0 ? ((mainGoalDifferenceStat / (mainGoalDifferenceStat + foreignGoalDifferenceStat)) * 100)?.toFixed(0) : '0';
    const mainScoredPerMatchGraphRateStat = Number(mainScoredGoalsPerGameStat) !== 0 ? ((Number(mainScoredGoalsPerGameStat) / (Number(mainScoredGoalsPerGameStat) + Number(foreignScoredGoalsPerGameStat))) * 100)?.toFixed(0) : '0';
    const mainConcededPerMatchGraphRateStat = Number(mainConcededGoalsPerGameStat) !== 0 ? ((Number(mainConcededGoalsPerGameStat) / (Number(mainConcededGoalsPerGameStat) + Number(foreignConcededGoalsPerGameStat))) * 100)?.toFixed(0) : '0';
    const foreignGraphRateStat = (100 - Number(mainGraphRateStat)).toString();
    const foreignMatchGraphRateStat = (100 - Number(mainMatchGraphRateStat)).toString();
    const foreignWonGraphRateStat = (100 - Number(mainWonGraphRateStat)).toString();
    const foreignDrawGraphRateStat = (100 - Number(mainDrawGraphRateStat)).toString();
    const foreignLoseGraphRateStat = (100 - Number(mainLoseGraphRateStat)).toString();
    const foreignScoredGraphRateStat = (100 - Number(mainScoredGraphRateStat)).toString();
    const foreignConcededGraphRateStat = (100 - Number(mainConcededGraphRateStat)).toString();
    const foreignDifferenceGraphRateStat = (100 - Number(mainDifferenceGraphRateStat)).toString();
    const foreignScoredPerMatchGraphRateStat = (100 - Number(mainScoredPerMatchGraphRateStat)).toString();
    const foreignConcededPerMatchGraphRateStat = (100 - Number(mainConcededPerMatchGraphRateStat)).toString();
    Object.values(data).forEach(item => {
        Object.entries(item?.oyesfc?.squad).forEach(x => {
            if (!players.includes(x[0])) {
                foreignersTotalGoal += x[1].goal
            }
        })
    });
    const foreignersGoalPerMatch = foreignersTotalGoal !== 0 ? (foreignersTotalGoal / foreignNumberOfMatchesStat)?.toFixed(2) : '0';
    const mainGoalDifferencePerMatch = mainGoalDifferenceStat !== 0 ? ((mainGoalDifferenceStat / mainNumberOfMatchesStat))?.toFixed(2) : '0';
    const foreignGoalDifferencePerMatch = foreignGoalDifferenceStat !== 0 ? ((foreignGoalDifferenceStat / foreignNumberOfMatchesStat))?.toFixed(2) : '0';
    const mainGoalDifferencePerMatchGraphRate = Number(mainGoalDifferencePerMatch) !== 0 ? ((Number(mainGoalDifferencePerMatch) / (Number(mainGoalDifferencePerMatch) + Number(foreignGoalDifferencePerMatch))) * 100)?.toFixed(0) : '0';
    const foreignGoalDifferencePerMatchGraphRate = Number(foreignGoalDifferencePerMatch) !== 0 ? ((Number(foreignGoalDifferencePerMatch) / (Number(mainGoalDifferencePerMatch) + Number(foreignGoalDifferencePerMatch))) * 100)?.toFixed(0) : '0';

    const setBarColor = (main, foreign) => {
        if (Number(main) === 0 && Number(foreign) === 0) {
            return 'black';
        }
        return 'darkturquoise';
    }

    return (
        <div className={classes.grid}>
            <Card sx={{borderRadius: "25px", width: "100%", height: "auto"}}
                  style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center"}}>
                <h1 className={classes.titleStyle}>Main Squad**</h1>
                <CardContent style={{backgroundColor: "#242424", width: "100%"}}>
                    <div className={classes.cardInsideDiv}>
                        <div className={classes.tableDiv}>
                            <List component="nav" aria-label="mailbox folders"
                                  style={{backgroundColor: "#242424", width: "100%"}}>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end",
                                    marginBottom: "20px"
                                }}>
                                    <div className={classes.subtitle}>
                                        <div className={classes.colorTitleDiv}>
                                            <div className={classes.colorTitle}></div>
                                        </div>
                                        <p className={classes.listItemSpanStyle}>Main Squad</p>
                                    </div>
                                    <div className={classes.subtitle}>
                                        <p className={classes.listItemSpanStyle2}>Squad Including Foreigners</p>
                                        <div className={classes.colorTitleDiv}>
                                            <div className={classes.colorTitle2}></div>
                                        </div>
                                    </div>
                                </ListItem>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainWinRateStat}%</p>
                                    <p className={classes.listItemSpanStyle}>Win Rate</p>
                                    <p className={classes.listItemSpanStyle}>{foreignWinRateStat}%</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line1} style={{width: mainGraphRateStat + '%', borderRadius: mainGraphRateStat === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignGraphRateStat + '%', borderRadius: foreignGraphRateStat === '100' ? '25px' : '0 25px 25px 0', backgroundColor: setBarColor(mainWinRateStat, foreignWinRateStat)}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainNumberOfMatchesStat}</p>
                                    <p className={classes.listItemSpanStyle}>Matches</p>
                                    <p className={classes.listItemSpanStyle}>{foreignNumberOfMatchesStat}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line1} style={{width: mainMatchGraphRateStat + '%', borderRadius: mainMatchGraphRateStat === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignMatchGraphRateStat + '%', borderRadius: foreignMatchGraphRateStat === '100' ? '25px' : '0 25px 25px 0', backgroundColor: setBarColor(mainNumberOfMatchesStat, foreignNumberOfMatchesStat)}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainWonMatchesStat}</p>
                                    <p className={classes.listItemSpanStyle}>Wins</p>
                                    <p className={classes.listItemSpanStyle}>{foreignWonMatchesStat}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line1} style={{width: mainWonGraphRateStat + '%', borderRadius: mainWonGraphRateStat === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignWonGraphRateStat + '%', borderRadius: foreignWonGraphRateStat === '100' ? '25px' : '0 25px 25px 0', backgroundColor: setBarColor(mainWonMatchesStat, foreignWonMatchesStat)}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainDrawMatchesStat}</p>
                                    <p className={classes.listItemSpanStyle}>Draws</p>
                                    <p className={classes.listItemSpanStyle}>{foreignDrawMatchesStat}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line1} style={{width: mainDrawGraphRateStat + '%', borderRadius: mainDrawGraphRateStat === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignDrawGraphRateStat + '%', borderRadius: foreignDrawGraphRateStat === '100' ? '25px' : '0 25px 25px 0', backgroundColor: setBarColor(mainDrawMatchesStat, foreignDrawMatchesStat)}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainLostMatchesStat}</p>
                                    <p className={classes.listItemSpanStyle}>Losses</p>
                                    <p className={classes.listItemSpanStyle}>{foreignLostMatchesStat}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line1} style={{width: mainLoseGraphRateStat + '%', borderRadius: mainLoseGraphRateStat === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignLoseGraphRateStat + '%', borderRadius: foreignLoseGraphRateStat === '100' ? '25px' : '0 25px 25px 0', backgroundColor: setBarColor(mainLostMatchesStat, foreignLostMatchesStat)}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainGoalsScoredStat}</p>
                                    <p className={classes.listItemSpanStyle}>Goals Scored</p>
                                    <p className={classes.listItemSpanStyle}>{foreignGoalsScoredStat}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line1} style={{width: mainScoredGraphRateStat + '%', borderRadius: mainScoredGraphRateStat === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignScoredGraphRateStat + '%', borderRadius: foreignScoredGraphRateStat === '100' ? '25px' : '0 25px 25px 0', backgroundColor: setBarColor(mainGoalsScoredStat, foreignGoalsScoredStat)}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainGoalsConcededStat}</p>
                                    <p className={classes.listItemSpanStyle}>Goals Conceded</p>
                                    <p className={classes.listItemSpanStyle}>{foreignGoalsConcededStat}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line1} style={{width: mainConcededGraphRateStat + '%', borderRadius: mainConcededGraphRateStat === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignConcededGraphRateStat + '%', borderRadius: foreignConcededGraphRateStat === '100' ? '25px' : '0 25px 25px 0', backgroundColor: setBarColor(mainGoalsConcededStat, foreignGoalsConcededStat)}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainGoalDifferenceStat}</p>
                                    <p className={classes.listItemSpanStyle}>Goal Difference</p>
                                    <p className={classes.listItemSpanStyle}>{foreignGoalDifferenceStat}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line1} style={{width: mainDifferenceGraphRateStat + '%', borderRadius: mainDifferenceGraphRateStat === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignDifferenceGraphRateStat + '%', borderRadius: foreignDifferenceGraphRateStat === '100' ? '25px' : '0 25px 25px 0', backgroundColor: setBarColor(mainGoalDifferenceStat, foreignGoalDifferenceStat)}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainScoredGoalsPerGameStat}</p>
                                    <p className={classes.listItemSpanStyle}>Scored per Match</p>
                                    <p className={classes.listItemSpanStyle}>{foreignScoredGoalsPerGameStat}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line1} style={{width: mainScoredPerMatchGraphRateStat + '%', borderRadius: mainScoredPerMatchGraphRateStat === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignScoredPerMatchGraphRateStat + '%', borderRadius: foreignScoredPerMatchGraphRateStat === '100' ? '25px' : '0 25px 25px 0', backgroundColor: setBarColor(mainScoredGoalsPerGameStat, foreignScoredGoalsPerGameStat)}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainConcededGoalsPerGameStat}</p>
                                    <p className={classes.listItemSpanStyle}>Conceded per Match</p>
                                    <p className={classes.listItemSpanStyle}>{foreignConcededGoalsPerGameStat}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line1} style={{width: mainConcededPerMatchGraphRateStat + '%', borderRadius: mainConcededPerMatchGraphRateStat === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignConcededPerMatchGraphRateStat + '%', borderRadius: foreignConcededPerMatchGraphRateStat === '100' ? '25px' : '0 25px 25px 0', backgroundColor: setBarColor(mainConcededGoalsPerGameStat, foreignConcededGoalsPerGameStat)}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainGoalDifferencePerMatch}</p>
                                    <p className={classes.listItemSpanStyle}>Goal Difference per Match</p>
                                    <p className={classes.listItemSpanStyle}>{foreignGoalDifferencePerMatch}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line1} style={{width: mainGoalDifferencePerMatchGraphRate + '%', borderRadius: mainGoalDifferencePerMatchGraphRate === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignGoalDifferencePerMatchGraphRate + '%', borderRadius: foreignGoalDifferencePerMatchGraphRate === '100' ? '25px' : '0 25px 25px 0', backgroundColor: setBarColor(mainGoalDifferencePerMatch, foreignGoalDifferencePerMatch)}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>-</p>
                                    <p className={classes.listItemSpanStyle}>Scored by Foreigners</p>
                                    <p className={classes.listItemSpanStyle}>{foreignersTotalGoal}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line1} style={{width: '0%', borderRadius: '25px'}}></div>
                                    <div className={classes.line2} style={{width: '100%', borderRadius: '25px', backgroundColor: setBarColor('0', foreignersTotalGoal)}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>-</p>
                                    <p className={classes.listItemSpanStyle}>Scored by Foreigners per Match</p>
                                    <p className={classes.listItemSpanStyle}>{foreignersGoalPerMatch}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line1} style={{width: '0%', borderRadius: '25px'}}></div>
                                    <div className={classes.line2} style={{width: '100%', borderRadius: '25px', backgroundColor: setBarColor('0', foreignersGoalPerMatch)}}></div>
                                </div>
                            </List>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default MainSquadStats;