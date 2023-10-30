import React from 'react';
import classes from "./facilities-individual-stats.module.css";
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
import {StadiumNames, TeamMembers} from "../../constants/constants";
import {CategoryScale, Chart as linear, Chart} from "chart.js/auto";

const FacilitiesIndividualStats = ({data}) => {

    const [facility, setFacility] = React.useState('Vitamin');

    const handleChange = (event) => {
        setFacility(event.target.value);
    };

    const facilityData = Object.values(data).filter(x => x.place === facility)

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
            <Card sx={{ borderRadius: "25px", width: "100%", height: "570px", backgroundColor: "#242424" }} style={{backgroundColor: "#242424", justifyContent: "center", alignItems: "center"}}>
                <h1 style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", textAlign: "center", marginTop: "20px"}}>Individual Statistics on Facilities</h1>
                <div style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center", textAlign: "center", marginTop: "30px", marginBottom: "30px"}}>
                    <div style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray", width: "500px", display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center", textAlign: "center"}}>
                        <FormControl style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}} fullWidth>
                            <label style={{backgroundColor: "rgb(36, 36, 36)", color: "lightgray"}}>
                                Select a Facility:
                                <select className={classes.select} onChange={handleChange}>
                                    {Object.values(StadiumNames).map(x => (
                                        <option value={x}>{x}</option>
                                    ))}
                                </select>
                            </label>

                        </FormControl>
                    </div>
                </div>
                <CardContent style={{backgroundColor: "#242424"}}>
                    <div style={{display: "flex", backgroundColor: "#242424"}}>
                        <div style={{display: "block", width: "40%", marginRight:"30px", height: "350px", backgroundColor: "#242424"}}>
                            <Bar
                                data={chartDatasets}
                                width={"100%"}
                                className={classes.chart}
                                options={options}
                            />
                        </div>
                        <div style={{display: "flex", width: "60%", height: "330px", backgroundColor: "#242424", textAlign: "center", justifyContent: "center", marginRight: "30px"}}>
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

export default FacilitiesIndividualStats;