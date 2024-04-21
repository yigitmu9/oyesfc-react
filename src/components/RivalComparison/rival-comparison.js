import React from 'react';
import classes from "./rival-comparison.module.css";
import CardContent from "@mui/material/CardContent";
import {FormControl, List, ListItem} from "@mui/material";
import Card from "@mui/material/Card";
import {TeamNames} from "../../constants/constants";
import facilitiesIndividualStatsClasses from "../FacilitiesIndividualStats/facilities-individual-stats.module.css";

const RivalComparison = ({data, selectedRival}) => {

    let rivalTeams = [];
    Object.values(data)?.forEach((x) => {
        if (!rivalTeams.includes(x?.rival?.name)) {
            rivalTeams.push(x?.rival?.name)
        }
    } )

    const [rival, setRival] = React.useState(selectedRival);

    const handleChange = (event) => {
        setRival(event.target.value);
    };

    const bgColor = selectedRival ? '#404040' : '#242424';
    const rivalData = Object.values(data).filter(x => x.rival.name === rival)
    const foreignNumberOfMatches = rivalData?.length;
    const mainNumberOfMatches = rivalData?.length;
    const mainWonMatches = rivalData?.filter(x => x?.oyesfc?.goal > x?.rival?.goal)?.length;
    const foreignWonMatches = rivalData?.filter(x => x?.oyesfc?.goal < x?.rival?.goal)?.length;
    const mainLostMatches = rivalData?.filter(x => x?.oyesfc?.goal < x?.rival?.goal)?.length;
    const foreignLostMatches = rivalData?.filter(x => x?.oyesfc?.goal > x?.rival?.goal)?.length;
    const mainDrawMatches = rivalData?.filter(x => x?.oyesfc?.goal === x?.rival?.goal)?.length;
    const foreignDrawMatches = rivalData?.filter(x => x?.oyesfc?.goal === x?.rival?.goal)?.length;
    let mainGoalsScored = 0
    rivalData?.forEach(item => {
        mainGoalsScored += item?.oyesfc?.goal;
    });
    let foreignGoalsScored = 0
    rivalData?.forEach(item => {
        foreignGoalsScored += item?.rival?.goal;
    });
    const mainGoalsConceded = foreignGoalsScored
    const foreignGoalsConceded = mainGoalsScored
    const mainGoalDifference = mainGoalsScored - mainGoalsConceded;
    const foreignGoalDifference = foreignGoalsScored - foreignGoalsConceded;
    const mainScoredGoalsPerGame = mainGoalsScored !== 0 ? (mainGoalsScored / mainNumberOfMatches)?.toFixed(2) : '0';
    const foreignScoredGoalsPerGame = foreignGoalsScored !== 0 ? (foreignGoalsScored / foreignNumberOfMatches)?.toFixed(2) : '0';
    const mainConcededGoalsPerGame = mainGoalsConceded !== 0 ? (mainGoalsConceded / mainNumberOfMatches)?.toFixed(2) : '0';
    const foreignConcededGoalsPerGame = foreignGoalsConceded !== 0 ? (foreignGoalsConceded / foreignNumberOfMatches)?.toFixed(2) : '0';
    const mainWinRate = mainWonMatches !== 0 ? ((mainWonMatches / mainNumberOfMatches) * 100)?.toFixed(0) : '0';
    const foreignWinRate = foreignWonMatches !== 0 ? ((foreignWonMatches / foreignNumberOfMatches) * 100)?.toFixed(0) : '0';
    const mainGraphRate = Number(mainWinRate) !== 0 ? ((Number(mainWinRate) / (Number(mainWinRate) + Number(foreignWinRate))) * 100)?.toFixed(0) : '0';
    const mainMatchGraphRate = mainNumberOfMatches !== 0 ? ((mainNumberOfMatches / (mainNumberOfMatches + foreignNumberOfMatches)) * 100)?.toFixed(0) : '0';
    const mainWonGraphRate = mainWonMatches !== 0 ? ((mainWonMatches / (mainWonMatches + foreignWonMatches)) * 100)?.toFixed(0) : '0';
    const mainDrawGraphRate = mainDrawMatches !== 0 ? ((mainDrawMatches / (mainDrawMatches + foreignDrawMatches)) * 100)?.toFixed(0) : '0';
    const mainLoseGraphRate = mainLostMatches !== 0 ? ((mainLostMatches / (mainLostMatches + foreignLostMatches)) * 100)?.toFixed(0) : '0';
    const mainScoredGraphRate = mainGoalsScored !== 0 ? ((mainGoalsScored / (mainGoalsScored + foreignGoalsScored)) * 100)?.toFixed(0) : '0';
    const mainConcededGraphRate = mainGoalsConceded !== 0 ? ((mainGoalsConceded / (mainGoalsConceded + foreignGoalsConceded)) * 100)?.toFixed(0) : '0';
    const mainDifferenceGraphRate = mainGoalDifference > foreignGoalDifference ? '100' : mainGoalDifference === foreignGoalDifference && mainGoalDifference !== 0 ? '50' : '0';
    const mainScoredPerMatchGraphRate = Number(mainScoredGoalsPerGame) !== 0 ? ((Number(mainScoredGoalsPerGame) / (Number(mainScoredGoalsPerGame) + Number(foreignScoredGoalsPerGame))) * 100)?.toFixed(0) : '0';
    const mainConcededPerMatchGraphRate = Number(mainConcededGoalsPerGame) !== 0 ? ((Number(mainConcededGoalsPerGame) / (Number(mainConcededGoalsPerGame) + Number(foreignConcededGoalsPerGame))) * 100)?.toFixed(0) : '0';
    const foreignGraphRate = (100 - Number(mainGraphRate)).toString();
    const foreignMatchGraphRate = (100 - Number(mainMatchGraphRate)).toString();
    const foreignWonGraphRate = (100 - Number(mainWonGraphRate)).toString();
    const foreignDrawGraphRate = (100 - Number(mainDrawGraphRate)).toString();
    const foreignLoseGraphRate = (100 - Number(mainLoseGraphRate)).toString();
    const foreignScoredGraphRate = (100 - Number(mainScoredGraphRate)).toString();
    const foreignConcededGraphRate = (100 - Number(mainConcededGraphRate)).toString();
    const foreignDifferenceGraphRate = (100 - Number(mainDifferenceGraphRate)).toString();
    const foreignScoredPerMatchGraphRate = (100 - Number(mainScoredPerMatchGraphRate)).toString();
    const foreignConcededPerMatchGraphRate = (100 - Number(mainConcededPerMatchGraphRate)).toString();
    const mainGoalDifferencePerMatch = mainGoalDifference !== 0 ? ((mainGoalDifference / mainNumberOfMatches))?.toFixed(2) : '0';
    const foreignGoalDifferencePerMatch = foreignGoalDifference !== 0 ? ((foreignGoalDifference / foreignNumberOfMatches))?.toFixed(2) : '0';
    const mainGoalDifferencePerMatchGraphRate= mainGoalDifferencePerMatch > foreignGoalDifferencePerMatch ? '100' : Number(mainGoalDifferencePerMatch) === Number(foreignGoalDifferencePerMatch) && Number(mainGoalDifferencePerMatch) !== 0 ? '50' : '0';
    const foreignGoalDifferencePerMatchGraphRate = (100 - Number(mainGoalDifferencePerMatchGraphRate)).toString();

    const setBarColor = (main, foreign) => {
        if (Number(main) === 0 && Number(foreign) === 0) {
            return 'black';
        }
        return 'darkblue';
    }

    return (
        <div className={ selectedRival ? classes.matchPageGrid : classes.grid}>
            <Card sx={{borderRadius:  selectedRival ? "0" : "25px", width: "100%", height: "auto"}}
                  style={{backgroundColor: selectedRival ? "#404040" : "#242424", justifyContent: "center", alignItems: "center"}}>
                {
                    !selectedRival ?
                        <>
                            <h1 className={classes.titleStyle}>Comparison with Rival</h1>
                            <div className={classes.selectionGrid}>
                                <div className={classes.selectionInsideGrid}>
                                    <FormControl className={classes.colorStyle} fullWidth>
                                        <label className={classes.colorStyle}>
                                            <select className={facilitiesIndividualStatsClasses.select}
                                                    onChange={handleChange}>
                                                <option>Select Rival</option>
                                                {rivalTeams.sort().map((x, y) => (
                                                    <option key={y} value={x}>{x}</option>
                                                ))}
                                            </select>
                                        </label>
                                    </FormControl>
                                </div>
                            </div>
                        </>
                        :
                        null
                }
                <CardContent style={{backgroundColor: selectedRival ? "#404040" : "#242424", width: "100%"}}>
                    <div className={classes.cardInsideDiv} style={{backgroundColor: bgColor}}>
                        <div className={selectedRival ? classes.matchPageTableDiv : classes.tableDiv} style={{backgroundColor: bgColor}}>
                            <List component="nav" aria-label="mailbox folders"
                                  style={{backgroundColor: selectedRival ? "#404040" : "#242424", width: "100%"}}>
                                <ListItem style={{
                                    backgroundColor: selectedRival ? "#404040" : "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end",
                                    marginBottom: "20px"
                                }}>
                                    <div className={classes.subtitle} style={{backgroundColor: bgColor}}>
                                    <div className={classes.colorTitleDiv} style={{backgroundColor: bgColor}}>
                                            <div className={classes.colorTitle}></div>
                                        </div>
                                        <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{TeamNames.oYesFc}</p>
                                    </div>
                                    <div className={classes.subtitle} style={{backgroundColor: bgColor}}>
                                        <p className={classes.listItemSpanStyle2} style={{backgroundColor: bgColor}}>{rival === 'Select Rival' || rival === null ? 'Rival' : rival}</p>
                                        <div className={classes.colorTitleDiv} style={{backgroundColor: bgColor}}>
                                            <div className={classes.colorTitle2}></div>
                                        </div>
                                    </div>
                                </ListItem>
                                <ListItem style={{
                                    backgroundColor: selectedRival ? "#404040" : "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{mainWinRate}%</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>Win Rate</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{foreignWinRate}%</p>
                                </ListItem>
                                <div className={classes.graph} style={{backgroundColor: bgColor}}>
                                    <div className={classes.line1} style={{
                                        width: mainGraphRate + '%',
                                        borderRadius: mainGraphRate === '100' ? '25px' : '25px 0 0 25px'
                                    }}></div>
                                    <div className={classes.line2} style={{
                                        width: foreignGraphRate + '%',
                                        borderRadius: foreignGraphRate === '100' ? '25px' : '0 25px 25px 0',
                                        backgroundColor: setBarColor(mainWinRate, foreignWinRate)
                                    }}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: selectedRival ? "#404040" : "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{mainNumberOfMatches}</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>Matches</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{foreignNumberOfMatches}</p>
                                </ListItem>
                                <div className={classes.graph} style={{backgroundColor: bgColor}}>
                                    <div className={classes.line1} style={{
                                        width: mainMatchGraphRate + '%',
                                        borderRadius: mainMatchGraphRate === '100' ? '25px' : '25px 0 0 25px'
                                    }}></div>
                                    <div className={classes.line2} style={{
                                        width: foreignMatchGraphRate + '%',
                                        borderRadius: foreignMatchGraphRate === '100' ? '25px' : '0 25px 25px 0',
                                        backgroundColor: setBarColor(mainNumberOfMatches, foreignNumberOfMatches)
                                    }}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: selectedRival ? "#404040" : "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{mainWonMatches}</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>Wins</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{foreignWonMatches}</p>
                                </ListItem>
                                <div className={classes.graph} style={{backgroundColor: bgColor}}>
                                    <div className={classes.line1} style={{
                                        width: mainWonGraphRate + '%',
                                        borderRadius: mainWonGraphRate === '100' ? '25px' : '25px 0 0 25px'
                                    }}></div>
                                    <div className={classes.line2} style={{
                                        width: foreignWonGraphRate + '%',
                                        borderRadius: foreignWonGraphRate === '100' ? '25px' : '0 25px 25px 0',
                                        backgroundColor: setBarColor(mainWonMatches, foreignWonMatches)
                                    }}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: selectedRival ? "#404040" : "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{mainDrawMatches}</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>Draws</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{foreignDrawMatches}</p>
                                </ListItem>
                                <div className={classes.graph} style={{backgroundColor: bgColor}}>
                                    <div className={classes.line1} style={{
                                        width: mainDrawGraphRate + '%',
                                        borderRadius: mainDrawGraphRate === '100' ? '25px' : '25px 0 0 25px'
                                    }}></div>
                                    <div className={classes.line2} style={{
                                        width: foreignDrawGraphRate + '%',
                                        borderRadius: foreignDrawGraphRate === '100' ? '25px' : '0 25px 25px 0',
                                        backgroundColor: setBarColor(mainDrawMatches, foreignDrawMatches)
                                    }}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: selectedRival ? "#404040" : "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{mainLostMatches}</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>Losses</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{foreignLostMatches}</p>
                                </ListItem>
                                <div className={classes.graph} style={{backgroundColor: bgColor}}>
                                    <div className={classes.line1} style={{
                                        width: mainLoseGraphRate + '%',
                                        borderRadius: mainLoseGraphRate === '100' ? '25px' : '25px 0 0 25px'
                                    }}></div>
                                    <div className={classes.line2} style={{
                                        width: foreignLoseGraphRate + '%',
                                        borderRadius: foreignLoseGraphRate === '100' ? '25px' : '0 25px 25px 0',
                                        backgroundColor: setBarColor(mainLostMatches, foreignLostMatches)
                                    }}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: selectedRival ? "#404040" : "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{mainGoalsScored}</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>Goals Scored</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{foreignGoalsScored}</p>
                                </ListItem>
                                <div className={classes.graph} style={{backgroundColor: bgColor}}>
                                    <div className={classes.line1} style={{
                                        width: mainScoredGraphRate + '%',
                                        borderRadius: mainScoredGraphRate === '100' ? '25px' : '25px 0 0 25px'
                                    }}></div>
                                    <div className={classes.line2} style={{
                                        width: foreignScoredGraphRate + '%',
                                        borderRadius: foreignScoredGraphRate === '100' ? '25px' : '0 25px 25px 0',
                                        backgroundColor: setBarColor(mainGoalsScored, foreignGoalsScored)
                                    }}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: selectedRival ? "#404040" : "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{mainGoalsConceded}</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>Goals Conceded</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{foreignGoalsConceded}</p>
                                </ListItem>
                                <div className={classes.graph} style={{backgroundColor: bgColor}}>
                                    <div className={classes.line1} style={{
                                        width: mainConcededGraphRate + '%',
                                        borderRadius: mainConcededGraphRate === '100' ? '25px' : '25px 0 0 25px'
                                    }}></div>
                                    <div className={classes.line2} style={{
                                        width: foreignConcededGraphRate + '%',
                                        borderRadius: foreignConcededGraphRate === '100' ? '25px' : '0 25px 25px 0',
                                        backgroundColor: setBarColor(mainGoalsConceded, foreignGoalsConceded)
                                    }}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: selectedRival ? "#404040" : "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{mainGoalDifference}</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>Goal Difference</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{foreignGoalDifference}</p>
                                </ListItem>
                                <div className={classes.graph} style={{backgroundColor: bgColor}}>
                                    <div className={classes.line1} style={{
                                        width: mainDifferenceGraphRate + '%',
                                        borderRadius: mainDifferenceGraphRate === '100' ? '25px' : '25px 0 0 25px'
                                    }}></div>
                                    <div className={classes.line2} style={{
                                        width: foreignDifferenceGraphRate + '%',
                                        borderRadius: foreignDifferenceGraphRate === '100' ? '25px' : '0 25px 25px 0',
                                        backgroundColor: setBarColor(mainGoalDifference, foreignGoalDifference)
                                    }}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: selectedRival ? "#404040" : "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{mainScoredGoalsPerGame}</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>Scored per Match</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{foreignScoredGoalsPerGame}</p>
                                </ListItem>
                                <div className={classes.graph} style={{backgroundColor: bgColor}}>
                                    <div className={classes.line1} style={{
                                        width: mainScoredPerMatchGraphRate + '%',
                                        borderRadius: mainScoredPerMatchGraphRate === '100' ? '25px' : '25px 0 0 25px'
                                    }}></div>
                                    <div className={classes.line2} style={{
                                        width: foreignScoredPerMatchGraphRate + '%',
                                        borderRadius: foreignScoredPerMatchGraphRate === '100' ? '25px' : '0 25px 25px 0',
                                        backgroundColor: setBarColor(mainScoredGoalsPerGame, foreignScoredGoalsPerGame)
                                    }}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: selectedRival ? "#404040" : "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{mainConcededGoalsPerGame}</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>Conceded per Match</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{foreignConcededGoalsPerGame}</p>
                                </ListItem>
                                <div className={classes.graph} style={{backgroundColor: bgColor}}>
                                    <div className={classes.line1} style={{
                                        width: mainConcededPerMatchGraphRate + '%',
                                        borderRadius: mainConcededPerMatchGraphRate === '100' ? '25px' : '25px 0 0 25px'
                                    }}></div>
                                    <div className={classes.line2} style={{
                                        width: foreignConcededPerMatchGraphRate + '%',
                                        borderRadius: foreignConcededPerMatchGraphRate === '100' ? '25px' : '0 25px 25px 0',
                                        backgroundColor: setBarColor(mainConcededGoalsPerGame, foreignConcededGoalsPerGame)
                                    }}></div>
                                </div>
                                <ListItem style={{
                                    backgroundColor: selectedRival ? "#404040" : "#242424",
                                    justifyContent: "space-between",
                                    display: "flex",
                                    textAlign: "end"
                                }}>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{mainGoalDifferencePerMatch}</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>Goal Difference per Match</p>
                                    <p className={classes.listItemSpanStyle} style={{backgroundColor: bgColor}}>{foreignGoalDifferencePerMatch}</p>
                                </ListItem>
                                <div className={classes.graph} style={{backgroundColor: bgColor}}>
                                    <div className={classes.line1} style={{
                                        width: mainGoalDifferencePerMatchGraphRate + '%',
                                        borderRadius: mainGoalDifferencePerMatchGraphRate === '100' ? '25px' : '25px 0 0 25px'
                                    }}></div>
                                    <div className={classes.line2} style={{
                                        width: foreignGoalDifferencePerMatchGraphRate + '%',
                                        borderRadius: foreignGoalDifferencePerMatchGraphRate === '100' ? '25px' : '0 25px 25px 0',
                                        backgroundColor: setBarColor(mainGoalDifferencePerMatch, foreignGoalDifferencePerMatch)
                                    }}></div>
                                </div>
                            </List>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default RivalComparison;