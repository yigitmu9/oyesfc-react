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
            <Card sx={{ borderRadius: "25px", width: "100%", height: "470px" }} style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center"}}>
                <h1 style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center", marginTop: "20px"}}>O Yes FC General Statistics</h1>
                <CardContent style={{backgroundColor: "#242424"}}>
                    <div style={{display: "flex", backgroundColor: "#242424"}}>
                        <div style={{display: "block", width: "50%", height: "330px", backgroundColor: "#242424"}}>
                            <p style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center", fontSize: 17}}>Win Rate</p>
                            <Doughnut
                                data={chartDatasets}
                                width={"100%"}
                                className={classes.chart}
                                options={options}
                            />
                            <h1 style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center", marginTop: "-180px", fontSize: "50px"}}>{((wonMatches / numberOfMatches) * 100)?.toFixed(0)}%</h1>
                        </div>
                        <div style={{display: "flex", width: "50%", height: "350px", backgroundColor: "#242424", textAlign: "center", justifyContent: "center"}}>
                            <List  component="nav" aria-label="mailbox folders" style={{backgroundColor: "#242424", width: "80%"}}>
                                <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                    <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 17}}>Matches</p>
                                    <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 17}}>{numberOfMatches}</p>
                                </ListItem>
                                <Divider sx={{ bgcolor: "#646464" }} variant="middle" color="red"/>
                                <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                    <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 17}}>Wins</p>
                                    <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 17}}>{wonMatches}</p>
                                </ListItem>
                                <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                    <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 17}}>Draws</p>
                                    <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 17}}>{drawMatches}</p>
                                </ListItem>
                                <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                    <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 17}}>Losses</p>
                                    <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 17}}>{lostMatches}</p>
                                </ListItem>
                                <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                    <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 17}}>Goals Scored</p>
                                    <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 17}}>{goalsScored}</p>
                                </ListItem>
                                <Divider sx={{ bgcolor: "#646464" }} variant="middle" color="red"/>
                                <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                    <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 17}}>Goals Conceded</p>
                                    <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 17}}>{goalsConceded}</p>
                                </ListItem>
                                <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                    <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 17}}>Goal Difference</p>
                                    <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 17}}>{goalDifference}</p>
                                </ListItem>
                                <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                    <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 17}}>Scored per Match</p>
                                    <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 17}}>{scoredGoalsPerGame}</p>
                                </ListItem>
                                <Divider sx={{ bgcolor: "#646464" }} variant="middle" />
                                <ListItem style={{backgroundColor: "#242424",  justifyContent: "space-between", display: "flex", textAlign: "end"}}>
                                    <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 17}}>Conceded per Match</p>
                                    <p style={{backgroundColor: "#242424", color: "lightgray", fontSize: 17}}>{concededGoalsPerGame}</p>
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