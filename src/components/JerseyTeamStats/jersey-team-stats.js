import React from 'react';
import classes from "./jersey-team-stats.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {PolarArea} from "react-chartjs-2";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {CategoryScale, Chart as linear, Chart} from "chart.js/auto";
import {Jerseys} from "../../constants/constants";
import numberOfPlayersTeamStatsClasses from '../NumberOfPlayersTeamStats/number-of-players-team-stats.module.css';

const JerseyTeamStats = ({data}) => {

    const jerseys = Jerseys;
    const rows = jerseys;
    let win = 0;
    let draw = 0;
    let loss = 0;
    let game = 0;
    let winData = [];
    let drawData = [];
    let lossData = [];
    let gameData = [];
    let winPercentData = [];
    let goals = 0;
    let rivalGoals = 0;
    let rivalGoalsData = [];
    let goalsData = [];
    let rivalGoalsPerGameData = [];
    let goalsPerGameData = [];

    jerseys?.map(z => {
        win = 0;
        draw = 0;
        loss = 0;
        game = 0;
        goals = 0;
        rivalGoals = 0;
        game = Object.values(data)?.filter(item => item.oyesfc.jersey === z)?.length;
        win = Object.values(data)?.filter(item => item.oyesfc.jersey === z && item.oyesfc.goal > item.rival.goal)?.length;
        draw = Object.values(data)?.filter(item => item.oyesfc.jersey === z && item.oyesfc.goal === item.rival.goal)?.length;
        loss = Object.values(data)?.filter(item => item.oyesfc.jersey === z && item.oyesfc.goal < item.rival.goal)?.length;
        Object.values(data)?.filter(item => item.oyesfc.jersey === z)?.forEach(item => {
            goals += item?.oyesfc?.goal;
        });
        Object.values(data)?.filter(item => item.oyesfc.jersey === z)?.forEach(item => {
            rivalGoals += item?.rival?.goal;
        });
        const winPercent = ((win / game) * 100)?.toFixed(0);
        const goalsPerGame = (goals / game)?.toFixed(2)
        const rivalGoalsPerGame = (rivalGoals / game)?.toFixed(2)
        goalsData.push(goals)
        rivalGoalsData.push(rivalGoals)
        rivalGoalsPerGameData.push(rivalGoalsPerGame)
        goalsPerGameData.push(goalsPerGame)
        winData.push(win)
        drawData.push(draw)
        lossData.push(loss)
        gameData.push(game)
        winPercentData.push(winPercent)
        return null
    })

    const chartDatasets = {
        labels: jerseys,
        datasets: [
            {
                label: 'Win Rate (%)',
                backgroundColor: [
                    'lightgray',
                    'dodgerblue',
                    'purple',
                    'darkred',
                    'goldenrod'
                ],
                borderColor: 'black',
                borderWidth: 0,
                data: winPercentData,
            }
        ]
    }

    const options = {
        locale: 'en-US',
        scale: {},
        scales: {
            r: {
                angleLines: {
                    color: 'black'
                },
                grid: {
                    color: 'black'
                },
                pointLabels: {
                    color: 'black'
                },
                ticks: {
                    color: 'transparent',
                    backdropColor: 'transparent'
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: 'lightgray'
                }
            }
        }
    }

    Chart.register(CategoryScale);
    linear.register(CategoryScale);

    return (
        <div className={classes.grid}>
            <Card sx={{ borderRadius: "25px", width: "100%", height: "auto" }} style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center"}}>
                <h1 className={classes.titleStyle}>Jerseys</h1>
                <CardContent style={{backgroundColor: "#242424"}}>
                    <div className={classes.cardContentInsideStyle}>
                        <div className={numberOfPlayersTeamStatsClasses.chartStyle}>
                            <PolarArea
                                data={chartDatasets}
                                width={"100%"}
                                className={classes.chart}
                                options={options}
                            />
                        </div>
                        <div className={numberOfPlayersTeamStatsClasses.tableStyle}>
                            <TableContainer style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table" style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                    <TableHead style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                        <TableRow style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>Jerseys</TableCell>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Matches</TableCell>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Wins</TableCell>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Draws</TableCell>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Losses</TableCell>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Scored</TableCell>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Per Game</TableCell>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Conceded</TableCell>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Per Game</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row, number) => (
                                            <TableRow
                                                key={row}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}
                                            >
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} component="th" scope="row">
                                                    {row}
                                                </TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{gameData[number]}</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{winData[number]}</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{drawData[number]}</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{lossData[number]}</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{goalsData[number]}</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{goalsPerGameData[number]}</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{rivalGoalsData[number]}</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{rivalGoalsPerGameData[number]}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default JerseyTeamStats;