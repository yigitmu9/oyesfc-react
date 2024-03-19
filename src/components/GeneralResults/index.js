import React from 'react';
import classes from "./general-results.module.css";
import CardContent from "@mui/material/CardContent";
import {Divider, List, ListItem} from "@mui/material";
import Card from "@mui/material/Card";
import {Doughnut} from "react-chartjs-2";
import {CategoryScale, Chart as linear, Chart} from "chart.js/auto";

const GeneralResults = ({data}) => {

    const numberOfMatches = Object.values(data)?.length;
    const wonMatches = Object.values(data)?.filter(x => x?.oyesfc?.goal > x?.rival?.goal)?.length;
    const lostMatches = Object.values(data)?.filter(x => x?.oyesfc?.goal < x?.rival?.goal)?.length;
    const drawMatches = Object.values(data)?.filter(x => x?.oyesfc?.goal === x?.rival?.goal)?.length;
    let goalsScored = 0
    Object.values(data)?.forEach(item => {
        goalsScored += item?.oyesfc?.goal;
    });
    let goalsConceded = 0
    Object.values(data)?.forEach(item => {
        goalsConceded += item?.rival?.goal;
    });
    const goalDifference = goalsScored - goalsConceded;
    const scoredGoalsPerGame = (goalsScored / numberOfMatches)?.toFixed(2);
    const concededGoalsPerGame = (goalsConceded / numberOfMatches)?.toFixed(2);
    const goalDifferencePerGame = (goalDifference / numberOfMatches)?.toFixed(2);

    const chartDatasets = {
        labels: ['Win', 'Draw', 'Lose'],
        datasets: [
            {
                label: 'Rate (%)',
                backgroundColor: ['green', 'yellow', 'red'],
                borderColor: 'black',
                borderWidth: 0,
                data: [
                    ((wonMatches / numberOfMatches) * 100)?.toFixed(0),
                    ((drawMatches / numberOfMatches) * 100)?.toFixed(0),
                    ((lostMatches / numberOfMatches) * 100)?.toFixed(0)
                ],
            }
        ]
    }

    const options = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'lightgray',
                    fontSize: 10,
                },
            },
        }
    };

    Chart.register(CategoryScale);
    linear.register(CategoryScale);

    return (
        <div className={classes.grid}>
            <Card sx={{ borderRadius: "25px", width: "100%", height: "auto" }} style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center"}}>
                <h1 className={classes.titleStyle}>O Yes FC General Statistics</h1>
                <CardContent style={{backgroundColor: "#242424"}}>
                    <div className={classes.cardInsideDiv}>
                        <div className={classes.chartDiv}>
                            <p className={classes.chartTitleStyle}>Win Rate</p>
                            <Doughnut
                                data={chartDatasets}
                                width={"100%"}
                                className={classes.chart}
                                options={options}
                            />
                        </div>
                        <div className={classes.tableDiv}>
                            <List  component="nav" aria-label="mailbox folders" style={{backgroundColor: "#242424", width: "80%"}}>
                                <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                    <p className={classes.listItemSpanStyle}>Matches</p>
                                    <p className={classes.listItemSpanStyle}>{numberOfMatches}</p>
                                </ListItem>
                                <Divider sx={{ bgcolor: "#646464" }} variant="middle" color="red"/>
                                <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                    <p className={classes.listItemSpanStyle}>Wins</p>
                                    <p className={classes.listItemSpanStyle}>{wonMatches}</p>
                                </ListItem>
                                <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                    <p className={classes.listItemSpanStyle}>Draws</p>
                                    <p className={classes.listItemSpanStyle}>{drawMatches}</p>
                                </ListItem>
                                <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                    <p className={classes.listItemSpanStyle}>Losses</p>
                                    <p className={classes.listItemSpanStyle}>{lostMatches}</p>
                                </ListItem>
                                <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                    <p className={classes.listItemSpanStyle}>Goals Scored</p>
                                    <p className={classes.listItemSpanStyle}>{goalsScored}</p>
                                </ListItem>
                                <Divider sx={{ bgcolor: "#646464" }} variant="middle" color="red"/>
                                <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                    <p className={classes.listItemSpanStyle}>Goals Conceded</p>
                                    <p className={classes.listItemSpanStyle}>{goalsConceded}</p>
                                </ListItem>
                                <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                    <p className={classes.listItemSpanStyle}>Goal Difference</p>
                                    <p className={classes.listItemSpanStyle}>{goalDifference}</p>
                                </ListItem>
                                <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                    <p className={classes.listItemSpanStyle}>Scored per Match</p>
                                    <p className={classes.listItemSpanStyle}>{scoredGoalsPerGame}</p>
                                </ListItem>
                                <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                    <p className={classes.listItemSpanStyle}>Conceded per Match</p>
                                    <p className={classes.listItemSpanStyle}>{concededGoalsPerGame}</p>
                                </ListItem>
                                <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                    <p className={classes.listItemSpanStyle}>Goal Difference per Match</p>
                                    <p className={classes.listItemSpanStyle}>{goalDifferencePerGame}</p>
                                </ListItem>
                            </List>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default GeneralResults;