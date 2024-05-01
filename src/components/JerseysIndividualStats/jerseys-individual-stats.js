import React from 'react';
import classes from "./jerseys-individual-stats.module.css";
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
import {Jerseys, TeamMembers} from "../../constants/constants";
import {CategoryScale, Chart as linear, Chart} from "chart.js/auto";
import facilitiesIndividualStatsClasses from "../FacilitiesIndividualStats/facilities-individual-stats.module.css";

const JerseysIndividualStats = ({data}) => {

    const [jersey, setJersey] = React.useState(null);

    const handleChange = (event) => {
        setJersey(event.target.value);
    };

    const facilityData = Object.values(data).filter(x => x.oyesfc.jersey === jersey)

    const rows = Object.values(TeamMembers).map(x => x.name);
    let playerTotalGoal = 0;
    let playerGoalDataIndividual = [];
    let playerAttendanceDataIndividual = [];
    let playerGoalPerGameDataIndividual = [];
    let playerMatchDataIndividual = [];

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

        const attendanceRate = ((playerTotalMatch / numberOfMatches) * 100)?.toFixed(0);
        const goalsPerGame = (playerTotalGoal / playerTotalMatch)?.toFixed(2)

        playerGoalDataIndividual.push(playerTotalGoal)
        playerAttendanceDataIndividual.push(attendanceRate)
        playerMatchDataIndividual.push(playerTotalMatch)
        playerGoalPerGameDataIndividual.push(goalsPerGame)
    });

    const chartDatasets = {
        labels: Object.values(TeamMembers).map(x => x.name),
        datasets: [
            {
                label: 'Goals per Game',
                backgroundColor: 'darkred',
                borderColor: 'darkred',
                borderWidth: 2,
                data: playerGoalPerGameDataIndividual,
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
                },
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                ticks: {
                    color: 'lightgray',
                },
            },
            y: {
                ticks: {
                    color: 'lightgray',
                },
            },
        },
    };

    Chart.register(CategoryScale);
    linear.register(CategoryScale);

    return (
        <div className={classes.grid}>
            <Card sx={{ borderRadius: "25px", width: "100%", height: "auto", backgroundColor: "#242424" }} style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center" }}>
                <h1 className={classes.titleStyle}>Jerseys</h1>
                <div className={classes.selectionGrid}>
                    <div className={classes.selectionInsideGrid}>
                        <FormControl className={classes.colorStyle} fullWidth>
                            <label className={classes.colorStyle}>
                                <select className={facilitiesIndividualStatsClasses.select} onChange={handleChange}>
                                    <option>Select Jersey</option>
                                    {Jerseys.map((x, y) => (
                                        <option key={y} value={x}>{x}</option>
                                    ))}
                                </select>
                            </label>

                        </FormControl>
                    </div>
                </div>
                <CardContent style={{backgroundColor: "#242424"}}>
                    <div className={classes.cardContentInsideStyle}>
                        <div className={facilitiesIndividualStatsClasses.chartStyle}>
                            <Bar
                                data={chartDatasets}
                                width={"100%"}
                                className={classes.chart}
                                options={options}
                            />
                        </div>
                        <div className={facilitiesIndividualStatsClasses.tableStyle}>
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
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerMatchDataIndividual[number]}</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerGoalDataIndividual[number]}</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerAttendanceDataIndividual[number]}%</TableCell>
                                                <TableCell style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} align="right">{playerGoalPerGameDataIndividual[number]}</TableCell>
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

export default JerseysIndividualStats;