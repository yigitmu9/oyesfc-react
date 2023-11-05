import React from 'react';
import classes from "./rakipbul-team-stats.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Bar, Doughnut} from "react-chartjs-2";
import {
    Divider,
    FormControl, List, ListItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {DetailedRakipbulMatches, StadiumNames, TeamMembers} from "../../constants/constants";
import {CategoryScale, Chart as linear, Chart} from "chart.js/auto";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

const RakipbulIndividualStats = () => {

    let goalsScored = 0
    let ourPositions = 0
    let goalsConceded = 0
    let theirPositions = 0
    Object.values(DetailedRakipbulMatches)?.forEach(item => {
        goalsScored += item?.oyesfc?.goal;
        ourPositions += item?.oyesfc?.position;
        goalsConceded += item?.rival?.goal;
        theirPositions += item?.rival?.position;
    });

    const chartDatasets = {
        labels: ['Goals', 'Missed chances'],
        datasets: [
            {
                label: 'Rate of Converting Our Positions Into Goals (%)',
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
                    fontSize: 10,
                },
            },
        }
    };

    const rivalChartDatasets = {
        labels: ['Goals Conceded', 'Evaded Positions'],
        datasets: [
            {
                label: 'Rate of Converting Their Positions Into Goals (%)',
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
                    fontSize: 10,
                },
            },
        }
    };

    Chart.register(CategoryScale);
    linear.register(CategoryScale);

    return (
    <div className={classes.grid}>
        <Card sx={{ borderRadius: "25px", width: "100%", height: "550px" }} style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center"}}>
            <h1 style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center", marginTop: "20px"}}>Statistics of 10 Specific Rakipbul Matches</h1>
            <CardContent style={{backgroundColor: "#242424", marginBottom: "50px"}}>
                <div style={{display: "flex", backgroundColor: "#242424"}}>
                    <div style={{display: "block", width: "40%", height: "330px", backgroundColor: "#242424"}}>
                        <p style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center", fontSize: 17}}>Rate of Converting Our Positions Into Goals</p>
                        <Doughnut
                            data={chartDatasets}
                            width={"100%"}
                            className={classes.chart}
                            options={options}
                        />
                        <h1 style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center", marginTop: "-180px", fontSize: "50px"}}>{((goalsScored / ourPositions) * 100)?.toFixed(0)}%</h1>
                    </div>
                    <div style={{display: "block", width: "20%", height: "330px", backgroundColor: "#242424", marginTop: "30px"}}>
                        <p style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center", fontSize: 18, marginBottom: "10px"}}>Number of Positions of O Yes FC</p>
                        <p style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center", fontSize: 29, marginBottom: "10px"}}>{ourPositions}</p>
                        <p style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center", fontSize: 18, marginBottom: "10px"}}>O Yes FC's Goal Count</p>
                        <p style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center", fontSize: 29, marginBottom: "10px"}}>{goalsScored}</p>
                        <p style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center", fontSize: 18, marginBottom: "10px"}}>Number of Positions of Rivals</p>
                        <p style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center", fontSize: 29, marginBottom: "10px"}}>{theirPositions}</p>
                        <p style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center", fontSize: 18, marginBottom: "10px"}}>Rivals' Goal Count</p>
                        <p style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center", fontSize: 29}}>{goalsConceded}</p>
                    </div>
                    <div style={{display: "block", width: "40%", height: "330px", backgroundColor: "#242424"}}>
                        <p style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center", fontSize: 17}}>Rate of Converting Their Positions Into Goals</p>
                        <Doughnut
                            data={rivalChartDatasets}
                            width={"100%"}
                            className={classes.chart}
                            options={rivalChartOptions}
                        />
                        <h1 style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center", marginTop: "-180px", fontSize: "50px"}}>{((goalsConceded / theirPositions) * 100)?.toFixed(0)}%</h1>
                    </div>
                </div>
            </CardContent>
            <span style={{backgroundColor: "rgb(36, 36, 36)", color: "gray", textAlign: "center", marginTop: "30px", marginLeft: "20px", fontSize: "15px"}}>
                    *Note: These statistic tables are only valid for 10 specific Rakipbul matches for which position data is available.
                    The data is static and cannot work with filters.
                </span>
        </Card>
    </div>
    );
};

export default RakipbulIndividualStats;