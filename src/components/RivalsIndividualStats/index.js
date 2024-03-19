import React from 'react';
import classes from "./rivals-individual-stats.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {Bar} from "react-chartjs-2";
import {
    FormControl,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import {TeamMembers} from "../../constants/constants";
import {CategoryScale, Chart as linear, Chart} from "chart.js/auto";

const RivalsIndividualStats = ({data}) => {

    let rivalNames = [];
    Object.values(data)?.forEach((x) => {
        if (!rivalNames.includes(x.rival.name)) {
            rivalNames.push(x.rival.name)
        }
    } )

    const [rival, setRival] = React.useState(null);

    const handleChange = (event) => {
        setRival(event.target.value);
    };

    const facilityData = Object.values(data).filter(x => x.rival.name === rival)

    const rows = Object.values(TeamMembers).map(x => x.name);
    let playerTotalGoal = 0;
    let playerGoalData = [];
    let playerAttendenceData = [];
    let playerGoalPerGameData = [];
    let playerMatchData = [];

    const numberOfMatches = Object.values(facilityData).length;

    Object.values(TeamMembers).forEach(member => {
        playerTotalGoal = 0;
        Object.values(facilityData).forEach(item => {
            if (item?.oyesfc?.squad[member.name] && member.name !== TeamMembers.can.name) {
                playerTotalGoal += item.oyesfc.squad[member.name].goal;
            }
        });

        const playerTotalMatch = Object.values(facilityData).filter(item =>
            Object.keys(item.oyesfc.squad).includes(member.name)).length;

        const attendenceRate = ((playerTotalMatch / numberOfMatches) * 100)?.toFixed(0);
        const goalsPerGame = (playerTotalGoal / playerTotalMatch)?.toFixed(2)

        playerGoalData.push(playerTotalGoal)
        playerAttendenceData.push(attendenceRate)
        playerMatchData.push(playerTotalMatch)
        playerGoalPerGameData.push(goalsPerGame)
    });

    const chartDatasets = {
        labels: Object.values(TeamMembers).map(x => x.name),
        datasets: [
            {
                label: 'Goals per Game',
                backgroundColor: 'darkred',
                borderColor: 'darkred',
                borderWidth: 2,
                data: playerGoalPerGameData,
            }
        ]
    }

    const options = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'lightgray',
                    fontSize: 10,
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    color: 'lightgray',
                    fontSize: 10
                },
            },
            y: {
                ticks: {
                    color: 'lightgray',
                    fontSize: 10
                },
            },
        },
    };

    Chart.register(CategoryScale);
    linear.register(CategoryScale);

    return (
        <div className={classes.grid}>
            <Card sx={{ borderRadius: "25px", width: "100%", height: "auto", backgroundColor: "#242424" }} style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center" }}>
                <h1 className={classes.titleStyle}>Statistics by Rival</h1>
                <div className={classes.selectionGrid}>
                    <div className={classes.selectionInsideGrid}>
                        <FormControl className={classes.colorStyle} fullWidth>
                            <label className={classes.colorStyle}>
                                <select className={classes.select} onChange={handleChange}>
                                    <option>Select Rival</option>
                                    {rivalNames.sort().map(x => (
                                        <option value={x}>{x}</option>
                                    ))}
                                </select>
                            </label>

                        </FormControl>
                    </div>
                </div>
                <CardContent style={{backgroundColor: "#242424"}}>
                    <div className={classes.cardContentInsideStyle}>
                        <div className={classes.chartStyle}>
                            <Bar
                                data={chartDatasets}
                                width={"100%"}
                                className={classes.chart}
                                options={options}
                            />
                        </div>
                        <div className={classes.tableStyle}>
                            <TableContainer style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="sticky table" style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                    <TableHead style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                        <TableRow style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>Players</TableCell>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Matches</TableCell>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Goals</TableCell>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Rate of Attendance</TableCell>
                                            <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">Goals per Game</TableCell>
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
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerMatchData[number]}</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerGoalData[number]}</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerAttendenceData[number]}%</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerGoalPerGameData[number]}</TableCell>
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

export default RivalsIndividualStats;