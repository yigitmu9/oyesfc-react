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
    const foreignNumberOfMatches = foreignData?.length;
    const mainNumberOfMatches = mainData?.length;
    const mainWonMatches = mainData?.filter(x => x?.oyesfc?.goal > x?.rival?.goal)?.length;
    const foreignWonMatches = foreignData?.filter(x => x?.oyesfc?.goal > x?.rival?.goal)?.length;
    const mainLostMatches = mainData?.filter(x => x?.oyesfc?.goal < x?.rival?.goal)?.length;
    const foreignLostMatches = foreignData?.filter(x => x?.oyesfc?.goal < x?.rival?.goal)?.length;
    const mainDrawMatches = mainData?.filter(x => x?.oyesfc?.goal === x?.rival?.goal)?.length;
    const foreignDrawMatches = foreignData?.filter(x => x?.oyesfc?.goal === x?.rival?.goal)?.length;
    let mainGoalsScored = 0
    mainData?.forEach(item => {
        mainGoalsScored += item?.oyesfc?.goal;
    });
    let foreignGoalsScored = 0
    foreignData?.forEach(item => {
        foreignGoalsScored += item?.oyesfc?.goal;
    });
    let mainGoalsConceded = 0
    mainData?.forEach(item => {
        mainGoalsConceded += item?.rival?.goal;
    });
    let foreignGoalsConceded = 0
    foreignData?.forEach(item => {
        foreignGoalsConceded += item?.rival?.goal;
    });
    const mainGoalDifference = mainGoalsScored - mainGoalsConceded;
    const foreignGoalDifference = foreignGoalsScored - foreignGoalsConceded;
    const mainScoredGoalsPerGame = (mainGoalsScored / mainNumberOfMatches)?.toFixed(2);
    const foreignScoredGoalsPerGame = (foreignGoalsScored / foreignNumberOfMatches)?.toFixed(2);
    const mainConcededGoalsPerGame = (mainGoalsConceded / mainNumberOfMatches)?.toFixed(2);
    const foreignConcededGoalsPerGame = (foreignGoalsConceded / foreignNumberOfMatches)?.toFixed(2);
    const mainWinRate = ((mainWonMatches / mainNumberOfMatches) * 100)?.toFixed(0);
    const foreignWinRate = ((foreignWonMatches / foreignNumberOfMatches) * 100)?.toFixed(0);
    const mainGraphRate = ((Number(mainWinRate) / (Number(mainWinRate) + Number(foreignWinRate))) * 100)?.toFixed(2);
    const foreignGraphRate = (100 - Number(mainGraphRate)).toString();
    const mainMatchGraphRate = ((mainNumberOfMatches / (mainNumberOfMatches + foreignNumberOfMatches)) * 100)?.toFixed(2);
    const mainWonGraphRate = ((mainWonMatches / (mainWonMatches + foreignWonMatches)) * 100)?.toFixed(2);
    const mainDrawGraphRate = ((mainDrawMatches / (mainDrawMatches + foreignDrawMatches)) * 100)?.toFixed(2);
    const mainLoseGraphRate = ((mainLostMatches / (mainLostMatches + foreignLostMatches)) * 100)?.toFixed(2);
    const mainScoredGraphRate = ((mainGoalsScored / (mainGoalsScored + foreignGoalsScored)) * 100)?.toFixed(2);
    const mainConcededGraphRate = ((mainGoalsConceded / (mainGoalsConceded + foreignGoalsConceded)) * 100)?.toFixed(2);
    const mainDifferenceGraphRate = ((mainGoalDifference / (mainGoalDifference + foreignGoalDifference)) * 100)?.toFixed(2);
    const mainScoredPerMatchGraphRate = ((Number(mainScoredGoalsPerGame) / (Number(mainScoredGoalsPerGame) + Number(foreignScoredGoalsPerGame))) * 100)?.toFixed(2);
    const mainConcededPerMatchGraphRate = ((Number(mainConcededGoalsPerGame) / (Number(mainConcededGoalsPerGame) + Number(foreignConcededGoalsPerGame))) * 100)?.toFixed(2);
    const foreignMatchGraphRate = (100 - Number(mainMatchGraphRate)).toString();
    const foreignWonGraphRate = (100 - Number(mainWonGraphRate)).toString();
    const foreignDrawGraphRate = (100 - Number(mainDrawGraphRate)).toString();
    const foreignLoseGraphRate = (100 - Number(mainLoseGraphRate)).toString();
    const foreignScoredGraphRate = (100 - Number(mainScoredGraphRate)).toString();
    const foreignConcededGraphRate = (100 - Number(mainConcededGraphRate)).toString();
    const foreignDifferenceGraphRate = (100 - Number(mainDifferenceGraphRate)).toString();
    const foreignScoredPerMatchGraphRate = (100 - Number(mainScoredPerMatchGraphRate)).toString();
    const foreignConcededPerMatchGraphRate = (100 - Number(mainConcededPerMatchGraphRate)).toString();
    Object.values(data).forEach(item => {
        Object.entries(item?.oyesfc?.squad).forEach(x => {
            if (!players.includes(x[0])) {
                foreignersTotalGoal += x[1].goal
            }
        })
    });
    const foreignersGoalPerMatch = (foreignersTotalGoal / foreignNumberOfMatches)?.toFixed(2);

    return (
        <div className={classes.grid}>
            <Card sx={{borderRadius: "25px", width: "100%", height: "auto"}}
                  style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center"}}>
                <h1 className={classes.titleStyle}>Main Squad Statistics</h1>
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
                                    <p className={classes.listItemSpanStyle}>Main Squad</p>
                                    <p className={classes.listItemSpanStyle}>Squad Including Foreigners</p>
                                </ListItem>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainWinRate}%</p>
                                    <p className={classes.listItemSpanStyle}>Win Rate</p>
                                    <p className={classes.listItemSpanStyle}>{foreignWinRate}%</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line} style={{width: mainGraphRate + '%', borderRadius: mainGraphRate === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignGraphRate + '%', borderRadius: foreignGraphRate === '100' ? '25px' : '0 25px 25px 0'}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainNumberOfMatches}</p>
                                    <p className={classes.listItemSpanStyle}>Matches</p>
                                    <p className={classes.listItemSpanStyle}>{foreignNumberOfMatches}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line} style={{width: mainMatchGraphRate + '%', borderRadius: mainMatchGraphRate === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignMatchGraphRate + '%', borderRadius: foreignMatchGraphRate === '100' ? '25px' : '0 25px 25px 0'}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainWonMatches}</p>
                                    <p className={classes.listItemSpanStyle}>Wins</p>
                                    <p className={classes.listItemSpanStyle}>{foreignWonMatches}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line} style={{width: mainWonGraphRate + '%', borderRadius: mainWonGraphRate === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignWonGraphRate + '%', borderRadius: foreignWonGraphRate === '100' ? '25px' : '0 25px 25px 0'}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainDrawMatches}</p>
                                    <p className={classes.listItemSpanStyle}>Draws</p>
                                    <p className={classes.listItemSpanStyle}>{foreignDrawMatches}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line} style={{width: mainDrawGraphRate + '%', borderRadius: mainDrawGraphRate === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignDrawGraphRate + '%', borderRadius: foreignDrawGraphRate === '100' ? '25px' : '0 25px 25px 0'}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainLostMatches}</p>
                                    <p className={classes.listItemSpanStyle}>Losses</p>
                                    <p className={classes.listItemSpanStyle}>{foreignLostMatches}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line} style={{width: mainLoseGraphRate + '%', borderRadius: mainLoseGraphRate === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignLoseGraphRate + '%', borderRadius: foreignLoseGraphRate === '100' ? '25px' : '0 25px 25px 0'}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainGoalsScored}</p>
                                    <p className={classes.listItemSpanStyle}>Goals Scored</p>
                                    <p className={classes.listItemSpanStyle}>{foreignGoalsScored}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line} style={{width: mainScoredGraphRate + '%', borderRadius: mainScoredGraphRate === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignScoredGraphRate + '%', borderRadius: foreignScoredGraphRate === '100' ? '25px' : '0 25px 25px 0'}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainGoalsConceded}</p>
                                    <p className={classes.listItemSpanStyle}>Goals Conceded</p>
                                    <p className={classes.listItemSpanStyle}>{foreignGoalsConceded}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line} style={{width: mainConcededGraphRate + '%', borderRadius: mainConcededGraphRate === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignConcededGraphRate + '%', borderRadius: foreignConcededGraphRate === '100' ? '25px' : '0 25px 25px 0'}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainGoalDifference}</p>
                                    <p className={classes.listItemSpanStyle}>Goal Difference</p>
                                    <p className={classes.listItemSpanStyle}>{foreignGoalDifference}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line} style={{width: mainDifferenceGraphRate + '%', borderRadius: mainDifferenceGraphRate === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignDifferenceGraphRate + '%', borderRadius: foreignDifferenceGraphRate === '100' ? '25px' : '0 25px 25px 0'}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainScoredGoalsPerGame}</p>
                                    <p className={classes.listItemSpanStyle}>Scored per Match</p>
                                    <p className={classes.listItemSpanStyle}>{foreignScoredGoalsPerGame}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line} style={{width: mainScoredPerMatchGraphRate + '%', borderRadius: mainScoredPerMatchGraphRate === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignScoredPerMatchGraphRate + '%', borderRadius: foreignScoredPerMatchGraphRate === '100' ? '25px' : '0 25px 25px 0'}}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle}>{mainConcededGoalsPerGame}</p>
                                    <p className={classes.listItemSpanStyle}>Conceded per Match</p>
                                    <p className={classes.listItemSpanStyle}>{foreignConcededGoalsPerGame}</p>
                                </ListItem>
                                <div className={classes.graph}>
                                    <div className={classes.line} style={{width: mainConcededPerMatchGraphRate + '%', borderRadius: mainConcededPerMatchGraphRate === '100' ? '25px' : '25px 0 0 25px'}}></div>
                                    <div className={classes.line2} style={{width: foreignConcededPerMatchGraphRate + '%', borderRadius: foreignConcededPerMatchGraphRate === '100' ? '25px' : '0 25px 25px 0'}}></div>
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
                                    <div className={classes.line} style={{width: '0%', borderRadius: '25px'}}></div>
                                    <div className={classes.line2} style={{width: '100%', borderRadius: '25px'}}></div>
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
                                    <div className={classes.line} style={{width: '0%', borderRadius: '25px'}}></div>
                                    <div className={classes.line2} style={{width: '100%', borderRadius: '25px'}}></div>
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