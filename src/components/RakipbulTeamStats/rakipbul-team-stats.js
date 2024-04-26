import React from 'react';
import classes from "./rakipbul-team-stats.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Doughnut} from "react-chartjs-2";
import {TeamNames} from "../../constants/constants";
import {CategoryScale, Chart as linear, Chart} from "chart.js/auto";
import {Divider, List, ListItem} from "@mui/material";

const RakipbulTeamStats = ({data}) => {

    let goalsScored = 0
    let ourPositions = 0
    let goalsConceded = 0
    let theirPositions = 0
    let rakipbulData = Object.values(data).filter(x => x?.oyesfc?.position);
    rakipbulData.forEach(item => {
        goalsScored += item?.oyesfc?.goal;
        ourPositions += item?.oyesfc?.position;
        goalsConceded += item?.rival?.goal;
        theirPositions += item?.rival?.position;
    });

    const chartDatasets = {
        labels: ['Goals', 'Missed chances'],
        datasets: [
            {
                label: 'Rate of Converting O Yes FC Positions Into Goals (%)',
                backgroundColor: ['green', 'blue'],
                borderColor: 'black',
                borderWidth: 0,
                data: [
                    ((goalsScored / ourPositions) * 100)?.toFixed(0),
                    100 - ((goalsScored / ourPositions) * 100)?.toFixed(0),
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
                },
            },
        }
    };

    const rivalChartDatasets = {
        labels: ['Goals Conceded', 'Evaded Positions'],
        datasets: [
            {
                label: 'Rate of Converting Rival Positions Into Goals (%)',
                backgroundColor: ['gray', 'darkred'],
                borderColor: 'black',
                borderWidth: 0,
                data: [
                    ((goalsConceded / theirPositions) * 100)?.toFixed(0),
                    100 - ((goalsConceded / theirPositions) * 100)?.toFixed(0),
                ],
            }
        ]
    }

    const rivalChartOptions = {
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'lightgray',
                },
            },
        }
    };

    Chart.register(CategoryScale);
    linear.register(CategoryScale);

    return (
    <div className={classes.grid}>
        <Card sx={{ borderRadius: "25px", width: "100%", height: "auto" }} style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center"}}>
            <h1 className={classes.titleStyle}>10 Specific Rakipbul Matches*</h1>
            <CardContent style={{backgroundColor: "#242424", marginBottom: "50px"}}>
                <div className={classes.cardContentInsideStyle}>
                    <div className={classes.chartStyle}>
                        <p className={classes.chartTitle}>Rate of Converting O Yes FC Positions Into Goals</p>
                        <Doughnut
                            data={chartDatasets}
                            width={"100%"}
                            className={classes.chart}
                            options={options}
                        />
                    </div>
                    <div className={classes.tableDiv}>
                        <List  component="nav" aria-label="mailbox folders" style={{backgroundColor: "#242424"}} className={classes.widthStyle}>
                            <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                <p className={classes.listItemSpanStyle}>{TeamNames.oYesFc}</p>
                                <p className={classes.listItemSpanStyle}></p>
                            </ListItem>
                            <div className={classes.spaceStyle}></div>
                            <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                            <div className={classes.spaceStyle}></div>
                            <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                <p className={classes.listItemSpanStyle}>Number of Positions</p>
                                <p className={classes.listItemSpanStyle}>{ourPositions}</p>
                            </ListItem>
                            <div className={classes.spaceStyle}></div>
                            <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                            <div className={classes.spaceStyle}></div>
                            <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                <p className={classes.listItemSpanStyle}>Goal Count</p>
                                <p className={classes.listItemSpanStyle}>{goalsScored}</p>
                            </ListItem>
                            <div className={classes.bigSpaceStyle}></div>
                            <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                <p className={classes.listItemSpanStyle}>Rival</p>
                                <p className={classes.listItemSpanStyle}></p>
                            </ListItem>
                            <div className={classes.spaceStyle}></div>
                            <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                            <div className={classes.spaceStyle}></div>
                            <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                <p className={classes.listItemSpanStyle}>Number of Positions</p>
                                <p className={classes.listItemSpanStyle}>{theirPositions}</p>
                            </ListItem>
                            <div className={classes.spaceStyle}></div>
                            <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                            <div className={classes.spaceStyle}></div>
                            <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                <p className={classes.listItemSpanStyle}>Goal Count</p>
                                <p className={classes.listItemSpanStyle}>{goalsConceded}</p>
                            </ListItem>
                        </List>
                    </div>
                    <div className={classes.chartStyle}>
                        <p className={classes.chartTitle}>Rate of Converting Rival Positions Into Goals</p>
                        <Doughnut
                            data={rivalChartDatasets}
                            width={"100%"}
                            className={classes.chart}
                            options={rivalChartOptions}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
    );
};

export default RakipbulTeamStats;